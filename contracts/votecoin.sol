pragma solidity ^0.5.0;

contract SafeMath {

    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a, "Invalid input");
    }

    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a, "Invalid input");
        c = a - b;
    }

    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b, "Invalid input");
    }

    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0, "Invalid input");
        c = a / b;
    }
}


contract ERC20Interface {

    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed delegate, uint tokens);

}


contract Owned {

    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }

    function acceptOwnership() public {
        require(msg.sender == newOwner, "You are not the new owner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}


contract HasBoardMembers {

    function isBoardMember(address who) public view returns(bool);
}


contract VoteCoin is ERC20Interface, Owned, SafeMath {

    string public symbol;
    string public name;
    uint8 public decimals;
    uint tokensIssued;
    bool public tradable;
    uint maxBalance;
    HasBoardMembers targetVotingOrg;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    constructor (
        string memory _symbol,
        string memory _name,
        uint8 _decimals,
        bool _tradable,
        uint _maxBalance
    )
        public
    {
        symbol = _symbol;
        name = _name;
        decimals = _decimals;
        tokensIssued = 0;
        tradable = _tradable;
        maxBalance = _maxBalance;
    }

    function totalSupply() public view returns (uint) {
        return tokensIssued;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function setTargetVotingOrganization(address target) public {
        require(msg.sender == owner, "Must be the owner");
        targetVotingOrg = HasBoardMembers(target);
    }

    function transfer(address to, uint tokens) public returns (bool) {
        require(tokens <= balances[msg.sender], "Not enough tokens in supply");
        require(tradable, "This token cannot be traded");
        require(maxBalance == 0 || safeAdd(balances[to], tokens) <= maxBalance, "Cannot exceed max balance");
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens) public returns (bool) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public view returns (uint) {
        return allowed[tokenOwner][spender];
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool) {
        require(tokens <= balances[from], "Invalid token amount");
        require(tokens <= allowed[from][msg.sender], "Invalid token amount");
        require(tradable, "This token cannot be traded");
        require(maxBalance == 0 || safeAdd(balances[to], tokens) <= maxBalance, "Cannot exceed max balance");
        balances[from] = safeSub(balances[from], tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(from, to, tokens);
        return true;
    }

    function mint(address to, uint tokens) public returns(bool) {
        require(targetVotingOrg.isBoardMember(msg.sender), "You are not a board member");
        require(maxBalance == 0 || safeAdd(balances[to], tokens) <= maxBalance, "Cannot exceed max balance");
        balances[to] = safeAdd(tokens, balances[to]);
        tokensIssued = safeAdd(tokens, tokensIssued);
        return true;
    }

    function () external payable {
        revert("Fallback function");
    }
}


contract VoteCoinFactory {
    address[] contracts;
    event Created(uint indexed orgId, address indexed at);


    function getContractCount() public view returns(uint) {
        return contracts.length;
    }

    function newVoteCoin(
        string memory symbol,
        string memory name,
        uint8 decimals,
        bool tradable,
        uint maxBalance
    )
        public
        returns(address newContract)
    {
        VoteCoin v = new VoteCoin(symbol, name, decimals, tradable, maxBalance);
        emit Created(contracts.length, address(v));
        contracts.push(address(v));
        return address(v);
    }

    function getContractAddressByIndex(uint index) public view returns(address) {
        return contracts[index];
    }
}
