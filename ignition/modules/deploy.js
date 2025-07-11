const { ethers, upgrades } = require('hardhat');
async function main(){
   const erc1155Fact = await ethers.getContractFactory("MyToken");
   console.log('Deploying erc1155...');
   const owner = "0x355C4817a080E89e4d35b584d331B0343d365F7F";
   const name = "mukul"
   const symbol = "MUKUL";
   const erc1155 = await upgrades.deployProxy(erc1155Fact,[owner,owner,name,symbol],{
    initializer:"initialize",
    gasLimit: 300000000
   });

   console.log('erc1155 deployed to:', erc1155.target);
}

main();

//0x355C4817a080E89e4d35b584d331B0343d365F7F




