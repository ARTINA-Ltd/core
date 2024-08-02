import rocket from "../assets/images/NTS_rocket.png";
import NightSky from "../components/NightSky/NightSky.jsx";
import nft1 from "../assets/images/NFT1.png";
import nft2 from "../assets/images/NFT2.png";
import nft3 from "../assets/images/NFT3.jpg";
import nft4 from "../assets/images/NFT4.png";
import NTSNavbar from "../components/NTSNavbar/NTSNavbar.jsx";
import PaperRockScissors from "../components/Nts/PaperRockScissors.jsx";

const NTS = () => {
  return (
    <>
      <NTSNavbar />
      <div className="z-10 p-8 bg-base-100 w-[99vw] overflow-hidden">
        <NightSky />
        <div className="flex items-center bgba justify-around overflow-hidden">
          <div className="text-accent-content h-fit p-10 rounded-full z-10 bg-primary flex justify-center items-center">
            <h1 className="text-7xl lg:text-5xl text-center leading-loose">claim your NFT</h1>
          </div>
          <img src={rocket} alt="" className="w-1/3 z-10" />
        </div>
        <div className="w-full justify-between mt-32 flex lg:block lg:pb-[30rem]">
          <div className="w-full text-center h-full p-8">
            <h1 className="text-6xl mb-8">What is NFt?</h1>
            <p className="w-2/3 md:w-[90%] text-justify block mx-auto bg-base-100 p-4 rounded-md z-50">
              NFT stands for Non-Fungible Token. It is a type of digital asset that represents ownership or proof of authenticity of a unique item or piece of content on the blockchain, most commonly on the Ethereum blockchain. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible (meaning each unit is interchangeable with another of the same value), NFTs are unique and not interchangeable. Here are some key points about NFTs: <br />
              1. Uniqueness: Each NFT has a distinct value and cannot be exchanged on a one-to-one basis with another NFT. This uniqueness is often associated with digital art, collectibles, music, and other digital content. <br />
              2. Ownership: NFTs provide a way to prove ownership of a digital asset. The blockchain keeps a record of the creator, the current owner, and the transaction history, making it easy to verify authenticity. <br />
              3. Smart Contracts: NFTs often use smart contracts, which are self-executing contracts with the terms of the agreement <br />
              directly written into code. This can include royalties for creators on secondary sales. 4. Indivisibility: Unlike cryptocurrencies, which can be divided into smaller units (like satoshis in Bitcoin), NFTs cannot be divided and exist as whole tokens. <br />
              5. Interoperability: NFTs can be used across different platforms and markets, thanks to standardized protocols on the blockchain. <br />
              6. Digital Scarcity: Creators can limit the number of copies of a digital item, creating scarcity and potentially increasing its value. Popular examples of NFTs include digital art, music, videos, virtual real estate, and in-game items. The market for NFTs has grown rapidly, with some NFTs selling for millions of dollars.
            </p>
          </div>
          <div className="w-1/2 mx-auto md:mx-0 md:mt-0 mt-32">
            <div className="relative ease-in-out duration-300">
              <img src={nft2} alt="" className="left-36 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 absolute w-52 h-52 object-cover" />
              <img src={nft3} alt="" className="top-28 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 rotate-12 left-72 absolute w-52 h-52 object-cover" />
              <img src={nft1} alt="" className="top-24 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 -rotate-12 absolute w-52 h-52 object-cover" />
              <img src={nft4} alt="" className="top-48 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 left-36 absolute w-52 h-52 object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-32 z-10">
          <h1 className="text-center text-7xl">Play!</h1>
          <div className="text-5xl border-b-2 border-b-base-content border-opacity-25 pb-12 text-accent-content text-center flex gap-2 justify-around my-16">
            <div className="flex items-center justify-center bg-accent rounded-[100%] w-[20rem] p-8 ">
              <h1 className="">Solo</h1>
            </div>
            <h1 className="bg-accent rounded-[100%] w-[20rem] p-8">With Friends</h1>
          </div>
        </div>
        <PaperRockScissors />
      </div>
    </>
  );
};
export default NTS;
