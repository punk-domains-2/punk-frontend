<template>
  <div class="container text-center">
    <h1 class="mt-5">Permissionless Web3 Domains</h1>

    <div v-if="isActivated" class="dropdown mt-5">
      Choose network: 

      <button class="mx-3 btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {{getNetworkName}}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <span 
            class="dropdown-item" 
            v-for="network in getSupportedNetworkNames"
            @click="changeNetwork(network)"
            :key="network"
          >{{network}}</span>
        </li>
      </ul>
    </div>

    <div v-if="!isActivated" class="mt-5">
      <button class="btn btn-primary" @click="open">Connect wallet</button>
    </div>

    <div class="d-flex justify-content-center domain-input-container">
      <div class="input-group mb-3 domain-input input-group-lg">
        <input
          v-model="chosenDomainName" 
          placeholder="enter domain name"
          type="text" 
          class="form-control text-end" 
          aria-label="Text input with dropdown button"
        >
        
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{selectedDomain ? selectedDomain.tld : 'Select domain'}}
        </button>

        <ul class="dropdown-menu dropdown-menu-end domain-dropdown">
          <li class="px-3 py-2">
            <input
              v-model="domainSearchQuery"
              type="text"
              class="form-control form-control-sm"
              placeholder="Search domains..."
              @click.stop
            />
          </li>
          <li><hr class="dropdown-divider"></li>
          <li v-for="domain in filteredDomains" :key="domain.tld">
            <a
              v-if="domain.website && domain.website.trim() !== ''"
              :href="domain.website"
              target="_blank"
              class="dropdown-item"
              @click.stop
            >
              {{domain.tld}} <i class="bi bi-box-arrow-up-right" />
            </a>
            <span
              v-else
              class="dropdown-item"
              @click="selectDomain(domain)"
            >
              {{domain.tld}}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <p class="error" v-if="selectedDomain && domainValidation.invalid">
      <small>
        <em>{{ domainValidation.message }}</em>
      </small>
    </p>

    <p class="mt-3" v-if="selectedDomain && !selectedDomain.website && isActivated && isCorrectChain">
      Domain price: {{parseValue(selectedPrice)}} {{getNetworkCurrency}}
    </p>

    <!-- Button states based on connection and chain -->
    <div v-if="selectedDomain && (!selectedDomain.website || selectedDomain.website.trim() === '')">
      <button
        v-if="!isActivated"
        class="btn btn-primary btn-lg mt-1 buy-button"
        @click="open"
      >
        Connect Wallet
      </button>
      
      <button
        v-else-if="!isCorrectChain"
        class="btn btn-primary btn-lg mt-1 buy-button"
        @click="switchToDomainChain"
      >
        Switch to {{selectedDomain.chainName}}
      </button>
      
      <button
        v-else
        class="btn btn-primary btn-lg mt-1 buy-button"
        @click="buyDomain"
        :disabled="waiting || domainValidation.invalid"
      >
        <span v-if="waiting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Buy domain
      </button>
    </div>

  </div>

  <FeaturedDomains class="mt-3" />
  
</template>

<script lang="ts">
import { ethers } from 'ethers';
import { displayEther, useBoard, useEthers } from 'vue-dapp';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { useToast, TYPE } from "vue-toastification";
import WaitingToast from "../components/toasts/WaitingToast.vue";
import useDomainHelpers from "../hooks/useDomainHelpers";
import useChainHelpers from "../hooks/useChainHelpers";
import FeaturedDomains from '../components/FeaturedDomains.vue';
import domainsData from '../data/domains.json';

