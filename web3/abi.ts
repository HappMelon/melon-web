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
  "function setVotingDuration(uint256 _proposalId, uint256 _durationInSeconds)",
  "function reclaimVotingRights(uint256 _proposalId)",
  "function pause()",
  "function unpause()",
  "function votingEndTimes(uint256) view returns (uint256)",
  "function proposalId() view returns (uint256)",
  "function optionId(uint256) view returns (uint256)",
  "function options(uint256, uint256) view returns (uint256 id, string name, uint256 voteCount)",
  "function deposit(uint256 amount) public", // 存款函数，允许用户存入指定数量的代币
  "function withdraw(uint256 amount) public", // 提款函数，允许用户提取指定数量的代币
  "function vote(uint256 _proposalId, uint256 _optionId, uint256 _amount) public", // 投票函数，允许用户对特定提案的选项投票
  "function getContractBalance() public view returns (uint)", // 查询合约余额函数，返回合约中的代币总量
  "function createProposalWithOptions(string memory proposalDescription, string[] memory optionDescriptions) public", // 创建提案函数，允许用户创建一个新提案并添加选项
  "function processUserStakedProposal(address userAddress, string memory proposalDescription, uint256 stakeAmount, string[] memory optionDescriptions, uint256 stakeIndex) public", // 处理用户质押提案函数，允许管理员处理用户的质押提案
  "function settleFundsForAverageQuality(uint256 _proposalId) public", // 结算平均质量提案的资金，用于处理提案质量一般的情况
  "function verifyComplianceAndExpectations(uint256 _proposalId) public", // 验证合规性和预期函数，用于检查提案是否符合预期和规定
  "function checkQualityComplianceBelowExpectations(uint256 _proposalId) public", // 检查低于预期的质量合规性，用于处理提案质量低于预期的情况
  "function setUnlockTimeForStake(address _staker,uint256 _stakeIndex, uint256 _newUnlockTime) public", // 设置质押解锁时间函数，允许管理员为特定质押设置新的解锁时间
  "function voters(address, uint256) public view returns (bool)", // 查询投票者函数，检查指定地址是否已对某提案投票
  "function usedVotingRights(address) public view returns (uint256)", // 查询已用投票权函数，返回指定地址已使用的投票权数量
  "function getUserVotingHistory(address) public view returns (uint256[],uint256[],uint256[])", // 获取用户投票历史函数，返回指定地址的投票记录
  "function stakeTokensForProposal(uint256 _amount) public returns (uint256)",
  "function proposalOptions(uint256) public view returns (Option[])",
  "function proposalsLength() public view returns (uint256)",
  "function getOptionsCount(uint256 proposalId) public view returns (uint256)",
  "function getOptionVoteCount(uint256 proposalId, uint256 optionIndex) public view returns (uint256)",
  "function getProposalStatus(uint256 _proposalId) public view returns(bool)",
  "function SetProposalStatus(uint256 _proposalId, bool _isActive) public",
  "function getAvailableWithdrawBalance(address user) public view returns (uint256)",
  "function getLastStakeIndex(address user) public view returns (uint256)",
  "function getCurrentProposalId() public view returns (uint256)",

  "event DepositForProposal(address indexed staker, uint256 amount, bool staked, uint256 unlockTime, uint256 indexed stakeIndex)",
  "event ProposalAndOptionsSubmitted(address indexed user, uint256 indexed proposalIndex, string proposalDescription, string[] optionDescriptions)",
  "event ProposalForUser(address indexed userAddress, uint256 indexed proposalId, string proposalDescription, uint256 stakeAmount, string[] optionDescriptions)",
  "event TokensStaked(address indexed user, uint256 amount, bool isForProposal)",
  "event FundsSettledForAverageQuality(uint256 indexed proposalId, address indexed proposer, uint256 amountToReturn)",
  "event WithdrawalDetailed(address indexed user, uint256 amountWithdrawn, uint256 balanceAfterWithdrawal, uint256 lockedAmount)",
  "event UnlockTimeUpdated(address indexed staker, uint256 indexed stakeIndex, uint256 newUnlockTime)",
  "event FundsPenalizedForNonCompliance(uint256 indexed proposalId, address indexed proposer, uint256 penalty)",
  "event Voted(address indexed _address, uint256 indexed _proposalId, uint256 indexed _optionId, uint256 _amount)",
];
