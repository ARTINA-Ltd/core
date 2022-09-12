const { expect } = require("chai");

describe("NFTMaarketplace" , function(){
    let deployer,addr1 , addr2 , nft , marketplace 
    let feePercent = 1
    beforeEach(async function(){

        //get contract function
        const NFT = await ethers.getContractFactory("NFT");
        const Marketplace = await ethers.getContractFactory("Marketplace");

        //get signer
        [deployer, addr1 , addr2] = await ethers.getSigners();
        //deploy contract
        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent); 
    });
    describe("Deployment" , function(){
        it("should track name and symbol of the nft collection", async function(){
            expect(await nft.name()).to.equal("artina Nft")
            expect(await nft.symbol()).to.equal("art")

        })
    })

})