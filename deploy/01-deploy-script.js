const {network, ethers} = require("hardhat");
const {developmentChains, networkConfig} = require("../helper-hardhat.config")
const {verify} = require("../utils/verify")
const svgs = require("../constants/base64TokenURI.json")

// hre = hardhat runtime environment gives all this arguments to deploy scripts

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log, get} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId

    let btcUsdPriceFeedAddress

    const happyWojakBase64URI = svgs.happyWojak
    const sadWojakBase64URI = svgs.sadWojak

    if(developmentChains.includes(network.name)){
       const BtcUsdPriceFeed = await deployments.get("MockV3Aggregator")
       btcUsdPriceFeedAddress = BtcUsdPriceFeed.address
    }
    else{
        btcUsdPriceFeedAddress = networkConfig[chainId].btcUsdPriceFeed
    }

    log("--------------------------------------------------------------")

    const args = [btcUsdPriceFeedAddress, happyWojakBase64URI, sadWojakBase64URI]

    const dynamicOnchainNft = await deploy("DynamicOnchainNft", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
        gasLimit: 180000000
    });

    // Verify the smart contract

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying.....")
        await verify(dynamicOnchainNft.address, args)
    }

}
