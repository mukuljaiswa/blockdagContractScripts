// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IToken {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

contract BridgeContract {
    address public admin;
    IToken public tokenA;
    IToken public tokenB;
    

    constructor(address _tokenA, address _tokenB) {
        admin = msg.sender;
        tokenA = IToken(_tokenA);
        tokenB = IToken(_tokenB);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function bridgeAToB(uint256 amount) external {
        require(tokenA.transferFrom(msg.sender, address(this), amount), "TokenA transfer failed");
        tokenA.burn(address(this), amount);
        tokenB.mint(msg.sender, amount);
    }

    function bridgeBToA(uint256 amount) external {
        require(tokenB.transferFrom(msg.sender, address(this), amount), "TokenB transfer failed");
        tokenB.burn(address(this), amount);
        tokenA.mint(msg.sender, amount);
    }
}