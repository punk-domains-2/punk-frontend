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

    <div v-if="chainId==167000" class="mt-4 mb-5">
      <h2>
        Mint a special Taiko Drum (.🥁) domain on
        <a target="_blank" href="https://drum.name">drum.name</a> website!
      </h2>

      <p class="text-center mt-5 mb-4">
        <a 
          class="btn btn-primary btn-lg"
          target="_blank"
          href="https://drum.name" 
        >Mint .🥁 name!</a>
      </p>
    </div>

    <div class="d-flex justify-content-center domain-input-container" v-if="chainId!==167000">
      <div class="input-group mb-3 domain-input input-group-lg">
        <input
          v-model="chosenDomainName" 
          placeholder="enter domain name"
          type="text" 
          class="form-control text-end" 
          aria-label="Text input with dropdown button"
        >
        
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <span v-if="isActivated && !selectedTld" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          {{selectedTld}}
        </button>

        <ul class="dropdown-menu dropdown-menu-end">
          <li><span class="dropdown-item" :key="tld" v-for="tld in enabledBuyingTlds" @click="changeTld(tld)">{{tld}}</span></li>
          <li><span class="dropdown-item" @click="openUrl('https://degenname.lol')">.degen <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://optimistic.domains')">.op <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://id.zkchat.net')">.zksoul <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://fantomname.org')">.fantom <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://names.pooly.me')">.pool <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://smol.domains')">.smol <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://ppl.domains')">.ppl <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://www.kns.earth')">.klima <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://flr.domains')">.flr <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://songbird.domains')">.sgb <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://giveth.punk.domains')">.giveth <i class="bi bi-box-arrow-up-right" /></span></li>
          <li><span class="dropdown-item" @click="openUrl('https://dns.dopewars.gg')">.dope <i class="bi bi-box-arrow-up-right" /></span></li>
        </ul>
      </div>
    </div>

    <p class="error" v-if="buyNotValid(chosenDomainName).invalid">
      <small>
        <em>{{ buyNotValid(chosenDomainName).message }}</em>
      </small>
    </p>

    <p class="mt-3" v-if="chainId!==167000">
      Domain price: {{this.parseValue(this.selectedPrice)}} {{getNetworkCurrency}}
    </p>

    <button v-if="chainId!==167000" class="btn btn-primary btn-lg mt-1 buy-button" @click="buyDomain" :disabled="waiting || buyNotValid(chosenDomainName).invalid">
      <span v-if="waiting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Buy domain
    </button>

    <div v-if="chainId==42766">
      <p>
        Use your .fairchat domain as username on 
        <a target="_blank" href="https://fairchat.xyz">Fairchat.xyz</a> - the first Web3 Social on ZKFair!
      </p>
    </div>

    <!--
    <div class="row">
      <div class="col-md-6 offset-md-3 container text-center gitcoin">
        <h3 class="mt-2">Support us on Gitcoin Grants!</h3>
        <p>
          Every $1 donation is matched with additional funds from Gitcoin, so your donation has a big impact. 
          <a target="_blank" href="https://gitcoin.co/grants/4830/punk-domains">Donate to Punk Domains here!</a> 
        </p>
      </div>
    </div>
    -->

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

export default {
  name: "Home",

  components: {
    FeaturedDomains,
  },

  data() {
    return {
      chosenDomainName: null,
      enabledBuyingTlds: [],
      selectedTld: null,
      selectedPrice: null,
      waiting: false, // waiting for TX to complete
    }
  },

  created() {
    if (this.getDomainPrices) {
      this.checkEnabledBuying();
    }
  },

  computed: {
    ...mapGetters("network", ["getBlockExplorerBaseUrl", "getNetworkName", "getNetworkCurrency", "getSupportedNetworks", "getSupportedNetworkNames"]),
    ...mapGetters("punk", ["getTlds", "getTldAddresses", "getDomainPrices", "getTldAbi"]),

    domainLowerCase() {
      return this.chosenDomainName.toLowerCase();
    }
  },

  methods: {
    ...mapActions("user", ["fetchUserDomainNames"]),
    ...mapMutations("user", ["addDomainManually"]),

    async buyDomain() {
      this.waiting = true;
      const fullDomainName = this.domainLowerCase + this.selectedTld;

      // create TLD contract object
      const intfc = new ethers.utils.Interface(this.getTldAbi);
      const contract = new ethers.Contract(this.getTldAddresses[this.selectedTld], intfc, this.signer);

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
      this.switchOrAddChain(window.ethereum, networkName); 
    },

    changeTld(tldName) {
      this.selectedTld = tldName;
      this.selectedPrice = this.getDomainPrices[tldName];
    },

    async checkEnabledBuying() {
      const oldSelectedTld = this.selectedTld;

      this.enabledBuyingTlds = [];

      let counter = 0;

      if (this.getTlds) {
        for (let tld of this.getTlds) {
          // construct contract
          const intfc = new ethers.utils.Interface(this.getTldAbi);
          const tldContract = new ethers.Contract(this.getTldAddresses[tld], intfc, this.signer);

          const canBuy = await tldContract.buyingEnabled();

          if (canBuy) {
            this.enabledBuyingTlds.push(tld);

            if (counter === 0) {
              this.selectedTld = tld;
              counter++;
            } else if (tld === oldSelectedTld) {
              this.selectedTld = oldSelectedTld;
            }
          }
        }
      }

      if (this.enabledBuyingTlds && !this.selectedTld) {
        this.selectedTld = this.enabledBuyingTlds[0];
      }

      this.selectedPrice = this.getDomainPrices[this.selectedTld];
    },

    openUrl(url) {
      window.open(url, '_blank').focus();
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
    chainId(newVal, oldVal) {
      if (newVal != oldVal) {
        this.selectedTld = null;
      }
    },

    getTlds(newVal, oldVal) {
      if (newVal && this.getDomainPrices) {
        this.checkEnabledBuying();
      }
    },

    getDomainPrices(newVal, oldVal) {
      if (newVal) {
        this.checkEnabledBuying();
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

@media only screen and (max-width: 767px) {
  .domain-input {
    width: 100%;
  }
}
</style>
