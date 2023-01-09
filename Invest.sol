pragma solidity ^0.6.0;

// Binance Smart Chain contract
import "https://github.com/binance-chain/bsc-contracts/blob/main/contracts/BNB.sol";

contract Investment {
    // Address of the contract owner
    address private owner;

    // Mapping from user addresses to their investments and earnings
    mapping (address => InvestmentData) public investments;

    // Struct to store investment data for each user
    struct InvestmentData {
        uint256 investment; // Amount invested in BNB
        uint256 earnings; // Earnings in BNB
        address referrer; // Address of the user who referred this user
        uint256 referralEarnings; // Earnings from referrals in BNB
    }

    // Minimum and maximum investment limits in BNB
    uint256 public minInvestment = 0.1 * 1e8; // 0.1 BNB
    uint256 public maxInvestment = 100 * 1e8; // 100 BNB

    // Event to track when a user invests
    event Invested(address user, uint256 investment);

    // Event to track when a user withdraws
    event Withdrew(address user, uint256 investment, uint256 earnings);

    // Event to track when a user refers a friend
    event Referred(address user, address friend);

    // Constructor function to set the contract owner
    constructor() public {
        owner = msg.sender;
    }

    // Function to enable users to invest BNB in the contract
    function invest(uint256 _investment) public payable {
        // Ensure that the user is sending BNB
        require(msg.value == _investment, "Invalid token");

        // Check if the investment is within the minimum and maximum limits
        require(_investment >= minInvestment, "Investment below minimum limit");
        require(_investment <= maxInvestment, "Investment above maximum limit");

        // Get the user's investment data
        InvestmentData storage data = investments[msg.sender];

        // If the user has not invested before, set their referrer to themselves
        if (data.investment == 0) {
            data.referrer = msg.sender;
        }

        // Update the user's investment and earnings
        data.investment += _investment;
        data.earnings += _investment * 1.01; // 1% daily return

        // Emit the Invested event
        emit Invested(msg.sender, _invest
        
        


    // Function to allow users to withdraw their investment and earnings
    function withdraw() public {
        // Get the user's investment data
        InvestmentData storage data = investments[msg.sender];

        // Ensure that the user has invested
        require(data.investment > 0, "No investment to withdraw");

        // Send the investment and earnings back to the user
        msg.sender.transfer(data.investment + data.earnings);

        // Reset the user's investment and earnings
        data.investment = 0;
        data.earnings = 0;
        data.referralEarnings = 0;

        // Emit the Withdrew event
        emit Withdrew(msg.sender, data.investment, data.earnings);
    }

    // Function to allow users to refer friends to the contract
    function refer(address _friend) public {
        // Get the user's investment data
        InvestmentData storage data = investments[msg.sender];

        // Ensure that the user has invested
        require(data.investment > 0, "No investment to refer friends");

        // Set the referred friend's referrer to the user
        InvestmentData storage friendData = investments[_friend];
        friendData.referrer = msg.sender;

        // Emit the Referred event
        emit Referred(msg.sender, _friend);
    }

    // Function to allow the contract owner to withdraw all investments
    function withdrawAll(uint256 _amount) public {
        // Ensure that the caller is the contract owner
        require(msg.sender == owner, "Only the owner can call this function");

        // Iterate over all investments and withdraw them
        for (address user in investments) {
            InvestmentData storage data = investments[user];
            if (_amount > 0) {
                // Withdraw the specified amount or the remaining balance if it is less
                uint256 amount = _amount >= data.investment + data.earnings ? data.investment + data.earnings : _amount;
                user.transfer(amount);
                _amount -= amount;
                data.investment -= amount;
                data.earnings -= amount;
                data.referralEarnings = 0;
            } else {
                // Reset the investment and earnings if the amount is 0
                data.investment = 0;
                data.earnings = 0;
                data.referralEarnings = 0;
            }
        }
    }
}
