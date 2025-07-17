const { ethers } = require("hardhat");

async function main() {
    const _c_a = "0x85FbB94C6CA6f495753ba8724177991bBC4F8b9A";
    const mytoken = await ethers.getContractFactory("MyToken");
    const contract = await mytoken.attach(_c_a);
    // await contract.create("0x4A4E870F13f3F3568B2A1f392BC2735a25947E8F",100,"abcdnkjfakjsdkjfda",0xaaa);
    totalsupply = async (tokenId) => {
        const val = await contract['totalSupply(uint256)'](tokenId);
        console.log(val);
    };
    create = async (account, amount, tokenURI, data) => {
        await contract.create(account, amount, tokenURI, data);
    };
   
       const res1 = await create("0x4B5f059Ff32E121B9BF6EDd51A788983afA29915", 55, "https://hello/world/1.json", "0xaaaa");
    const res = await totalsupply(3);
}

main().then(()=>process.exit(0)).catch((e)=>{console.log(e);process.exit(1);});


