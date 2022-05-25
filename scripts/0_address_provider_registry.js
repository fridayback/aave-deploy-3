const { task } = require('hardhat/config');
// const { deployLendingPoolAddressesProviderRegistry } = require('./helpers/contracts-deployments');

task('deploy-address-provider-registry', 'Deploy address provider registry')
  .setAction(async (args) => {

    console.log('task args:', args);
    // await DRE.run('set-DRE');

    // const contract = await deployLendingPoolAddressesProviderRegistry(verify);
    // const contract = await hre.ethers.getContractFactory("LendingPoolAddressesProviderRegistry");
    // console.log('Registry Address:', contract.address);
  });

module.exports = {};
