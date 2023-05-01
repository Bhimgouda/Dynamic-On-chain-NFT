const {network, ethers} = require("hardhat");
const {developmentChains, networkConfig} = require("../helper-hardhat.config")
const {verify} = require("../utils/verify")
const svgs = require("../constants/base64TokenURI.json")

// hre = hardhat runtime environment gives all this arguments to deploy scripts

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log, get} = deployments
    const {deployer} = await getNamedAccounts()
    const {name: networkName} = network;
    let btcUsdAggregatorAddress

    const happyWojakBase64URI = svgs.happyWojak
    const sadWojakBase64URI = svgs.sadWojak

    if(developmentChains.includes(network.name)){
       const BtcUsdAggregator = await deployments.get("MockV3Aggregator")
       btcUsdAggregatorAddress = BtcUsdAggregator.address
    }

    

}
