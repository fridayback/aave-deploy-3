const { saveDeploy, getConfig, getContractAddr, getOracleParamPairs } = require('../utils');

const BigNumber = require('bignumber.js');
const { tokenToString } = require('typescript');

task('balance', 'withdraw token from pool')
  .addOptionalParam("token", "token name,eg. USDT")
  .addParam("account", "user: eg. 0x52F1045671F56f572f7743232B558dDCa0627e10")
  .setAction(async ({ token, account }) => {

    const accounts = await hre.ethers.getSigners();

    const chainId = await hre.getChainId();
    const config = getConfig(chainId).ReservesConfig[token];
    if(!config) {
        console.log(`${token} is not supported`);
        return;
    }

    let reserve = config.underlying;
    let userData = {}

    let erc20 = await hre.ethers.getContractFactory('ERC20');
    erc20 = await erc20.attach(reserve);
    let decimals = await erc20.decimals();
    let symbol = await erc20.symbol();
    
    userData.underlyingBalance = await erc20.balanceOf(account);
    userData.underlyingBalance = new BigNumber(userData.underlyingBalance +'').shiftedBy(-decimals).toString(10);

    let aaveDataProvider = await hre.ethers.getContractFactory('AaveProtocolDataProvider');
    aaveDataProvider = await aaveDataProvider.attach(getContractAddr('AaveProtocolDataProvider'));

    let data = await aaveDataProvider.getUserReserveData(account);
    
    // uint256 currentATokenBalance,
    //   uint256 currentStableDebt,
    //   uint256 currentVariableDebt,
    //   uint256 principalStableDebt,
    //   uint256 scaledVariableDebt,
    //   uint256 stableBorrowRate,
    //   uint256 liquidityRate,
    //   uint40 stableRateLastUpdated,
    //   bool usageAsCollateralEnabled

    console.log(`Underlying balance:${account}[${token}] = ${balance} ${symbol}`);
    console.log(`AToken balance:${account}[${token}] = ${balance} ${symbol}`);

  });