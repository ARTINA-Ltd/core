const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)


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
    
    describe("Making marketplace items", function () {
        let price = 1
        let result 
        beforeEach(async function () {
          // addr1 mints an nft
          await nft.connect(addr1).mint(URI)
          // addr1 approves marketplace to spend nft
          await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
        })

            it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
                // addr1 offers their nft at a price of 1 ether
                await expect(marketplace.connect(addr1).makeItem(nft.address, 1 , toWei(1)))
                  .to.emit(marketplace, "Offered")
                  .withArgs(
                    1,
                    nft.address,
                    1,
                    toWei(1),
                    addr1.address
                  )
                // Owner of NFT should now be the marketplace
                expect(await nft.ownerOf(1)).to.equal(marketplace.address);
                // Item count should now equal 1
                expect(await marketplace.itemCount()).to.equal(1)
                // Get item from items mapping then check fields to ensure they are correct
                const item = await marketplace.items(1)
                expect(item.itemId).to.equal(1)
                expect(item.nft).to.equal(nft.address)
                expect(item.tokenId).to.equal(1)
                expect(item.price).to.equal(toWei(price))
                expect(item.sold).to.equal(false)
            });
          
            it("Should fail if price is set to zero", async function () {
                await expect(
                  marketplace.connect(addr1).makeItem(nft.address, 1, 0)
                ).to.be.revertedWith("Price must be greater than zero");
            });
          
    });       
    

})