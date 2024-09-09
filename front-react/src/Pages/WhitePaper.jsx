import React from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";

const WhitePaper = () => {
  return (
    <TestLayout>
      <div className="w-[55%] m-auto lg:w-4/5 md:w-11/12" dir="ltr">
        <SimpleCard className={"text-center bg-base-100 leading-[40px]"}>
          <div className="text-[32px] mb-5">White Paper: Artina</div>
          <div className="text-[25px] mb-2 text-left mr-6">1. Title and Abstract</div>
          <div className="text-[18px] mb-4 text-justify px-6">Artina: The Premier Decentralized Marketplace for Digital Assets with a Metaverse Experience</div>
          <div className="text-[18px] mb-4 text-justify px-6">Abstract: : An introduction to Artina's mission to offer a comprehensive marketplace for buying, selling, and trading blockchain-based digital assets, especially NFTs, and its pioneering role as the first Persian NFT marketplace with Rial payment integration. Artina introduces a revolutionary 3D exhibition space known as the "Metaverse," allowing users to showcase their collections in an immersive environment.</div>

          <div className="text-[25px] mb-2 text-left mr-6">2. Introduction</div>
          <div className="text-[18px] mb-4 text-justify px-6">Problem Statement: The digital asset landscape lacks a dedicated Persian platform and an immersive environment for showcasing collections.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Solution Overview: Artina fills this gap by providing a localized platform for Persian users and a Metaverse space for a richer user experience.</div>

          <div className="text-[25px] mb-2 text-left mr-6">3. Background</div>
          <div className="text-[18px] mb-4 text-justify px-6">Market Analysis: The NFT and digital asset trend has seen global adoption, with a noticeable gap in dedicated platforms for the Persian audience.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Historical Context: Briefly discuss the evolution of digital marketplaces and the emergence of the Metaverse concept.</div>

          <div className="text-[25px] mb-2 text-left mr-6">4. Technical Details</div>
          <div className="text-[18px] mb-4 text-justify px-6">System Architecture: Artina, built on the Polygon blockchain, combines decentralized transactions with a 3D Metaverse for collections.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Protocol Specifications: Uses the ERC-721 and ERC-1155 standards for broad digital asset compatibility.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Security Measures: Transactions are backed by Ethereum's cryptographic methods; assets stay in smart contracts until transactions finalize.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Metaverse Exhibition: A 3D space where users can create personalized galleries to display their NFT collections.</div>

          <div className="text-[25px] mb-2 text-left mr-6">5. Use Cases</div>
          <div className="text-[18px] mb-4 text-justify px-6">Art: Persian artists can tokenize their artworks and sell them as NFTs.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Collectibles: Trade digital collectibles from a variety of sources.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Domain Names: Trade blockchain-based domain names.</div>
          <div className="text-[18px] mb-4 text-justify px-6">Metaverse Exhibitions: Artists and collectors showcase their digital assets in a 3D, immersive environment.</div>

          <div className="text-[25px] mb-2 text-left mr-6">6. Roadmap</div>
          <div className="text-[18px] mb-4 text-justify px-6">2022: Integrate multiple blockchains, launch the Metaverse exhibition feature.</div>
          <div className="text-[18px] mb-4 text-justify px-6">2023: Enhance the Metaverse experience, introduce community governance, and improve user interfaces.</div>

          <div className="text-[25px] mb-2 text-left mr-6">7. Team and Advisors</div>
          <div className="text-[18px] mb-4 text-justify px-6">Dr. Sajad Haghzad Klidbary(CEO): PhD in Digital Electronics</div>
          <div className="text-[18px] mb-4 text-justify px-6">Zahra Shah Morad Zade (CTO): Expertise in back end developing</div>
          <div className="text-[18px] mb-4 text-justify px-6">Aria Radmehr (COO): M.Sc. in Vrije Universiteit Brussel</div>

          <div className="text-[25px] mb-2 text-left mr-6">8. Legal and Compliance</div>
          <div className="text-[18px] mb-4 text-justify px-6">Artina strictly complies with all digital asset regulations, and ensures user privacy and data protection.</div>

          <div className="text-[25px] mb-2 text-left mr-6">9. Payment Integration</div>
          <div className="text-[18px] mb-4 text-justify px-6">Artina proudly introduces Toman, Crypto payment, making it the first NFT platform catering to the Persian community with local currency transactions.</div>

          <div className="text-[25px] mb-2 text-left mr-6">10. Conclusion</div>
          <div className="text-[18px] mb-4 text-justify px-6">Artina is set to revolutionize the digital asset scene in the Persian community, blending traditional transactions with a groundbreaking Metaverse experience.</div>

          <div className="text-[25px] mb-2 text-left mr-6">11. References</div>
          <div className="text-[18px] mb-4 text-justify px-6">- ERC-721 standard</div>
          <div className="text-[18px] mb-4 text-justify px-6">- ERC-1155 standard</div>
        </SimpleCard>
      </div>
    </TestLayout>
  );
};

export default WhitePaper;
