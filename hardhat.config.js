require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy-ethers")
const path = require('path');

// const { channel } = require("diagnostics_channel");
// const { type } = require("os");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.4",
// };

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: "0x09236048786b0f284ee677c3a57b0f5c6959a065c2a55047942e8346de2beb90",
          balance: "10000000000000000000000"
        },
        {
          privateKey: "0xd823b48f9b8c781cf3807df40007a3309101af9d4d67a454ce893c3a588dc190",
          balance: "10000000000000000000000"
        },
        {
          privateKey: "0x33a380fd717c65ea0c7e84a5d8c252cf66c28cf74d93a3bf5e150f41129f7dc0",
          balance: "10000000000000000000000"
        }
      ]
    },
    wanchainTest: {
      url: "https://gwan-ssl.wandevs.org:46891",
      chainId: 999,//43113
      gas: 'auto',
      gasPrice: 'auto',
      gasMultiplier: 1.1,
      accounts: [
        "0x09236048786b0f284ee677c3a57b0f5c6959a065c2a55047942e8346de2beb90",
        "0x77e2b50cf7035b4884dc72195c5bb7a2c9633613b0e41baf4737f717fccd01d3",
        "0x33a380fd717c65ea0c7e84a5d8c252cf66c28cf74d93a3bf5e150f41129f7dc0"
      ]
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      gas: 4000000,
      gasPrice: 35770995227,
      gasMultiplier: 2,
      accounts: [
        "0x09236048786b0f284ee677c3a57b0f5c6959a065c2a55047942e8346de2beb90",
        "0x77e2b50cf7035b4884dc72195c5bb7a2c9633613b0e41baf4737f717fccd01d3",
        "0x33a380fd717c65ea0c7e84a5d8c252cf66c28cf74d93a3bf5e150f41129f7dc0"
      ]
    }
  },
  solidity: {
    compilers: [
      // {
      //   version: "0.6.12",
      //   settings: {
      //     optimizer: {
      //       enabled: true,
      //       runs: 200
      //     },
      //     evmVersion: "istanbul"//"byzantium"
      //   }
      // },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          // evmVersion: "istanbul"//"byzantium"
        }
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          evmVersion: "istanbul"//"byzantium"
        }
      }
    ],
    // overrides: {
    //   " @openzeppelin/contracts/token/ERC20/IERC20.sol": {
    //     version: "0.8.0",
    //     settings: {
    //       optimizer: {
    //         enabled: true,
    //         runs: 200
    //       },
    //       // evmVersion:"byzantium"//"istanbul"
    //     }
    //   }
    // }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports'
  },
  mocha: {
    timeout: 20000
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      "wanchainTest": 0, //it can also specify a specific netwotk name (specified in hardhat.config.js)
    }
  }
}

const tasksPath = path.join(__dirname, 'tasks');
const fs = require('fs')
console.log('=====>', tasksPath);
fs.readdirSync(tasksPath)
  .filter((pth) => pth.includes('.js'))
  .forEach((task) => {
    require(`${tasksPath}/${task}`);
    // console.log(`load task ${tasksPath}/${task}`)
  });