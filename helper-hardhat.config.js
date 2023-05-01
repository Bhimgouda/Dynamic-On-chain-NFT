const networkConfig = {
    default: {
        name: "hardhat"
    },
    31337: {
        name: "localhost",
    },
    11155111: {
        name: "sepolia",
        btcUsdPriceFeed: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
    },
}

const DECIMALS = "18"
const INITIAL_PRICE = "200000000000000000000"
const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_PRICE
}