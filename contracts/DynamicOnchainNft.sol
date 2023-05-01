// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// import "hardhat/console.sol";

error ERC721Metadata__URI_QueryFor_NonExistentToken();

contract DynamicOnchainNft is ERC721 {
    // Events
    event CreatedNFT(uint256 indexed tokenId, int256 breakpointPrice);

    // NFT variables
    uint256 private s_tokenCounter; // Defaults to 0
    string private s_sadTokenUri;
    string private s_happyTokenUri;
    mapping(uint256 => int256) private s_tokenIdToBreakpointPrice;

    // Interface
    AggregatorV3Interface internal immutable i_priceFeed;

    constructor(address priceFeedAddress, string memory happyTokenUri, string memory sadTokenUri) ERC721("Dynamic On-chain NFT", "DON") {
        s_happyTokenUri = happyTokenUri;
        s_sadTokenUri = sadTokenUri;
        i_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function mintNft(int256 breakpointPrice) public {
        s_tokenIdToBreakpointPrice[s_tokenCounter] = breakpointPrice;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++ ;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory theUri) {
        if(!_exists(tokenId)) {
            revert ERC721Metadata__URI_QueryFor_NonExistentToken();
        }

        (,int256 price, , ,) = i_priceFeed.latestRoundData(); 
        uint256 decimals = uint256(i_priceFeed.decimals());
        int256 priceWithoutDecimals = price / int256(10**decimals);
        theUri = s_happyTokenUri;
        if(priceWithoutDecimals < s_tokenIdToBreakpointPrice[tokenId]){
            theUri = s_sadTokenUri;
        }   
    }

    function getPriceFeed() public view returns(AggregatorV3Interface){
        return i_priceFeed;
    }

    function getLatestPriceOfAsset() public view returns(uint256){
        (, int256 price,,,) = i_priceFeed.latestRoundData();
        uint256 decimals = uint256(i_priceFeed.decimals());
        return uint256(price) / (10**decimals);
    }

    function getHappyTokenUri() public view returns (string memory) {
        return s_happyTokenUri;
    }

    function getSadTokenUri() public view returns (string memory) {
        return s_sadTokenUri;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
    
    function getBreakPointPrice(uint256 tokenId) public view returns(int256){
        return s_tokenIdToBreakpointPrice[tokenId];
    }
}


