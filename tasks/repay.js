const { saveDeploy, getConfig, getContractAddr, getOracleParamPairs } = require('../utils');

const BigNumber = require('bignumber.js');
const { tokenToString } = require('typescript');

task('repay', 'repay token into pool')
  .addParam("token", "token name,eg. USDT,WETH,WAVAX")
  .addParam("amount", "how many tokens to be deposited")
  .addParam("mode", "interest Rate Mode")
  .addOptionalParam("account", "The operator account", 0,types.int)
  .setAction(async ({ token, amount,mode,account }) => {

    const accounts = await hre.ethers.getSigners();

    const chainId = await hre.getChainId();
    const config = getConfig(chainId).ReservesConfig[token];
    if(!config) {
        console.log(`${token} is not supported`);
        return;
    }//underlying

    let reserve = config.underlying;
    // console.log(`repay reserve: [${reserve}] for ${amount} for account: ${accounts[0]}`);
    // console.log('=====>',account);
    let ERC20 = await hre.ethers.getContractFactory('ERC20',accounts[account]);
    erc20 = await ERC20.attach(reserve);
    let decimals = await erc20.decimals();
    let amountOx = '0x'+new BigNumber(amount).shiftedBy(decimals).toString(16);

    // console.log(`decimals: ${decimals}\n`,getContractAddr(chainId,'LendingPool'),amountOx);

    await(await erc20.approve(getContractAddr(chainId,'Pool'),amountOx)).wait(1);
    let symbol = await erc20.symbol();
    console.log(`approve ${token} to ${reserve} for ${amount} ${symbol}`);

    let Pool = await hre.ethers.getContractFactory('Pool'
    ,{
      signer: accounts[account],
      libraries: {
        'PoolLogic': getContractAddr(chainId,'PoolLogic'),
        // 'ReserveLogic': getContractAddr(chainId,'ReserveLogic'),
        'EModeLogic': getContractAddr(chainId,'EModeLogic'),
        'SupplyLogic': getContractAddr(chainId,'SupplyLogic'),
        'FlashLoanLogic': getContractAddr(chainId,'FlashLoanLogic'),
        'BorrowLogic': getContractAddr(chainId,'BorrowLogic'),
        'LiquidationLogic': getContractAddr(chainId,'LiquidationLogic'),
        'BridgeLogic': getContractAddr(chainId,'BridgeLogic'),
        // 'IsolationModeLogic': getContractAddr(chainId,'IsolationModeLogic'),
        // 'GenericLogic': GenericLogic.address,
        // 'DataTypes': DataTypes.address,
      }});
    pool= await Pool.attach(getContractAddr(chainId,'Pool'));
    
    const reserveData = await pool.getReserveData(reserve);

    const stableDebtToken = await ERC20.attach(reserveData.stableDebtTokenAddress);
    const variableDebtToken = await ERC20.attach(reserveData.variableDebtTokenAddress);
    
    let poolBalance = await erc20.balanceOf(reserveData.aTokenAddress);
    poolBalance = poolBalance/(10**decimals);;
    let userBalance = await erc20.balanceOf(accounts[account].address);
    userBalance = userBalance/(10**decimals);
    let userStableDebt = await stableDebtToken.balanceOf(accounts[account].address);
    userStableDebt = userStableDebt/(10**decimals);
    let userVariableDebt = await variableDebtToken.balanceOf(accounts[account].address);
    userVariableDebt = userVariableDebt/(10**decimals);
    let poolStableDebt = await stableDebtToken.totalSupply();
    poolStableDebt = poolStableDebt/(10**decimals);
    let poolVariableDebt = await variableDebtToken.totalSupply();
    poolVariableDebt = poolVariableDebt/(10**decimals);

    console.log(`${accounts[account].address} repay ${amount} ${symbol} to pool under mode ${mode}: `);
    console.log(`\n\n\tpoolOldBalance: ${poolBalance}\n\tuserOldBalance: ${userBalance} ${symbol}\n\tuserOldStableDebt: ${userStableDebt}\n\tpoolOldStableDebt: ${poolStableDebt}\n\tuserOldVariableDebt: ${userVariableDebt}\n\tpoolOldVariableDebt: ${poolVariableDebt}`);


    try {
        const receipt = await (await pool.repay(reserve,amountOx,mode,accounts[account].address)).wait(1);
        console.log(`repay reserve: ${amount} ${symbol} for account: ${accounts[account].address}`);
        console.log(`receipt: \n\ttxHash: ${receipt.transactionHash}\n\tstatus: ${receipt.status}\n\tfrom: ${receipt.from}\n\tto: ${receipt.to}\n\tgasUsed: ${receipt.gasUsed}`);
    } catch (error) {
        console.log(`repay ${amount} ${symbol} for account: ${accounts[account].address} failed`);
        console.log(`receipt: \n\ttxHash: ${error.receipt.transactionHash}\n\tstatus: ${error.receipt.status}\n\tfrom: ${error.receipt.from}\n\tto: ${error.receipt.to}\n\tgasUsed: ${error.receipt.gasUsed}`);

    }

    poolBalance = await erc20.balanceOf(reserveData.aTokenAddress);
    poolBalance = poolBalance/(10**decimals);
    userBalance = await erc20.balanceOf(accounts[account].address);
    userBalance = userBalance/(10**decimals);
    userStableDebt = await stableDebtToken.balanceOf(accounts[account].address);
    userStableDebt = userStableDebt/(10**decimals);
    userVariableDebt = await variableDebtToken.balanceOf(accounts[account].address);
    userVariableDebt = userVariableDebt/(10**decimals);
    poolStableDebt = await stableDebtToken.totalSupply();
    poolStableDebt = poolStableDebt/(10**decimals);
    poolVariableDebt = await variableDebtToken.totalSupply();
    poolVariableDebt = poolVariableDebt/(10**decimals);
    console.log(`\n\n\tpoolNewBalance: ${poolBalance}\n\tuserNewBalance: ${userBalance} ${symbol}\n\tuserNewStableDebt: ${userStableDebt}\n\tpoolNewStableDebt: ${poolStableDebt}\n\tuserNewVariableDebt: ${userVariableDebt}\n\tpoolNewVariableDebt: ${poolVariableDebt}`);
    
    

  });