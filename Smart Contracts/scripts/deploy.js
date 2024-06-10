async function main() {
    const voting =  await ethers.getContractFactory("voting");

    const voting_ = await voting.deploy(["Chaitanya", "John"], 100);
    console.log("Contract deployed to:", voting_.address);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
})