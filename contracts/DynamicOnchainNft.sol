// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DynamicOnchainNft is ERC721 {

    // NFT variables
    uint256 private s_tokenCounter; // Defaults to 0

    constructor() ERC721("Dynamic On-chain NFT", "DON") {}

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++ ;
    }
}


