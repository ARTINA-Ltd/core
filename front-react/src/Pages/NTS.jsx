import rocket from "../assets/images/NTS_rocket.png";
import NightSky from "../components/NightSky/NightSky.jsx";
import nft1 from "../assets/images/NFT1.png";
import nft2 from "../assets/images/NFT2.png";
import nft3 from "../assets/images/NFT3.jpg";
import nft4 from "../assets/images/NFT4.png";
import NTSNavbar from "../components/NTSNavbar/NTSNavbar.jsx";
import axios from "axios";
import "../components/Nts/Styles.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../App.js";
import Dialog from "../components/Nts/Dialog.jsx";
import FancyText from "@carefully-coded/react-text-gradient";
import { useNavigate } from "react-router";
import LeaderBoard from "../components/Nts/LeaderBoard.jsx";

const NTS = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <NTSNavbar />

      <div className=" p-8 bg-base-100 w-[99vw] overflow-hidden">
        <NightSky />
        <div className="flex items-center p-8 flex-row-reverse justify-around md:block overflow-hidden">
          <img src={rocket} alt="" className="w-1/3 md:mx-auto md:h-32 md:w-auto my-4 z-10" />
          <div className="text-accent-content pointer-events-none h-fit text-center p-10 rounded-full z-10 neon-border flex justify-center items-center">
            <FancyText className={"mx-auto text-5xl"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
              Claim Your NFT
            </FancyText>
          </div>
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
          <div className="w-1/2 mx-auto md:mx-0 md:mt-0 mt-32 sm:-translate-x-14">
            <div className="relative ease-in-out duration-300">
              <img src={nft2} alt="" className="left-36 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 absolute w-52 h-52 object-cover" />
              <img src={nft3} alt="" className="top-28 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 rotate-12 left-72 absolute w-52 h-52 object-cover" />
              <img src={nft1} alt="" className="top-24 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 -rotate-12 absolute w-52 h-52 object-cover" />
              <img src={nft4} alt="" className="top-48 hover:-translate-y-8 hover:z-50 rounded-md ease-in-out duration-300 left-36 absolute w-52 h-52 object-cover" />
            </div>
          </div>
        </div>
        <div className="mt-32 z-10 lg:text-4xl md:text-2xl text-7xl">
          <div className="mx-auto w-fit">
            <FancyText gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000} className="text-center bg-slate-100 w-fit mx-auto border-none neon-container">
              Play!
            </FancyText>
          </div>
          <div className=" border-b-2 border-b-base-content border-opacity-25 pb-12  text-center flex gap-8 justify-around my-16">
            <button onClick={() => navigate("./play-with-friend")} className="flex cursor-pointer items-center justify-center neon-container neon-border rounded-[100%] w-[20rem] p-8 ">
              <FancyText className={"mx-auto"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000}>
                Solo
              </FancyText>
            </button>
            <button className="flex  cursor-pointer items-center justify-center neon-container neon-border  rounded-[100%] w-[20rem] p-8 ">
              <FancyText className={"mx-auto"} gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000} onClick={() => document.getElementById("frirens-list").showModal()}>
                With Friends
              </FancyText>
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-fit">
        <FancyText gradient={{ from: "#F305B8", to: "#00F0F7", type: "linear" }} animateTo={{ from: "#FFFFFF", to: "#F305B8" }} animateDuration={1000} className="text-center text-5xl mb-8 bg-slate-100 w-fit mx-auto border-none neon-container">
          Leader Board
        </FancyText>
      </div>

      {user && <Dialog username={user.data.username} />}
    </>
  );
};
export default NTS;
