<!-- JavaScript code to connect to the smart contract and interact with it -->
<script>
  // Connect to the smart contract
 
// Connect to the smart contract
async function connectContract() {
  // Get the contract address and ABI
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const contractABI = [YOUR_CONTRACT_ABI];

  // Connect to the contract
  contract = new web3.eth.Contract(contractABI, contractAddress);

  // Get the minimum and maximum investment amounts
  const minInvestment = await contract.methods.minInvestment().call();
  const maxInvestment = await contract.methods.maxInvestment().call();

  // Display the minimum and maximum investment amounts
  document.getElementById("min-investment").innerHTML = minInvestment / 1e8;
  document.getElementById("max-investment").innerHTML = maxInvestment / 1e8;
}

// Connect the user's wallet
async function connectWallet() {
  // Request the user's wallet
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];

  // Set the account as the default account for contract calls
  contract.defaultAccount = account;

  // Update the UI
  document.getElementById("connect-wallet-btn").style.display = "none";
  document.getElementById("disconnect-wallet-btn").style.display = "block";
}

// Disconnect the user's wallet
function disconnectWallet() {
  // Reset the default account for contract calls
  contract.defaultAccount = undefined;

  // Update the UI
  document.getElementById("connect-wallet-btn").style.display = "block";
  document.getElementById("disconnect-wallet-btn").style.display = "none";
}

// Enable users to invest BNB in the contract
async function invest() {
  // Get the investment amount
  const investment = document.getElementById("investment-input").value;

  // Ensure that the investment is a positive number
  if (investment <= 0) {
    displayError("Invalid investment amount");
    return;
  }

  // Convert the investment to wei
  const weiInvestment = investment * 1e8;

  // Call the contract's invest function
  try {
    await contract.methods.invest(weiInvestment).send({ value: weiInvestment });
    displaySuccess("Investment successful");
  } catch (error) {
    displayError(error.message);
  }
}

// Enable users to reinvest their earnings
async function reinvest() {
  // Call the contract's invest function with the user's earnings as the investment amount
  try {
    const investmentData = await contract.methods.investments(contract.defaultAccount).call();
    const weiEarnings = investmentData.earnings;
    await contract.methods.invest(weiEarn

                                  
 // Enable users to withdraw their investment and earnings
async function withdraw() {
  // Call the contract's withdraw function
  try {
    await contract.methods.withdraw().send();
    displaySuccess("Withdrawal successful");
  } catch (error) {
    displayError(error.message);
  }
}

// Display an error message
function displayError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = message;
  errorMessage.style.display = "block";
}

// Display a success message
function displaySuccess(message) {
  const successMessage = document.getElementById("success-message");
  successMessage.innerHTML = message;
  successMessage.style.display = "block";
}

// Hide error and success messages after a short delay
function hideMessages() {
  setTimeout(() => {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("success-message").style.display = "none";
  }, 2000);
}

// Update the investment progress and history display
async function updateDisplay() {
  // Get the user's investment data
  const investmentData = await contract.methods.investments(contract.defaultAccount).call();
  const investment = investmentData.investment / 1e8;
  const earnings = investmentData.earnings / 1e8;
  const referralEarnings = investmentData.referralEarnings / 1e8;
  const total = investment + earnings + referralEarnings;

  // Update the investment progress display
  document.getElementById("investment-progress").innerHTML = total;

  // Update the investment history display
  const historyList = document.getElementById("investment-history");
  historyList.innerHTML = ""; // Clear the list
  if (investment > 0) {
    const investmentItem = document.createElement("li");
    investmentItem.innerHTML = `Investment: ${investment} BNB`;
    historyList.appendChild(investmentItem);
  }
  if (earnings > 0) {
    const earningsItem = document.createElement("li");
    earningsItem.innerHTML = `Earnings: ${earnings} BNB`;
    historyList.appendChild(earningsItem);
  }
  if (referralEarnings > 0) {
    const referralEarningsItem = document.createElement("li");
    referralEarningsItem.innerHTML = `Referral Earnings: ${referralEarnings} BNB`;
    historyList.appendChild(referralEarningsItem);
  }
}

// Connect to the contract and update the display
connectContract().then(updateDisplay);

// Update the display every 5 seconds
setInterval(updateDisplay, 5000);
                                 
                                  
