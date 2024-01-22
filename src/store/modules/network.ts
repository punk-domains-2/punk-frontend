import { ethers } from 'ethers';
import { useEthers } from 'vue-dapp';
import tokens from "../../abi/tokens.json";

const { chainId } = useEthers();

export default {
  namespaced: true,
  
  state: () => ({
    networkCurrency: "ETH",
    networkName: "Unsupported Network",
    supportedNetworks: {
      10: "Optimism",
      100: "Gnosis Chain",
      137: "Polygon",
      255: "Kroma",
      42161: "Arbitrum",
      42170: "Arbitrum Nova",
      42766: "ZKFair",
      59144: "Linea",
      534352: "Scroll",
      56: "BNB Smart Chain",
      167007: "Taiko Jolnir Testnet",
      167008: "Taiko Katla Testnet",
      3110: "SatoshiVM Testnet"
    }
  }),

  getters: { 
    getBlockExplorerBaseUrl() {
      if (chainId.value === 1) {
        return "https://etherscan.io";
      } else if (chainId.value === 3) {
        return "https://ropsten.etherscan.io";
      } else if (chainId.value === 4) {
        return "https://rinkeby.etherscan.io";
      } else if (chainId.value === 10) {
        return "https://optimistic.etherscan.io";
      } else if (chainId.value === 19) {
        return "https://songbird-explorer.flare.network";
      } else if (chainId.value === 56) {
        return "https://bscscan.com";
      } else if (chainId.value === 69) {
        return "https://kovan-optimistic.etherscan.io";
      } else if (chainId.value === 77) {
        return "https://blockscout.com/poa/sokol";
      } else if (chainId.value === 100) {
        return "https://gnosisscan.io";
      } else if (chainId.value === 137) {
        return "https://polygonscan.com";
      } else if (chainId.value === 250) {
        return "https://ftmscan.com";
      } else if (chainId.value === 255) {
        return "https://kromascan.com";
      } else if (chainId.value === 3110) {
        return "https://testnet.svmscan.io";
      } else if (chainId.value === 4002) {
        return "https://testnet.ftmscan.com";
      } else if (chainId.value === 42161) {
        return "https://arbiscan.io";
      } else if (chainId.value === 42170) {
        return "https://nova.arbiscan.io";
      } else if (chainId.value === 42766) {
        return "https://scan.zkfair.io";
      } else if (chainId.value === 59144) {
        return "https://lineascan.build";
      } else if (chainId.value === 80001) {
        return "https://mumbai.polygonscan.com";
      } else if (chainId.value === 167007) {
        return "https://explorer.jolnir.taiko.xyz";
      } else if (chainId.value === 167008) {
        return "https://explorer.katla.taiko.xyz";
      } else if (chainId.value === 421611) {
        return "https://testnet.arbiscan.io";
      } else if (chainId.value === 1313161555) {
        return "https://testnet.aurorascan.dev";
      } else if (chainId.value === 534352) {
        return "https://scrollscan.com";
      }
    },

    getBlockExplorerBaseUrlFromId: () => (netId: Number) =>  {
      if (netId === 1) {
        return "https://etherscan.io";
      } else if (netId === 3) {
        return "https://ropsten.etherscan.io";
      } else if (netId === 4) {
        return "https://rinkeby.etherscan.io";
      } else if (netId === 10) {
        return "https://optimistic.etherscan.io";
      } else if (netId === 19) {
        return "https://songbird-explorer.flare.network";
      } else if (netId === 56) {
        return "https://bscscan.com";
      } else if (netId === 69) {
        return "https://kovan-optimistic.etherscan.io";
      } else if (netId === 77) {
        return "https://blockscout.com/poa/sokol";
      } else if (netId === 100) {
        return "https://gnosisscan.io";
      } else if (netId === 137) {
        return "https://polygonscan.com";
      } else if (netId === 250) {
        return "https://ftmscan.com";
      } else if (netId === 255) {
        return "https://kromascan.com";
      } else if (netId === 3110) {
        return "https://testnet.svmscan.io";
      } else if (netId === 4002) {
        return "https://testnet.ftmscan.com";
      } else if (netId === 42161) {
        return "https://arbiscan.io";
      } else if (netId === 42170) {
        return "https://nova.arbiscan.io";
      } else if (netId === 42766) {
        return "https://scan.zkfair.io";
      } else if (netId === 59144) {
        return "https://lineascan.build";
      } else if (netId === 80001) {
        return "https://mumbai.polygonscan.com";
      } else if (netId === 167007) {
        return "https://explorer.jolnir.taiko.xyz";
      } else if (netId === 167008) {
        return "https://explorer.katla.taiko.xyz";
      } else if (netId === 421611) {
        return "https://testnet.arbiscan.io";
      } else if (netId === 1313161555) {
        return "https://testnet.aurorascan.dev";
      } else if (netId === 534352) {
        return "https://scrollscan.com";
      }
    },
    
    getChainId() {
      return chainId.value;
    },

    getFallbackProvider: (state) => (networkId) => {
      let urls;

      if (networkId === 1) {
        // Ethereum
        urls = [
          "https://rpc.ankr.com/eth"
        ];
      } else if (networkId === 3) {
        // Ropsten testnet
      } else if (networkId === 4) {
        // Rinkeby testnet
      } else if (networkId === 10) {
        // Optimism
        urls = [
          "https://rpc.ankr.com/optimism",
        ]; 
      } else if (networkId === 19) {
        // Songbird
        urls = [
          "https://sgb.ftso.com.au/ext/bc/C/rpc"
        ]; 
      } else if (networkId === 56) {
        // BSC mainnet
        urls = [
          "https://rpc.ankr.com/bsc"
        ];
      } else if (networkId === 69) {
        // Optimism testnet
        urls = [
          "https://kovan.optimism.io"
        ];
      } else if (networkId === 77) {
        // Gnosis Chain testnet (Sokol)
        urls = [
          "https://sokol.poa.network"
        ];
      } else if (networkId === 100) {
        // Gnosis Chain
        urls = [
          "https://rpc.ankr.com/gnosis"
        ];
      } else if (networkId === 137) {
        // Polygon PoS Chain
        urls = [
          "https://rpc.ankr.com/polygon", 
        ];
      } else if (networkId === 250) {
        // Fantom Mainnet
        urls = [
          "https://rpc.ankr.com/fantom"
        ];
      } else if (networkId === 255) {
        // Kroma Mainnet
        urls = [
          "https://api.kroma.network/"
        ];
      } else if (networkId === 3110) {
        // SatoshiVM Testnet
        urls = [
          "https://testnet.svmscan.io/"
        ];
      } else if (networkId === 4002) {
        // Fantom Testnet
        urls = [
          "https://rpc.ankr.com/fantom_testnet",
          //"https://rpc.testnet.fantom.network",
          "https://fantom-testnet.public.blastapi.io"
        ];
      } else if (networkId === 42161) {
        // Arbitrum
        urls = [
          "https://rpc.ankr.com/arbitrum",
        ];
      } else if (networkId === 42170) {
        // Arbitrum Nova
        urls = [
          "https://nova.arbitrum.io/rpc",
        ];
      } else if (networkId === 42766) {
        // ZKFair
        urls = [
          "https://rpc.zkfair.io",
        ];
      } else if (networkId === 59144) {
        // Linea
        urls = [
          "https://rpc.linea.build/"
        ];
      } else if (networkId === 80001) {
        // Mumbai testnet (Polygon testnet)
        urls = [
          "https://matic-mumbai.chainstacklabs.com"
        ]
      } else if (networkId === 167007) {
        // Taiko Jolnir testnet
        urls = [
          "https://rpc.jolnir.taiko.xyz"
        ]
      } else if (networkId === 167008) {
        // Taiko Katla testnet
        urls = [
          "https://rpc.katla.taiko.xyz"
        ]
      } else if (networkId === 421611) {
        // Arbitrum Rinkeby testnet
        urls = [
          "https://rinkeby.arbitrum.io/rpc"
        ];
      } else if (networkId === 421613) {
        // Arbitrum Goerli testnet
        urls = [
          "https://goerli-rollup.arbitrum.io/rpc"
        ];
      } else if (networkId === 534352) {
        // Scroll
        urls = [
          "https://rpc.scroll.io/"
        ];
      } else if (networkId === 1313161555) {
        // Aurora testnet
        urls = [
          "https://testnet.aurora.dev"
        ];
      }

      if (urls) {
        const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
        return new ethers.providers.FallbackProvider(providers, 1); // return fallback provider
      } else {
        return null;
      }
    },

    getNetworkCurrency(state) {
      return state.networkCurrency;
    },

    getNetworkName(state) {
      const supportedIds = Object.keys(state.supportedNetworks);

      if (supportedIds && supportedIds.includes(String(chainId.value))) {
        return state.networkName;
      }

      return "Unsupported Network";
    },

    getSupportedNetworks(state) {
      return state.supportedNetworks;
    },

    getSupportedNetworkIds(state) {
      return Object.keys(state.supportedNetworks);
    },

    getSupportedNetworkNames(state) {
      return Object.values(state.supportedNetworks);
    },

    getTokens(state) {
      return tokens[String(chainId.value)]
    },

    isNetworkSupported(state) {
      const supportedIds = Object.keys(state.supportedNetworks);

      if (supportedIds && supportedIds.includes(String(chainId.value))) {
        return true;
      }

      return false;
    }
  },

  mutations: { 
    setNetworkData(state) {
      if (chainId.value === 1) {
        state.networkName = "Ethereum";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 10) {
        state.networkName = "Optimism";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 19) {
        state.networkName = "Songbird";
        state.networkCurrency = "SGB";
      } else if (chainId.value === 56) {
        state.networkName = "BNB Smart Chain";
        state.networkCurrency = "BNB";
      } else if (chainId.value === 69) {
        state.networkName = "Optimism Testnet";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 77) {
        state.networkName = "Gnosis Testnet";
        state.networkCurrency = "SPOA";
      } else if (chainId.value === 100) {
        state.networkName = "Gnosis Chain";
        state.networkCurrency = "XDAI";
      } else if (chainId.value === 137) {
        state.networkName = "Polygon";
        state.networkCurrency = "MATIC";
      } else if (chainId.value === 250) {
        state.networkName = "Fantom";
        state.networkCurrency = "FTM";
      } else if (chainId.value === 255) {
        state.networkName = "Kroma";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 3110) {
        state.networkName = "SatoshiVM Testnet";
        state.networkCurrency = "BTC";
      } else if (chainId.value === 4002) {
        state.networkName = "Fantom Testnet";
        state.networkCurrency = "FTM";
      } else if (chainId.value === 42161) {
        state.networkName = "Arbitrum";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 42170) {
        state.networkName = "Arbitrum Nova";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 42766) {
        state.networkName = "ZKFair";
        state.networkCurrency = "USDC";
      } else if (chainId.value === 59144) {
        state.networkName = "Linea";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 80001) {
        state.networkName = "Polygon Testnet";
        state.networkCurrency = "MATIC";
      } else if (chainId.value === 167007) {
        state.networkName = "Taiko Jolnir Testnet";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 167008) {
        state.networkName = "Taiko Katla Testnet";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 421611) {
        state.networkName = "Arbitrum Testnet";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 421613) {
        state.networkName = "Arbitrum Goerli Testnet";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 3) {
        state.networkName = "Ropsten";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 4) {
        state.networkName = "Rinkeby";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 1313161555) {
        state.networkName = "Aurora Testnet";
        state.networkCurrency = "ETH";
      } else if (chainId.value === 534352) {
        state.networkName = "Scroll";
        state.networkCurrency = "ETH";
      } else {
        state.networkName = "Unsupported Network";
        state.networkCurrency = "ETH";
      }
    }
  },

  actions: { 
    
  }

};