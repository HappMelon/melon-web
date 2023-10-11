import { ethers } from "ethers";

let provider: any;

export const getProvider = async () => {
  if (!window.ethereum) return;

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
  provider = providerWeb3;

  return provider;
};
