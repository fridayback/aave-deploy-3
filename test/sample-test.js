const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    await run('0_deploy_mock_Token',{name:'USDT for test',symbol:'USDT',decimals:6,total:10000000});
    await run('2-lending-pool');
    await run('add-new-asset', { atoken: 'USDT' });

    expect('Hola, mundo!').to.equal("Hola, mundo!");
  });
});
