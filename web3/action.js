import { ethers } from "ethers";

import {
  NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
  NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS,
  spenderContractAbi,
  permitTokenContractAbi,
} from "./abi";

const SPENDERCONTRACT_ADDRESS = NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS;
const PERMITTOKENCONTRACT_ADDRESS = NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS;

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

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
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
};

export const fetchContractBalance = async (signer, account) => {
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  const balance = await contract.balances(account);

  console.log("fetchContractBalance", balance);

  return ethers.utils.formatEther(balance);
};

export const fetchContractUsedVotingRights = async (signer, account) => {
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  const used_vote = await contract.usedVotingRights(account);

  return ethers.utils.formatEther(used_vote);
};

export const fetchContractAllowance = async (signer, account) => {
  if (!signer) return;

  const permitTokenContract = new ethers.Contract(
    NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS,
    permitTokenContractAbi,
    signer,
  );
  const allowance = await permitTokenContract.allowance(
    account,
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
  );

  console.log("fetchContractAllowance", allowance);
  return ethers.utils.formatEther(allowance);
};

// 授权， 质押代币的时候必须先授权， 才可以发送或者质押代币
export const approveAndSubmit = async (signer, account) => {
  if (!signer) return;

  console.log("正在授权");
  const permitTokenContract = new ethers.Contract(
    NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS,
    permitTokenContractAbi,
    signer,
  );

  // TODO: default min_amount = 100
  const balance = await permitTokenContract.balanceOf(account);
  const _amount = ethers.utils.parseEther("100");
  if (balance.lt(_amount)) {
    throw new Error("余额不足，无法授权这么多代币");
  }

  const approvalTransaction = await permitTokenContract.approve(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    _amount,
  );

  await approvalTransaction.wait();

  const allowance = await permitTokenContract.allowance(
    account,
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
  );
  if (allowance.lt(_amount)) {
    throw new Error("授权失败");
  }

  if (!ethers.utils.formatEther(allowance)) {
    return;
  }

  console.log("授权成功， 开始质押");

  return ethers.utils.formatEther(allowance);
};

export const handleDeposit = async (signer, account, depositAmount) => {
  if (!signer) return;

  console.log("正在存款： ", depositAmount);

  const permitTokenContract = new ethers.Contract(
    NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS,
    permitTokenContractAbi,
    signer,
  );

  const allowance_valued = await permitTokenContract.allowance(
    account,
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
  );
  if (allowance_valued.lt(depositAmount)) {
    console.log("allowance_valued 不足");
    throw new Error("allowance is not enough");
  }

  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  const tx = await contract.deposit(ethers.utils.parseEther(depositAmount));

  await tx.wait();
  console.log("存款成功！");
};

export const fetchProposalDetails = async (signer, queryProposalID) => {
  if (!signer) {
    return;
  }
  console.log("正在查询提案ID: ", queryProposalID);

  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  // 获取选项的数量
  const proposalId = await contract.proposalId(); // fetch once to avoid multiple calls

  if (queryProposalID > proposalId.toNumber()) {
    console.log("当前提案长度", proposalId.toNumber());
    console.log("没有当前提案");
    return;
  }

  const endTime = await contract.votingEndTimes(proposalId);

  const optionsCountBigNumber = await contract.optionId(queryProposalID);
  const optionsCount = optionsCountBigNumber.toNumber(); // 将 BigNumber 转换为数字

  console.log("guigui: ", optionsCount);

  let options = [];

  for (let i = 1; i <= optionsCount; i++) {
    const option = await contract.options(queryProposalID, i); // 使用 queryProposalID
    options.push({
      id: option.id.toString(),
      name: option.name,
      voteCount: ethers.utils.formatEther(option.voteCount),
    });
  }

  return {
    id: queryProposalID,
    endTime: endTime.toString(),
    options,
  };
};

