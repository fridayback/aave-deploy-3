task('all', 'test all')
  .setAction(async (args) => {
    // await run('deploy_mock_Token');
    // await run('deploy_mock_Token', { name: 'Wrapped for ETH', symbol: 'WETH', decimals: 18, total: 10000000 });
    await run('deploy_mock_Token', { name: 'fakeUSDT', symbol: 'USDT', decimals: 6, total: 100000000 });

    // // await run('deploy', { tags: 'MockOracle' });
    // await run('protocol-deploy');
    // await run('add-new-asset', { atoken: 'WETH,WAVAX,USDT' });

    //
  });