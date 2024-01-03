import { ethers } from 'ethers';

export default function useChainHelpers() {

  function getChainName(chainId) {
    if (chainId === 1) {
      return "Ethereum";
    } else if (chainId === 10) {
      return "Optimism";
    } else if (chainId === 14) {
      return "Flare";
    } else if (chainId === 16) {
      return "Coston Testnet";
    } else if (chainId === 19) {
      return "Songbird";
    } else if (chainId === 56) {
      return "BNB Smart Chain";
    } else if (chainId === 77) {
      return "Gnosis Testnet";
    } else if (chainId === 100) {
      return "Gnosis Chain";
    } else if (chainId === 137) {
      return "Polygon";
    } else if (chainId === 250) {
      return "Fantom";
    } else if (chainId === 255) {
      return "Kroma";
    } else if (chainId === 324) {
      return "zkSync Era";
    } else if (chainId === 4002) {
      return "Fantom Testnet";
    } else if (chainId === 42161) {
      return "Arbitrum";
    } else if (chainId === 42170) {
      return "Arbitrum Nova";
    } else if (chainId === 42766) {
      return "ZKFair";
    } else if (chainId === 59144) {
      return "Linea";
    } else if (chainId === 80001) {
      return "Polygon Testnet";
    } else if (chainId === 167007) {
      return "Taiko Testnet";
    } else if (chainId === 421611) {
      return "Arbitrum Testnet";
    } else if (chainId === 534352) {
      return "Scroll Mainnet";
    } else if (chainId === 1313161555) {
      return "Aurora Testnet";
    } else {
      return "Unsupported Network";
    }
  }

  function getFallbackProvider(networkId) {
    let urls;

      if (networkId === 1) {
        // Ethereum
        urls = [
          "https://rpc.ankr.com/eth"
        ];
      } else if (networkId === 10) {
        // Optimism
        urls = [
          "https://rpc.ankr.com/optimism"
        ]; 
      } else if (networkId === 14) {
        // Flare
        urls = [
          "https://flare-api.flare.network/ext/C/rpc"
        ];
      } else if (networkId === 16) {
        // Coston testnet
        urls = [
          "https://coston-api.flare.network/ext/C/rpc"
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
          "https://rpc.ankr.com/polygon"
        ];
      } else if (networkId === 250) {
        // Fantom Mainnet
        urls = [
          "https://rpc.ankr.com/fantom",
        ];
      } else if (networkId === 255) {
        // Kroma Mainnet
        urls = [
          "https://api.kroma.network/",
        ];
      } else if (networkId === 324) {
        // zkSync Era Mainnet
        urls = [
          "https://mainnet.era.zksync.io",
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
          "https://rpc.ankr.com/arbitrum"
        ];
      } else if (networkId === 42170) {
        // Arbitrum Nova
        urls = [
          "https://nova.arbitrum.io/rpc"
        ];
      } else if (networkId === 42766) {
        // zkFair
        urls = [
          "https://rpc.zkfair.io"
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
      } else if (networkId === 421611) {
        // Arbitrum testnet
        urls = [
          "https://rinkeby.arbitrum.io/rpc"
        ];
      } else if (networkId === 534352) {
        // Scroll mainnet
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
  }

  function switchNetwork(networkName) {
    let method;
    let params;

    if (networkName == "Ethereum") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x1" }] 
    } else if (networkName == "Polygon Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://mumbai.polygonscan.com" ],
        chainId: "0x13881",
        chainName: "Mumbai Testnet",
        nativeCurrency: { decimals: 18, name: "Matic", symbol: "MATIC" }, 
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"]
      }] 
    } else if (networkName == "Arbitrum Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.arbiscan.io" ],
        chainId: "0x66EEB",
        chainName: "Arbitrum Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rinkeby.arbitrum.io/rpc"]
      }] 
    } else if (networkName == "Arbitrum") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://arbiscan.io" ],
        chainId: "0xa4b1",
        chainName: "Arbitrum One",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rpc.ankr.com/arbitrum"]
      }] 
    } else if (networkName == "Arbitrum Nova") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://nova.arbiscan.io" ],
        chainId: "0xa4ba",
        chainName: "Arbitrum Nova",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://nova.arbitrum.io/rpc"]
      }] 
    } else if (networkName == "Optimism") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://optimistic.etherscan.io/" ],
        chainId: "0xA",
        chainName: "Optimism",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rpc.ankr.com/optimism"]
      }] 
    } else if (networkName == "Optimism Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://kovan-optimistic.etherscan.io/" ],
        chainId: "0x45",
        chainName: "Optimism Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://kovan.optimism.io"]
      }] 
    } else if (networkName == "Polygon") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://polygonscan.com" ],
        chainId: "0x89",
        chainName: "Polygon PoS Chain",
        nativeCurrency: { decimals: 18, name: "MATIC", symbol: "MATIC" }, 
        rpcUrls: ["https://rpc.ankr.com/polygon"]
      }] 
    } else if (networkName == "Gnosis Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://blockscout.com/poa/sokol" ],
        chainId: "0x4D",
        chainName: "Gnosis Testnet",
        nativeCurrency: { decimals: 18, name: "SPOA", symbol: "SPOA" }, 
        rpcUrls: ["https://sokol.poa.network"]
      }] 
    } else if (networkName == "Gnosis Chain") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://blockscout.com/xdai/mainnet" ],
        chainId: "0x64",
        chainName: "Gnosis Chain",
        nativeCurrency: { decimals: 18, name: "XDAI", symbol: "XDAI" }, 
        rpcUrls: ["https://rpc.gnosis.gateway.fm"]
      }] 
    } else if (networkName == "BNB Smart Chain") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://bscscan.com/" ],
        chainId: "0x38",
        chainName: "BNB Smart Chain",
        nativeCurrency: { decimals: 18, name: "BNB", symbol: "BNB" }, 
        rpcUrls: ["https://rpc.ankr.com/bsc"]
      }] 
    } else if (networkName == "Aurora Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.aurorascan.dev/" ],
        chainId: "0x4E454153",
        chainName: "Aurora Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://testnet.aurora.dev"]
      }] 
    } else if (networkName == "Songbird") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://songbird-explorer.flare.network/" ],
        chainId: "0x13",
        chainName: "Songbird",
        nativeCurrency: { decimals: 18, name: "SGB", symbol: "SGB" }, 
        rpcUrls: ["https://sgb.ftso.com.au/ext/bc/C/rpc"]
      }] 
    } else if (networkName == "Coston Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://coston-explorer.flare.network" ],
        chainId: "0x10",
        chainName: "Coston Testnet",
        nativeCurrency: { decimals: 18, name: "FLR", symbol: "FLR" }, 
        rpcUrls: ["https://coston-api.flare.network/ext/C/rpc"]
      }] 
    } else if (networkName == "Flare") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://flare-explorer.flare.network" ],
        chainId: "0xE",
        chainName: "Flare",
        nativeCurrency: { decimals: 18, name: "FLR", symbol: "FLR" }, 
        rpcUrls: ["https://flare-api.flare.network/ext/C/rpc"]
      }] 
    } else if (networkName == "Fantom") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://ftmscan.com" ],
        chainId: "0xFA",
        chainName: "Fantom",
        nativeCurrency: { decimals: 18, name: "FTM", symbol: "FTM" }, 
        rpcUrls: ["https://rpc.ankr.com/fantom"]
      }] 
    } else if (networkName == "Fantom Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.ftmscan.com" ],
        chainId: "0xFA2",
        chainName: "Fantom Testnet",
        nativeCurrency: { decimals: 18, name: "FTM", symbol: "FTM" }, 
        rpcUrls: ["https://rpc.ankr.com/fantom_testnet"]
      }] 
    } else if (networkName == "zkSync Era") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://explorer.zksync.io/" ],
        chainId: "0x144",
        chainName: "zkSync Era",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://mainnet.era.zksync.io"]
      }] 
    } else if (networkName == "Scroll") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://scrollscan.com/" ],
        chainId: "0x82750",
        chainName: "Scroll",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rpc.scroll.io/"]
      }] 
    } else if (networkName == "Kroma") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://kromascan.com/" ],
        chainId: "0xff",
        chainName: "Kroma",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://api.kroma.network/"]
      }] 
    } else if (networkName == "Linea") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://lineascan.build/" ],
        chainId: "0xe708",
        chainName: "Linea",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rpc.linea.build/"]
      }] 
    } else if (networkName == "Taiko Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://explorer.jolnir.taiko.xyz" ],
        chainId: "0x28c5f",
        chainName: "Taiko Jolnir Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rpc.jolnir.taiko.xyz"]
      }] 
    } else if (networkName == "ZKFair") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://scan.zkfair.io/" ],
        chainId: "0xa70e",
        chainName: "ZKFair",
        nativeCurrency: { decimals: 18, name: "USDC", symbol: "USDC" }, 
        rpcUrls: ["https://rpc.zkfair.io"]
      }] 
    }

    return { 
      method: method, 
      params: params
    }
  }

  // RETURN
  return {
    getChainName,
    getFallbackProvider,
    switchNetwork
  }
}