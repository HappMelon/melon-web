import { ethers } from "ethers";

import { SPENDERCONTRACT_ADDRESS, spenderContractAbi } from "./abi";

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

  console.log("正在获取合约实例");
  console.log("spenderContractAbi", spenderContractAbi);
  console.log("signer", signer);
  console.log("SPENDERCONTRACT_ADDRESS", SPENDERCONTRACT_ADDRESS);
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

  return proposal;
};

export const setVotingDurationForProposal = async (
  signer,
  proposalId,
  duration,
) => {
  if (!signer) return;
  console.log(
    "为提案设置投票持续时间， 提案ID：",
    proposalId,
    "持续时间：",
    duration,
    "秒",
  );
  const contract = new ethers.Contract(
    SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  try {
    const tx = await contract.setVotingDuration(proposalId, duration);
    await tx.wait();
    alert("成功设置投票持续时间");
  } catch (error) {
    console.error("设置投票持续时间失败：", error);
    alert("设置投票持续时间失败");
  }

  const endTime = await contract.votingEndTimes(proposalId); // 假设您的合约中有一个叫做votingEndTimes的mapping
  console.log(`提案 ${proposalId} 的投票将在时间戳 ${endTime} 结束`);

  return endTime;
};

export const addOption = async (signer, proposalID, optionText) => {
  if (!signer) return;

  // Parse the proposalID to integer
  const proposalIDInt = parseInt(proposalID, 10);
  console.log(
    `正在增加的提案的选项ids是${proposalIDInt}， 提案选项的名称为${optionText}`,
  );
  const contract = new ethers.Contract(
    SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  let newOptionID; // Declare newOptionID here

  try {
    const tx = await contract.addOptions(proposalIDInt, optionText);
    await tx.wait(); // Wait for transaction to be mined
    alert("提案选项成功增加成功");

    // Fetch the new option details and log it
    newOptionID = await contract.optionId(proposalIDInt); // Assign value here
    const newOption = await contract.options(proposalIDInt, newOptionID);
    console.log("新增的选项是: ", newOption.name);
    console.log("在哪个id: ", newOption.id.toString()); // 将 BigNumber 对象转换为字符串
    console.log("这个选项目前有多少票: ", newOption.voteCount.toString()); // 将 BigNumber 对象转换为字符串
  } catch (error) {
    console.error("提案增加失败：", error);
    alert("提案增加失败");
  }

  if (newOptionID) {
    // Check if newOptionID has a value
    for (let i = 1; i <= newOptionID; i++) {
      const option = await contract.options(proposalID, i);
      console.log(
        `选项ID: ${option.id.toString()}, 选项名称: ${
          option.name
        }, 投票数: ${option.voteCount.toString()}`,
      );
    }
  }

  return newOptionID;
};

export const vote = async (
  signer,
  account,
  voteProposalID,
  voteOptionID,
  voteAmount,
) => {
  if (!signer) return;

  // Parse the proposalID and optionID to integers
  const proposalIDInt = parseInt(voteProposalID, 10);
  const optionIDInt = parseInt(voteOptionID, 10);
  const voteAmountInt = ethers.utils.parseEther(voteAmount); // 显示的是整数， 实际传入的是bignumber
  console.log(
    `正在投票的提案ID是${proposalIDInt}， 选项ID为${optionIDInt}， 投票数量为${voteAmount}`,
  );

  const contract = new ethers.Contract(
    SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  const used_vote = await contract.usedVotingRights(account);
  const balance = await contract.balances(account); // fetch once to avoid multiple calls

  console.log("=======voteAmountInt", voteAmountInt);
  console.log("=======used_vote", used_vote);
  console.log("=======balance", balance);

  if (balance.sub(used_vote).lte(voteAmountInt)) {
    console.log("you dont have enough values to vote");
    // alert("you dont have enough values to vote");
    return {
      status: "fail",
      message: "you dont have enough values to vote",
    };
  }

  try {
    console.log(
      `当前账户还有${
        ethers.utils.formatEther(balance) - ethers.utils.formatEther(used_vote)
      }投票权利， 投票数量为${voteAmount}`,
    );
    const tx = await contract.vote(proposalIDInt, optionIDInt, voteAmountInt);
    await tx.wait(); // Wait for transaction to be mined

    // alert("投票成功");

    // Fetch the updated option details and log it
    const updatedOption = await contract.options(proposalIDInt, optionIDInt);
    console.log("投票的选项是: ", updatedOption.name);
    console.log("在哪个id: ", updatedOption.id.toString()); // Convert BigNumber object to string
    console.log(
      "这个选项现在有多少票: ",
      ethers.utils.formatEther(updatedOption.voteCount),
    ); // Convert BigNumber object to string，

    return {
      status: "success",
      message: "Stake Success",
      data: {
        updatedOption,
      },
    };
  } catch (error) {
    console.error("投票失败：", error);
    // alert("投票失败");
    return {
      status: "fail",
      message: error.message,
    };
  }

  // Optionally, list all options for the given proposal with updated vote counts
  // const optionCount = await contract.optionId(proposalIDInt);
  // for (let i = 1; i <= optionCount; i++) {
  //   const option = await contract.options(proposalIDInt, i);
  //   console.log(
  //     `选项ID: ${option.id.toString()}, 选项名称: ${option.name
  //     }, 投票数: ${ethers.utils.formatEther(option.voteCount)}`,
  //   );
  // }
};
