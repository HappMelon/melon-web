export const NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS || ""; // address of token
export const NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_SPENDERCONTRACT_ADDRESS || ""; // 质押投票的合约地址

export const NEXT_PUBLIC_PROPOSAL_ID =
  process.env.NEXT_PUBLIC_PROPOSAL_ID || "13";

export const NEXT_PUBLIC_PROPOSAL_OPTION_ID =
  process.env.NEXT_PUBLIC_PROPOSAL_OPTION_ID || "1";

export const permitTokenContractAbi = [
  "function name() view returns (string)",
  "function nonces(address owner) view returns (uint256)",
  "function balanceOf(address account) view  returns (uint256)",
  "function permit(address owner, address spender, uint256 value, uint256 deadline,uint8 v,bytes32 r, bytes32 s)",
  "function allowance(address owner, address spender) public view  returns (uint256)",
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function mint(address to, uint256 amount) public", // mint代币， 这个不要放在前端， 可以放到管理员的页面
];

export const spenderContractAbi = [
  "function balances(address) view returns (uint256)",
  "function deposit(uint256 amount)",
  "function submitProposalForReview(uint256 amount)", // 用户提交提案审查请求，质押一定数量的代币
  "function createProposalWithOptions(string memory proposalDescription, string[] memory optionDescriptions, uint amount, uint256 endtime) returns (uint256)", // 创建提案及其选项，返回新创建的提案ID。
  "function processUserStakedProposal(address userAddress, string memory proposalDescription, uint256 stakeAmount, string[] memory optionDescriptions, uint256 stakeIndex, uint256 endtime) returns (uint256)", // 处理用户质押的提案，返回新创建的提案ID。
  "function withdraw(uint256 amount)", // 提款函数，用户可以调用此函数从合约中提取代币
  "function getAvailableWithdrawBalance(address user) view returns (uint256)", // 获取可提取余额，返回指定地址可以提取的余额数量
  "function setProposalEndTime(uint256 _proposalId, uint256 _newEndTime)", // 设置提案的结束时间
  "function getProposalStatus(uint256 _proposalId) view returns (bool)", // 获取提案的状态，返回指定提案是否活跃
  "function vote(uint256 _proposalId, uint256 _optionId, uint256 _amount)", // 投票函数，用户对特定提案的特定选项投票
  "function getContractBalance() view returns (uint256)", // 获取合约的余额，返回合约账户中的代币余额
  "function pause()", // 暂停合约功能
  "function unpause()", // 取消暂停合约功能
  "function getUserVotingHistory(address _user) view returns (uint256[] proposalIds, uint256[] optionIds, uint256[] amounts)", // 获取用户的投票历史记录
  "function proposalsLength() view returns (uint256)", // 获取提案的数量
  "function getOptionsCount(uint256 proposalId) view returns (uint256)", // 获取特定提案的选项数量
  "function getOptionVoteCount(uint256 proposalId, uint256 optionIndex) view returns (uint256)", // 获取特定提案特定选项的投票数量
  "function getCurrentProposalId() view returns (uint256)", //获取当前的提案ID
  "function handleStakeRelease(address user, uint256 stakeIndex, bool penalizeStake)", // 处理质押释放，根据指定条件释放或没收用户的质押资金
  "function settleRewards(uint256 proposalId, uint256 winningOptionId)", // 结算奖励，为投票胜出的选项的投票者分配奖励
  "function settleFundsForAverageQuality(uint256 _proposalId)", // 结算平均质量资金，对提案的参与者进行奖励或惩罚
  "function verifyComplianceAndExpectations(uint256 _proposalId)", // 验证合规性和预期，对达到预期的提案进行奖励
  "function checkQualityComplianceBelowExpectations(uint256 _proposalId)", // 检查质量合规性不达标的情况，对未达标的提案进行惩罚
  "function deactivateProposal(uint256 _proposalId)", // 停用提案，使提案不再活跃
  "function usedVotingRights(address) public view returns (uint256)", // 查询已用投票权函数，返回指定地址已使用的投票权数量
  "event Received(address indexed caller, uint amount, string message)",
  "event Deposited(address indexed user, uint amount)",
  "event Withdrawn(address indexed user, uint amount)",
  "event Voted(address indexed _address, uint256 indexed _proposalId, uint256 indexed _optionId, uint256 _amount)", // 用户投票
  "event ProposalAndOptionsSubmitted(address indexed user, uint256 indexed proposalIndex, string proposalDescription, string[] optionDescriptions, uint256 endtime)",
  "event DepositForProposal(address indexed staker, uint256 amount, bool staked, uint256 unlockTime, uint256 indexed stakeIndex)", // 为提案质押代币。
  "event FundsSettledForAverageQuality(uint256 indexed proposalId, address indexed proposer, uint256 amountToReturn)", // 为平均质量的提案结算资金
  "event FundsPenalizedForNonCompliance(uint256 indexed proposalId, address indexed proposer, uint256 penalty)", // 因不合规被处罚的资金
  "event ProposalEndTime(uint256 _proposalId, uint256 endTime)", // 提案结束时间
  "event ProposalForUser(address indexed userAddress, uint256 indexed proposalId, string proposalDescription, uint256 stakeAmount, string[] optionDescriptions, uint256 endtime)",

  "event StakeReleased(address indexed user, uint256 stakeIndex, bool penalized, uint256 amountReleased)", // 质押释放
  "event ProposalConcluded(uint256 indexed proposalId, bool isActive)", // 提案结论
  "event RewardDistributed(address indexed voter, uint256 proposalId, uint256 amount, bool isWinner)", // 分配奖励
];
