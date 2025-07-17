// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    uint public tq1;


    constructor() ERC721("SimpleNFT", "SNFT") Ownable(msg.sender) {}

    /// @notice Owner mints NFT to another address with a metadata URI (e.g. IPFS)
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newTokenId = _tokenIds;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    /// @notice Token owner transfers a single NFT to another address
    function transferNFT(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this token");
        _transfer(msg.sender, to, tokenId);
    }

    /// @notice Token owner bulk transfers NFTs to multiple addresses
    function bulkTransferNFT(address[] calldata recipients, uint256[] calldata tokenIds) external {
        require(recipients.length == tokenIds.length, "Mismatched arrays");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(ownerOf(tokenIds[i]) == msg.sender, "Not the owner of tokenId");
            _transfer(msg.sender, recipients[i], tokenIds[i]);
        }
    }

    /// @notice Owner bulk mints NFTs to multiple addresses with individual tokenURIs
    function bulkMintNFT(address[] calldata recipients, string[] calldata tokenURIs) external onlyOwner {
        require(recipients.length == tokenURIs.length, "Mismatched arrays");

        for (uint256 i = 0; i < recipients.length; i++) {
            _tokenIds++;
            uint256 newTokenId = _tokenIds;
            _mint(recipients[i], newTokenId);
            _setTokenURI(newTokenId, tokenURIs[i]);
        }
    }
}