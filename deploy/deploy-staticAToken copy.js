// // const { saveDeploy, getConfig, getContractAddr, getOracleParamPairs } = require('./utils');

// const BigNumber = require('bignumber.js');

// task('deploy_staticAToken', 'Deploy StaticATokenLM')
//   .addParam("name", "token name ", "Wrapped AVAX for test")
//   .addParam("symbol", "token symbol", "WAVAX")
//   .addParam("decimals", "token decimals", 18, types.int)
//   .addParam('total', 'token total supply', 10000000, types.int)
//   .setAction(async ({ name, symbol, decimals, total }) => {
//     const contractName = 'StaticATokenLM';
//     const chainId = await hre.getChainId();
//     console.log('-----------------', name, symbol, decimals, total);

//     let StaticATokenLM = await hre.ethers.getContractFactory('StaticATokenLM');
//     let StaticATokenLMInstacnce = await StaticATokenLM.deploy();
//     let tx = await StaticATokenLMInstacnce.deployed();
//     console.log(`deploy ${name} at`, token.address);
//     await (await token.mint('0x' + new BigNumber(total).shiftedBy(decimals).toString(16))).wait(1);

//   });

// const {saveDeploy,getContractAddr} = require('../utils');

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments,getChainId} = hre;
//     const {deploy} = deployments;
//     const {deployer} = await getNamedAccounts();
//     const chainId = await getChainId();


//     const contract = await deploy('StaticATokenLM', {
//       from: deployer,
//       log: true
//     });
//     saveDeploy(chainId,'StaticATokenLM',contract.address,contract.receipt);

//     //initialize
//   };
//   module.exports.tags = ['StableDebtToken'];
