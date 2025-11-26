import { ethers } from 'ethers';

export default function useChainHelpers() {

  function getChainName(chainId) {
    let chain = chains.find(chain => chain.chainId == chainId);

    if (chain) {
      return chain.name;
    }
    
    return "Unsupported Network";
  }

  function getFallbackProvider(networkId) {
    let chain = chains.find(chain => chain.chainId == networkId);
    let urls = [chain.rpc1];

    if (urls) {
      const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
      return new ethers.providers.FallbackProvider(providers, 1); // return fallback provider
    } else {
      return null;
    }
  }

  function getRpcByChainId(chainId) {
    let chain = chains.find(chain => chain.chainId == chainId);
    return chain.rpc1;
  }

  async function switchOrAddChain(ethereum, networkName) {
    // get network id from chains
    let chain = chains.find(chain => chain.name == networkName);
    let chainId = chain.chainId;

    try {
      await ethereum.request({
        "method": "wallet_switchEthereumChain",
        "params": [
          {
            "chainId": ethers.utils.hexValue(chainId)
          }
        ]
      });
    } catch (error) {
      if (error.code === 4902) {
        await ethereum.request({
          "method": "wallet_addEthereumChain",
          "params": [
            {
              "chainId": ethers.utils.hexValue(chainId),
              "chainName": networkName,
              "nativeCurrency": {
                "name": chain.currency,
                "symbol": chain.currency,
                "decimals": 18
              },
              "rpcUrls": [chain.rpc2],
              "blockExplorerUrls": [chain.blockExplorer]
            }
          ]
        });
      }
    }
  }

  // RETURN
  return {
    getChainName,
    getFallbackProvider,
    getRpcByChainId,
    switchOrAddChain
  }
}

const chains = [
  { chainId: 10, name: "Optimism", currency: "ETH", rpc1: "https://optimism-mainnet.public.blastapi.io", rpc2: "https://rpc.ankr.com/optimism", blockExplorer: "https://optimistic.etherscan.io" },
  { chainId: 56, name: "BNB Smart Chain", currency: "BNB", rpc1: "https://bsc.drpc.org", rpc2: "https://binance.llamarpc.com", blockExplorer: "https://bscscan.com" },
  { chainId: 100, name: "Gnosis Chain", currency: "XDAI", rpc1: "https://rpc.gnosischain.com", rpc2: "https://rpc.gnosischain.com", blockExplorer: "https://gnosisscan.io" },
  { chainId: 137, name: "Polygon", currency: "MATIC", rpc1: "https://polygon-rpc.com", rpc2: "https://polygon-rpc.com", blockExplorer: "https://polygonscan.com" },
  { chainId: 250, name: "Fantom", currency: "FTM", rpc1: "https://rpc3.fantom.network", rpc2: "https://rpc3.fantom.network", blockExplorer: "https://ftmscan.com" },
  { chainId: 42161, name: "Arbitrum", currency: "ETH", rpc1: "https://arb1.arbitrum.io/rpc", rpc2: "https://arb1.arbitrum.io/rpc", blockExplorer: "https://arbiscan.io"},
  { chainId: 42170, name: "Arbitrum Nova", currency: "ETH", rpc1: "https://nova.arbitrum.io/rpc", rpc2: "https://nova.arbitrum.io/rpc", blockExplorer: "https://nova.arbiscan.io"},
  { chainId: 59144, name: "Linea", currency: "ETH", rpc1: "https://rpc.linea.build", rpc2: "https://rpc.linea.build", blockExplorer: "https://lineascan.build"},
];