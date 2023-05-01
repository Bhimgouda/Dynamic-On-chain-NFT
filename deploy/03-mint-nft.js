const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Dynamic SVG  NFT
    const highValue = "28000"
    const dynamicSvgNft = await ethers.getContract("DynamicOnchainNft", deployer)
    const dynamicSvgNftMintTx = await dynamicSvgNft.mintNft(highValue)
    await dynamicSvgNftMintTx.wait(1)
    console.log(`Dynamic SVG NFT index 0 tokenURI: ${await dynamicSvgNft.getLatestPriceOfAsset()}`)
}
module.exports.tags = ["all", "mint"]