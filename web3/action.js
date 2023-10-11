import { ethers } from "ethers";

import {
  PERMITTOKENCONTRACT_ADDRESS,
  SPENDERCONTRACT_ADDRESS,
  permitTokenContractAbi,
  spenderContractAbi,
} from "./abi";

export const connectWallet = async (onAccountChange) => {
  if (!window.ethereum) return;

  const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);

  const currenAccount = await providerWeb3.send("eth_requestAccounts", []);

  ethereum.on("accountsChanged", (accountsChange) => {
    onAccountChange(accountsChange[0]);
  });

  return {
    provider: providerWeb3,
    signer: providerWeb3.getSigner(currenAccount[0]),
    account: currenAccount[0],
  };
};

export const getContract = async (signer) => {
  return new ethers.Contract(
    SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
};

export const addProposal = async (signer, proposalText) => {
  if (!signer) return;
  console.log("正在增加提案： ", proposalText);
  const contract = new ethers.Contract(
    SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  contract.on("ProposalAdded", (id, name, event) => {
    console.log("New proposal added:");
    console.log("ID:", id.toString());
    console.log("Name:", name);
  });

  const tx = await contract.addProposal(proposalText);
  await tx.wait(); // Wait for transaction to be mined

  const proposalId = await contract.proposalId();
  const proposal = await contract.proposals(proposalId);
  console.log(`提案的ids是${proposal.id}， 提案的名称为${proposal.name}`);

  return {
    proposalId,
    proposal,
  };
};
