<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/logo-white-300.svg" alt="" width="30" class="d-inline-block navbar-img">
        PUNK DOMAINS
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        
        <div class="d-flex ms-auto">
          <div class="navbar-menu-buttons">

            <div v-if="chainId==42766" class="btn-group mx-2 navbar-menu-btn">
              <a class="btn btn-primary" href="https://fairchat.xyz" target="_blank">Try Fairchat.xyz</a>
            </div>

            <div v-if="chainId==167000" class="btn-group mx-2 navbar-menu-btn">
              <a class="btn btn-primary" href="https://tko.chat" target="_blank">Try TKO.chat</a>
            </div>

            <div v-if="chainId!=42766" class="btn-group mx-2 navbar-menu-btn navbar-other-item">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                Partners
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                
                <li class="dropdown-item" @click="openUrl('https://degenname.lol')">Degen Names (.degen) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://dns.dopewars.gg')">Dope Name Service (.dope) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://id.zkchat.net')">zkSoul ID (.zksoul) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://optimistic.domains')">Optimistic Domains (.op) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://names.pooly.me')">PoolTogether Names (.pool) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://giveth.punk.domains')">Giveth Names (.giveth) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://flr.domains')">Flare Domains (.flr) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://songbird.domains')">Songbird Domains (.sgb) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://id.satraps.io/')">Satraps ID (.satrap) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://fantomname.org')">Fantom Names (.fantom) <i class="bi bi-box-arrow-up-right"></i></li>
                <router-link tag="li" class="dropdown-item" to="/partners/l2dao">Layer2DAO (.L2 domain)</router-link>
                <router-link tag="li" class="dropdown-item" to="/punkangel">Punk Angel (.punkangel domain)</router-link>
                <li class="dropdown-item" @click="openUrl('https://ppl.domains')">People Domains (.ppl) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://smol.domains')">Smolverse (.smol domain) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://www.kns.earth')">KlimaDAO (.klima domain) <i class="bi bi-box-arrow-up-right"></i></li>
                <li class="dropdown-item" @click="openUrl('https://twb.punk.domains')">The Wild Bunch (.wildbunch) <i class="bi bi-box-arrow-up-right"></i></li>
                <router-link tag="li" class="dropdown-item" to="/partners/huwa">HUWA (.huwa domain)</router-link>
                <li class="dropdown-item" @click="openUrl('https://app.basin.global')">Basin Domains (.basin) <i class="bi bi-box-arrow-up-right"></i></li>
              </ul>
            </div>

            <!--
            <div class="btn-group mx-2 navbar-menu-btn navbar-other-item">
              <router-link tag="button" class="btn btn-primary" to="/buy-tld">Buy a TLD</router-link>
            </div>
            -->
          
            <div v-if="isActivated" class="btn-group mx-2 navbar-menu-btn">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {{getNetworkName}}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <span 
                    class="dropdown-item" 
                    :key="network" 
                    v-for="network in getSupportedNetworkNames"
                    @click="changeNetwork(network)"
                  >{{network}}</span>
                </li>
              </ul>
            </div>

            <div v-if="isActivated" class="btn-group mx-2">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                {{ getNameOrAddress }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <router-link tag="li" class="dropdown-item" to="/profile">Profile</router-link>
                <router-link tag="li" class="dropdown-item" to="/">Buy domain</router-link>
                <router-link tag="li" class="dropdown-item" to="/search-domain">Search domain</router-link>
                <router-link tag="li" class="dropdown-item" to="/send-tokens">Send tokens</router-link>
                <router-link tag="li" class="dropdown-item" to="/punkangel">Mint .punkangel</router-link>
                <li class="dropdown-item" @click="openUrl('https://blog.punk.domains')">Blog</li>
                <router-link tag="li" class="dropdown-item" to="/browser">Browser extension</router-link>
                <li class="dropdown-item" @click="openUrl('https://docs.punk.domains')">Docs</li>
                <li class="dropdown-item" @click="openUrl('https://github.com/orgs/punk-domains-2/discussions/1')">Contribute</li>
                <li class="dropdown-item" @click="logout">Disconnect</li>
              </ul>
            </div>

            <div v-if="isActivated && chainId!=42766" class="btn-group mx-2 navbar-menu-btn">
              <router-link tag="button" class="btn btn-primary" to="/send-tokens">Send Tokens</router-link>
            </div>
            
          </div>

          <button v-if="!isActivated" class="btn btn-primary" @click="open">Connect wallet</button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script lang="js">
import { mapGetters } from 'vuex';
import { useBoard, useEthers, useWallet } from 'vue-dapp';
import useChainHelpers from "../hooks/useChainHelpers";

export default {
  name: "Navbar",

  computed: {
    ...mapGetters("user", ["getUserShortAddress", "getUserSelectedName"]),
    ...mapGetters("network", ["getNetworkName", "getSupportedNetworks", "getSupportedNetworkNames"]),

    getNameOrAddress() {
      if (this.getUserSelectedName) {
        return this.getUserSelectedName;
      } else {
        return this.getUserShortAddress;
      }
    },

  },

  methods: {
    changeNetwork(networkName) {
      const networkData = this.switchOrAddChain(window.ethereum, networkName); 
    },

    logout() {
      this.disconnect();
      localStorage.clear();
      localStorage.setItem("connected", "null");
    },

    openUrl(url) {
      window.open(url, '_blank').focus();
    }
  },
  
  setup() {
    const { open } = useBoard();
    const { disconnect } = useWallet();
    const { chainId, isActivated } = useEthers();
    const { switchOrAddChain } = useChainHelpers();

    return {
      chainId, isActivated, disconnect, open, switchOrAddChain
    }
  }
}
</script>

<style scoped>
.dropdown-item {
  cursor: pointer;
}

.navbar-brand {
  font-family: 'Impact', cursive;
}

.navbar-dark .navbar-brand {
  color: #fff;
}

.navbar-dark {
  /*background: linear-gradient(90deg, hsla(265, 75%, 26%, 1) 0%, hsla(365, 75%, 26%, 1) 100%);*/
  background: linear-gradient(90deg, #4443f1 0%, #9055f7 100%);
  /*background: linear-gradient(90deg, #3b1eca 0%, #793ac7 100%);*/
  border-radius: 0px 0px 10px 10px;
  padding: 20px;
  
}

.navbar-img {
  margin-right: 5px;
}

@media only screen and (max-width: 767px) {
  .navbar-menu-btn {
    margin-bottom: 5px;
  }

  .navbar-other-item {
    margin-top: 10px;
  }

  .navbar-menu-buttons {
    display: flex;
    flex-direction: column;
  }
}
</style>