export default {
  name: "Home2",

  components: {
    FeaturedDomains,
  },

  data() {
    return {
      chosenDomainName: null,
      selectedDomain: null,
      selectedPrice: null,
      waiting: false, // waiting for TX to complete
      domainSearchQuery: '',
      allDomains: [],
    }
  },

  created() {
    // Filter domains where show: true
    this.allDomains = Object.entries(domainsData)
      .filter(([tld, data]: [string, any]) => data.show === true)
      .map(([tld, data]: [string, any]) => ({
        tld,
        ...data
      }))
      .sort((a, b) => a.tld.localeCompare(b.tld));
  },

  computed: {
    ...mapGetters("network", ["getBlockExplorerBaseUrl", "getNetworkName", "getNetworkCurrency", "getSupportedNetworks", "getSupportedNetworkNames"]),
    ...mapGetters("punk", ["getTlds", "getTldAddresses", "getDomainPrices", "getTldAbi"]),

    domainLowerCase() {
      return this.chosenDomainName ? this.chosenDomainName.toLowerCase() : '';
    },

    filteredDomains() {
      if (!this.domainSearchQuery) {
        return this.allDomains;
      }
      const query = this.domainSearchQuery.toLowerCase();
      return this.allDomains.filter(domain => 
        domain.tld.toLowerCase().includes(query) ||
        domain.chainName.toLowerCase().includes(query)
      );
    },

    isCorrectChain() {
      if (!this.selectedDomain || !this.chainId) {
        return false;
      }
      return this.chainId === this.selectedDomain.chainId;
    },

    domainValidation() {
      const validation = this.buyNotValid(this.chosenDomainName);
      return validation || { invalid: false, message: null };
    }
  },

  methods: {
    ...mapActions("user", ["fetchUserDomainNames"]),
    ...mapMutations("user", ["addDomainManually"]),

    async buyDomain() {
      if (!this.selectedDomain) return;
      
      this.waiting = true;
      const fullDomainName = this.domainLowerCase + this.selectedDomain.tld;

      // create TLD contract object
      const intfc = new ethers.utils.Interface(this.getTldAbi);
      const contract = new ethers.Contract(this.selectedDomain.address, intfc, this.signer);

      // check if price is missing
      if (!this.selectedPrice) {
        this.selectedPrice = await contract.price();
      }

      // check if domain is already taken
      const existingHolder = await contract.getDomainHolder(this.domainLowerCase);

      if (existingHolder !== ethers.constants.AddressZero) {
        this.toast("Sorry, but this domain name is already taken...", {type: TYPE.ERROR});
        this.waiting = false;
        return;
      }

      // buy/mint domain
      try {
        let referral = localStorage.getItem("referral");

        if (!referral || !ethers.utils.isAddress(referral)) {
          referral = ethers.constants.AddressZero;
        }

        const tx = await contract.mint(
          this.domainLowerCase,
          this.address,
          referral,
          {
            value: String(this.selectedPrice)
          }
        );

        if (tx) {
          const toastWait = this.toast(
            {
              component: WaitingToast,
              props: {
                text: "Please wait for your transaction to confirm. Click on this notification to see transaction in the block explorer."
              }
            },
            {
              type: TYPE.INFO,
              onClick: () => window.open(this.getBlockExplorerBaseUrl+"/tx/"+tx.hash, '_blank').focus()
            }
          );

          const receipt = await tx.wait();

          if (receipt.status === 1) {
            this.toast.dismiss(toastWait);
            this.toast("You have successfully bought the domain!", {
              type: TYPE.SUCCESS,
              onClick: () => window.open(this.getBlockExplorerBaseUrl+"/tx/"+tx.hash, '_blank').focus()
            });
            this.fetchUserDomainNames();
            this.addDomainManually(fullDomainName);
            this.waiting = false;
          } else {
            this.toast.dismiss(toastWait);
            this.toast("Transaction has failed.", {
              type: TYPE.ERROR,
              onClick: () => window.open(this.getBlockExplorerBaseUrl+"/tx/"+tx.hash, '_blank').focus()
            });
            console.log(receipt);
            this.waiting = false;
          }
        }

      } catch (e) {
        console.log(e)
        this.waiting = false;
        this.toast(e.message, {type: TYPE.ERROR});
      }

      this.waiting = false;
    },

    changeNetwork(networkName) {
      this.switchOrAddChain((window as any).ethereum, networkName); 
    },

    async fetchPrice() {
      if (!this.selectedDomain || !this.signer) return;
      
      try {
        console.log("fetching price for", this.selectedDomain.tld);
        const intfc = new ethers.utils.Interface(this.getTldAbi);
        const contract = new ethers.Contract(this.selectedDomain.address, intfc, this.signer);
        this.selectedPrice = await contract.price();
        console.log("price", this.selectedPrice);
      } catch (e) {
        console.error("Error fetching price:", e);
        this.toast("Failed to fetch domain price. Please try again.", {type: TYPE.ERROR});
      }
    },

    async selectDomain(domain) {
      this.selectedDomain = domain;
      this.selectedPrice = this.getDomainPrices ? this.getDomainPrices[domain.tld] : null;
      
      // If already on the correct chain and connected, fetch the price
      if (this.isActivated && this.chainId === domain.chainId && this.signer) {
        await this.fetchPrice();
      }
    },

    async switchToDomainChain() {
      if (!this.selectedDomain) return;
      
      try {
        // Switch chain - the chainId watcher will automatically fetch the price when the chain switches
        await this.switchOrAddChain((window as any).ethereum, this.selectedDomain.chainName);
      } catch (e) {
        console.error("Error switching chain:", e);
        this.toast("Failed to switch chain. Please try again.", {type: TYPE.ERROR});
      }
    },

    parseValue(someVal) {
      if (someVal) {
        return ethers.utils.formatEther(someVal);
      }
    }
  },

  setup() {
    const { open } = useBoard()
    const { address, chainId, isActivated, signer } = useEthers()
    const toast = useToast();
    const { buyNotValid } = useDomainHelpers();
    const { switchOrAddChain } = useChainHelpers();

    return { address, buyNotValid, chainId, isActivated, displayEther, open, signer, switchOrAddChain, toast }
  },

  watch: {
    async chainId(newVal, oldVal) {
      if (newVal != oldVal && this.selectedDomain) {
        // If we're now on the correct chain for the selected domain, fetch the price
        if (this.selectedDomain.chainId === newVal && this.isActivated) {
          // Wait a bit for the signer to update
          await new Promise(resolve => setTimeout(resolve, 1000));
          await this.fetchPrice();
        }
      }
    },

    getDomainPrices(newVal, oldVal) {
      if (newVal && this.selectedDomain) {
        this.selectedPrice = this.getDomainPrices[this.selectedDomain.tld];
      }
    }
  }
}
</script>

<style scoped>
.buy-button {
  margin-bottom: 50px;
}

.domain-input {
  width: 50%;
}

.domain-input-container {
  margin-top: 80px;
}

.dropdown-item {
  cursor: pointer;
}

.domain-dropdown {
  max-height: 400px;
  overflow-y: auto;
}

.error {
  color: #dc3545;
}

@media only screen and (max-width: 767px) {
  .domain-input {
    width: 100%;
  }
}
</style>

