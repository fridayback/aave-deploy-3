const { saveDeploy, getContractAddr } = require('../utils');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  //  TODO
  const contract = await deploy('ReservesSetupHelper', {
    from: deployer,
    log: true,
  });
  saveDeploy(chainId, 'ReservesSetupHelper', contract.address, contract.receipt);

  let ACLManagerAddress = getContractAddr(chainId,'ACLManager');
  let ACLManager = await hre.ethers.getContractFactory('ACLManager');
  ACLManager = await ACLManager.attach(ACLManagerAddress);

  await (await ACLManager.addRiskAdmin(contract.address)).wait(1);
  console.log('===== ACLManager addRiskAdmin', contract.address);
};
module.exports.tags = ['ReservesSetupHelper'];