export const addProposal = async (signer, proposalText) => {
  if (!signer) return;
  console.log("正在增加提案： ", proposalText);

  console.log("正在获取合约实例");
  console.log("spenderContractAbi", spenderContractAbi);
  console.log("signer", signer);
  console.log(
    "NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS",
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
  );
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
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
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  try {
    const tx = await contract.setVotingDuration(proposalId, duration);
    await tx.wait();
    // alert("成功设置投票持续时间");
  } catch (error) {
    console.error("设置投票持续时间失败：", error);
    // alert("设置投票持续时间失败");
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
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  let newOptionID; // Declare newOptionID here

  try {
    const tx = await contract.addOptions(proposalIDInt, optionText);
    await tx.wait(); // Wait for transaction to be mined
    // alert("提案选项成功增加成功");

    // Fetch the new option details and log it
    newOptionID = await contract.optionId(proposalIDInt); // Assign value here
    const newOption = await contract.options(proposalIDInt, newOptionID);
    console.log("新增的选项是: ", newOption.name);
    console.log("在哪个id: ", newOption.id.toString()); // 将 BigNumber 对象转换为字符串
    console.log("这个选项目前有多少票: ", newOption.voteCount.toString()); // 将 BigNumber 对象转换为字符串
  } catch (error) {
    console.error("提案增加失败：", error);
    // alert("提案增加失败");
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
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
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
    console.log("Awaiting confirmation...");
    const receipt = await tx.wait(); // Wait for transaction to be mined

    // 从收据中提取Voted事件
    const votedEvent = receipt.events?.find((event) => event.event === "Voted");
    if (votedEvent && votedEvent.args) {
      const { _address, _proposalId, _optionId, _amount } = votedEvent.args;
      console.log("投票事件详情：");
      console.log(`用户: ${_address}`);
      console.log(`提案ID: ${_proposalId.toString()}`);
      console.log(`选项ID: ${_optionId.toString()}`);
      console.log(`投票数量: ${ethers.utils.formatEther(_amount)}`);
      console.log(
        `投票成功！提案ID: ${_proposalId}, 选项ID: ${_optionId}, 投票数量: ${ethers.utils.formatEther(
          _amount,
        )}`,
      );

      return {
        status: "success",
        message: "Vote Success",
      };
    } else {
      console.log("No Voted event found or the event had no arguments.");

      return {
        status: "fail",
        message: "No Voted event found or the event had no arguments",
      };
    }
  } catch (error) {
    console.error("投票过程中发生错误：", error);
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const getAccountVotingHistory = async (signer, account) => {
  if (!signer) {
    console.error("No signer found");
    return;
  }

  const votingHistory = [];

  // 创建合约实例
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  // 调用合约方法获取用户的投票记录
  const [proposalIds, optionIds, amounts] =
    await contract.getUserVotingHistory(account);
  // 检查三个数组的长度是否一致
  if (
    !(
      proposalIds.length === optionIds.length &&
      optionIds.length === amounts.length
    )
  ) {
    throw new Error("The returned arrays do not match in length");
  }
  // 遍历每个投票记录
  for (let i = 0; i < proposalIds.length; i++) {
    // 输出每条投票记录的详细信息
    const record = {
      proposalId: proposalIds[i].toString(),
      optionId: optionIds[i].toString(),
      amount: ethers.utils.formatEther(amounts[i]),
    };
    console.log(
      `Proposal ID: ${proposalIds[i]}, Option ID: ${
        optionIds[i]
      }, Amount: ${ethers.utils.formatEther(amounts[i])} 票数`,
    );

    votingHistory.push(record);
  }

  return votingHistory;
};

export const listentingStakeAdded = async (signer, account, callback) => {
  const spenderContract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  spenderContract.on(
    "DepositForProposal",
    (staker, amount, staked, unlockTime, stakeIndex) => {
      console.log("DepositForProposal 事件被触发：");
      console.log("staker:", staker);
      console.log("amount:", ethers.utils.formatEther(amount));
      console.log("staked_bool:", staked);
      console.log("unlockTime:", new Date(unlockTime * 1000).toLocaleString()); // 将时间戳转换为可读格式
      console.log("stakeIndex:", stakeIndex.toString());

      console.log(
        "当前账户：",
        account,
        staked,
        staker.toUpperCase() === account.toUpperCase(),
      );

      if (staked && staker.toUpperCase() === account.toUpperCase()) {
        callback(
          staker,
          stakeIndex.toString(),
          ethers.utils.formatEther(amount),
          unlockTime,
        );
      }
    },
  );
};

export const handleSubmitProposalForReview = async (
  signer,
  account,
  stakeAmount,
) => {
  console.log(
    "handleSubmitProposalForReview 被调用，质押金额为: ",
    stakeAmount,
  );
  if (!signer) return;

  try {
    // 创建VotingContract合约实例
    const votingContract = new ethers.Contract(
      SPENDERCONTRACT_ADDRESS,
      spenderContractAbi,
      signer,
    );

    // 调用合约的submitProposalForReview函数
    const tx = await votingContract.submitProposalForReview(
      ethers.utils.parseEther(stakeAmount),
    );
    const receipt = await tx.wait(); // 等待交易被确认

    // 从事件中提取质押索引
    const depositForProposalEvent = receipt.events?.find(
      (event) => event.event === "DepositForProposal",
    );
    if (depositForProposalEvent && depositForProposalEvent.args) {
      const { staker, amount, staked, unlockTime, stakeIndex } =
        depositForProposalEvent.args;
      console.log("提案审查提交完成");
      console.log(`质押者: ${staker}`);
      console.log(`质押金额(FLARE): ${ethers.utils.formatEther(amount)}`);
      console.log(`是否质押: ${staked}`);
      console.log(`解锁时间: ${new Date(unlockTime * 1000).toLocaleString()}`);
      console.log(`质押索引: ${stakeIndex.toString()}`);

      return {
        staker,
        stakeAmount: ethers.utils.formatEther(amount),
        staked,
        unlockTime,
        stakeIndex: stakeIndex.toString(), // 将BigNumber对象转换为字符串
      };
    } else {
      console.log("没有找到DepositForProposal事件，或者事件没有参数。");

      return null;
    }
  } catch (error) {
    console.error("提交提案审查失败:", error);
  }
};

export const Add_ProposalWithOptions = async (
  signer,
  proposalDescription,
  optionText,
) => {
  if (!signer) return;
  console.log(
    "Creating proposal with options: ",
    proposalDescription,
    optionText,
  );

  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  // 使用 split 方法按逗号分隔字符串，并去除两端可能的空格
  let optionsArray = optionText.split(",").map((option) => option.trim());
  try {
    // 调用智能合约的createProposalWithOptions函数
    const tx = await contract.createProposalWithOptions(
      proposalDescription,
      optionsArray,
    );
    console.log("Waiting for the transaction to be mined...");
    await tx.wait();
    console.log("Transaction confirmed.");
    console.log("Proposal added successfully");
  } catch (error) {
    console.error("Error submitting proposal and options:", error);
    throw new Error("Error when adding proposal and options.");
  }
};

export const listentingProposalAdded = async (signer, callback) => {
  let ProposalID; // 声明proposalID
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  // 监听事件
  contract.on(
    "ProposalAndOptionsSubmitted",
    (user, proposalId, description, options) => {
      console.log("New proposal and options submitted:");
      console.log("User:", user);
      console.log("Proposal ID:", proposalId.toString());
      console.log("Description:", description);
      console.log("Options:", options);
      // 可以在此添加更多的UI更新逻辑

      ProposalID = proposalId.toString();
      callback(ProposalID);
    },
  );
};

export const listentingProposalForUserAdded = async (signer, callback) => {
  if (!signer) return;
  // console.log("Processing user staked proposal: ", proposalDescription, optionDescriptions);
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  // 监听事件
  contract.on(
    "ProposalForUser",
    (user, proposalId, description, optionDescriptions, stake) => {
      console.log("User staked proposal processed:");
      console.log("User:", user);
      console.log("Proposal ID:", proposalId.toString());
      console.log("Description:", description);
      console.log("optionDescriptions:", optionDescriptions);

      console.log("Stake Amount:", stake);
      // 此处可以添加更多逻辑，例如更新前端UI

      callback(proposalId.toString());
    },
  );
};

export const processStakedProposal = async (
  signer,
  userAddress,
  proposalDescription,
  stakeAmount,
  optionTexts,
  stakeIndex,
  endTimeString,
) => {
  if (!signer) return;

  const endTime = new Date(endTimeString).getTime(); // 将时间字符串转换为时间戳（秒数）

  console.log(
    "处理用户质押的提案：",
    proposalDescription,
    "选项：",
    optionTexts,
    "质押金额：",
    stakeAmount,
    "质押索引：",
    stakeIndex,
    "结束时间：",
    endTime,
  );
  const currentTime = new Date().toLocaleString();
  console.log(`提交时间: ${currentTime}`);
  console.log(`预期提案结束时间: ${endTimeString} `); // 添加此行以显示提案结束时间

  const votingContract = new ethers.Contract(
    SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );

  const tx = await votingContract.processUserStakedProposal(
    userAddress.toString(),
    proposalDescription.toString(),
    ethers.utils.parseEther(stakeAmount.toString()),
    optionTexts.toString().split(","),
    stakeIndex.toString(),
    endTime.toString(),
  );

  // 等待交易被确认
  const receipt = await tx.wait();
  // 从事件中提取提案ID
  const proposalForUserEvent = receipt.events?.find(
    (event) => event.event === "ProposalForUser",
  );
  if (proposalForUserEvent && proposalForUserEvent.args) {
    const {
      userAddress,
      proposalId,
      proposalDescription,
      stakeAmount,
      optionDescriptions,
      endtime,
    } = proposalForUserEvent.args;
    console.log("用户质押的提案已处理：");
    console.log("用户地址:", userAddress);
    console.log("提案ID:", proposalId.toString());
    console.log("提案描述:", proposalDescription);
    console.log("质押金额:", ethers.utils.formatEther(stakeAmount));
    console.log("选项描述:", optionDescriptions.join(", "));
    console.log("endtime: " + endtime);
    console.log("endtime string: " + new Date(endtime).toLocaleString());
    console.log(`提案及选项已成功处理.提案ID: ${proposalId}`);

    return proposalId;
  } else {
    console.log("没有找到ProposalForUser事件，或者事件没有参数。");
    return null;
  }
};

export const fetchProposalOptions = async (signer, queryProposalID) => {
  if (!signer) return;
  console.log("正在查询提案ID: ", queryProposalID);
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  console.log("=====contract", contract);
  try {
    // 获取特定提案的选项数量
    const optionsCount = await contract.getOptionsCount(queryProposalID);

    let options = [];

    // 遍历选项并获取每个选项的投票计数
    for (let i = 0; i < optionsCount; i++) {
      const voteCount = await contract.getOptionVoteCount(queryProposalID, i);
      console.log(`选项 ${i}: 投票数: ${ethers.utils.formatEther(voteCount)}`);

      options.push({
        index: i,
        voteCount: ethers.utils.formatEther(voteCount),
      });
    }

    return {
      id: queryProposalID,
      options,
    };
  } catch (error) {
    console.error("获取选项失败：", error);
  }
};

export const checkUserVoted = async (signer, account, queryProposalID) => {
  if (!signer) return;
  console.log("正在查询提案ID: ", queryProposalID);
  const contract = new ethers.Contract(
    NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS,
    spenderContractAbi,
    signer,
  );
  console.log("=====contract", contract);

  try {
    // 获取特定提案的选项数量
    const userVoted = await contract.voters(account, queryProposalID);

    console.log("userVoted", userVoted);

    return userVoted;
  } catch (error) {
    console.error("获取选项失败：", error);
  }
};
