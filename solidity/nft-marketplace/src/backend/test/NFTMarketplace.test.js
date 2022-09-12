const { expect } = require("chai");

describe("NFTMaarketplace" , function(){
    let deployer,addr1 , addr2 , nft , marketplace 
    let feePercent = 1;
    let URI = "sample URI";
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
        });
        it("Should track feeAccount and feePercent of the marketplace", async function () {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feePercent);
        }); 
    })

    describe("Minting NFTs", function () {

        it("Should track each minted NFT", async function () {
            // addr1 mints an nft
            await nft.connect(addr1).mint(URI)
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);
            // addr2 mints an nft
            await nft.connect(addr2).mint(URI)
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr2.address)).to.equal(1);
            expect(await nft.tokenURI(2)).to.equal(URI);
        });
    })

    

})