const { ethers } = require("hardhat");

async function main() {
    const _c_a = "0xBDA4b5D177C149eB134ac74C0F1382a9BF3037f2";
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
    // createVestingSchedule = async (account,start,duration,durationUnits,amount) => {
    //     await contract.createVestingSchedule(account,start,duration,durationUnits,{value : amount});
    // }

    // getReleaseAmount = async (account) => {
    //     return await contract.getReleasableAmount(account);
    // }    

    // await createVestingSchedule("0x4A4E870F13f3F3568B2A1f392BC2735a25947E8F",1730977243,1,0,"1000000");
//   /  const res1 = await create("0x4A4E870F13f3F3568B2A1f392BC2735a25947E8F", 100, "https://hello/world/1.json", "0xaaaa");
    const res = await totalsupply(1);
}

main().then(()=>process.exit(0)).catch((e)=>{console.log(e);process.exit(1);});