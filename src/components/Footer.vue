<template>
  <div class="container-fluid text-center mt-3">
    <router-link v-if="isActivated && isNetworkSupported" to="/profile">Profile</router-link>
    
    <span v-if="isActivated && isNetworkSupported"> | </span>

    <router-link to="/about">About</router-link>
    
    <span> | </span>

    <router-link to="/how">How it works</router-link>

    <!--
    
    <span> | </span>

    <router-link to="/browser">Browser extension</router-link>
  
    -->
    
    <span> | </span>

    <a target="_blank" href="https://blog.punk.domains">Blog</a> 

    <span> | </span>

    <a target="_blank" href="https://mirror.punk.domains">Mirror site</a> 
    
    <span> | </span>

    <a target="_blank" href="https://gitlab.com/punk-domains/brand-identity">Brand assets</a> 

    <span> | </span>

    <a target="_blank" href="https://github.com/orgs/punk-domains-2/discussions/1">Contribute</a> 

    <span> | </span>

    <a target="_blank" href="https://iggy.social">Iggy Social</a> 
  
  </div>

  <div class="container-fluid text-center">

    <a class="icons" href="https://docs.punk.domains" target="_blank"><i class="bi bi-journal-text"></i></a>

    <a class="icons" target="_blank" href="https://gitlab.com/punk-domains"><i class="bi bi-git"></i></a>

    <a class="icons" target="_blank" href="https://github.com/punk-domains-2"><i class="bi bi-github"></i></a>

    <a class="icons" target="_blank" href="https://discord.gg/8dSrwrAQeu"><i class="bi bi-discord"></i></a>

    <a class="icons" target="_blank" href="https://twitter.com/PunkDomains"><i class="bi bi-twitter"></i></a>

    <a class="icons" href="https://blog.punk.domains" target="_blank"><i class="bi bi-pencil-square"></i></a>
    
  </div>
</template>

<script>
import { useEthers } from 'vue-dapp';
import { mapGetters } from 'vuex';

export default {
  name: "Footer",

  computed: {
    ...mapGetters("network", ["isNetworkSupported"]),
    
  },

  setup() {
    const { isActivated } = useEthers()
    return { isActivated }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container-fluid {
  /*background-color: #24263A;*/
  background-color: transparent;
  padding: 20px 0px;
  border-radius: 10px;
}

.icons {
  margin-left: 15px;
  margin-right: 15px;
  font-size: 2em;
}

.polygon {
  vertical-align: text-bottom;
  width: 40px;
}

.polygon svg circle {
  fill: #fff;
}

.polygon:hover svg circle {
  fill: white;
}
</style>