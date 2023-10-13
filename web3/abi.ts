export const PERMITTOKENCONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_PERMITTOKENCONTRACT_ADDRESS || ""; // address of token
export const SPENDERCONTRACT_ADDRESS =
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
  "function deposit(uint256 amount)",
  "function getContractBalance() public view returns(uint)", // 获得当前合约的总余额
  "function withdraw(uint256 amount)",
  "function balances(address _address) public view returns (uint256)", // 获取当前账户的在这个合约质押了多少， 就是小狐狸钱包
  "function addProposal(string _name)", // 添加提案， 必须是管理员才可以添加
  "function optionId(uint256 _proposalId) view returns (uint256)", // 输入提案的id 返回的option的长度. 感觉没有什么用！！！
  "function addOptions(uint256 _proposalId, string _name)", // 增加提案的选项， 输入提案id uint， 输入选项string
  "function options(uint256 _proposalId, uint256 _optionId) view returns (uint256 id, string name, uint256 voteCount)", // 输入选项id ， 和提案， 会返回结构体  结构体的信息是 id name vote 投票的数量
  "function proposals(uint256 _proposalId) view returns (uint256 id, string name)", // 返回提案的id 和 名字
  "function vote(uint256 _proposalId, uint256 _optionId, uint256 _amount) public ", // 投票
  "function optionsCount(uint256, uint256) view returns (uint256)", // 当前选项的投票
  "function usedVotingRights(address _address) public view returns (uint256)", // 当前账户已经使用的投票权
  "function votingRecords(address _address, uint256 _proposalId) public view returns (uint256)", // 投票记录
  "function setVotingDuration(uint256 _proposalId, uint256 _durationInSeconds)", // 设置投票的时间, 输入秒
  "function votingEndTimes(uint256) view returns (uint256)", //  返回的是block时间
  "function reclaimVotingRights(uint256 _proposalId, uint256 correctOptionId) public", // 重置投票， 以后可能会改成投票奖励余惩罚机制
  "event ProposalAdded(uint256 indexed proposalId, string name)",
  "function proposalId() view returns (uint256)", // 一共设置了多少个提案
  // 在这里添加其它必要的ABI项
];
