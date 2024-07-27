import { RiGuideFill } from "react-icons/ri";
import { FcAdvertising } from "react-icons/fc";
import { GiDeadWood } from "react-icons/gi";
import { FaRegLightbulb } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { MdOutlineAttachMoney,MdSell  } from "react-icons/md";

const FlowComponent = () => {
  return (
    <div className=" w-[80vw] mx-auto my-12" style={{ direction: "ltr" }}>
      <div className="flex justify-center flex-wrap items-center ml-[10.75rem]">
      <div className="my-4 z-[7]">
      <div className="w-fit text-5xl text-primary-content rounded-full bg-primary p-2 mx-auto"><RiGuideFill/></div>
        <div className="w-1 h-24 mx-auto bg-primary"></div>
        <div className="flex justify-center items-center ">
          <div className="w-56 h-10 bg-primary flex justify-center text-primary-content items-center">
            <p className="w-fit">What's NFT</p>
          </div>
          <div className="w-[32px] h-[32px] rotate-45 border-r-4 border-t-4  border-base-300 bg-primary -translate-x-1/2"></div>
        </div>
        </div>
        <div className="my-4 z-[6] -translate-x-7 " >
        <div className="w-fit text-5xl  rounded-full text-black bg-secondary p-2 mx-auto"><FaRegLightbulb/></div>
        <div className="w-1 h-24 mx-auto bg-secondary"></div>
        <div className="flex justify-center items-center ">
          <div className="w-56 h-10 bg-secondary flex justify-center items-center">
            <p className="w-fit text-black">Create NFT</p>
          </div>
          <div className="w-[32px] h-[32px] rotate-45 border-r-4 border-t-4  border-base-300 bg-secondary -translate-x-1/2"></div>
        </div>
        </div>
        <div className="my-4 z-[5] -translate-x-14">
        <div className="w-fit text-5xl text-accent-content rounded-full bg-accent p-2 mx-auto"><GiDeadWood/></div>
        <div className="w-1 h-24 mx-auto bg-accent"></div>
        <div className="flex justify-center items-center  ">
          <div className="w-56 h-10 bg-accent flex justify-center items-center">
            <p className="w-fit text-accent-content">Artina'n NFT Mint</p>
          </div>
          <div className="w-[32px] h-[32px] rotate-45 border-r-4 border-t-4  border-base-300 bg-accent -translate-x-1/2"></div>
        </div>
        </div>
        <div className="my-4 z-[4] -translate-x-[5.25rem]">
        <div className="w-fit text-5xl text-primary-content rounded-full bg-[#1967D2] p-2 mx-auto"><GrMoney/></div>
        <div className="w-1 h-24 mx-auto bg-[#1967D2]"></div>
        <div className="flex justify-center items-center  ">
          <div className="w-56 h-10 bg-[#1967D2] flex justify-center items-center">
            <p className="w-fit text-black">Generate Income</p>
          </div>
          <div className="w-[32px] h-[32px] rotate-45 border-r-4 border-t-4  border-base-300 bg-[#1967D2] -translate-x-1/2"></div>
        </div>
        </div>
        <div className="my-4 z-[3] -translate-x-[7.25rem]">
        <div className="w-fit text-5xl text-primary-content rounded-full bg-[#FEB372] p-2 mx-auto"><FcAdvertising/></div>
        <div className="w-1 h-24 mx-auto bg-[#FEB372]"></div>
        <div className="flex justify-center items-center ">
          <div className="w-56 h-10 bg-[#FEB372] flex justify-center items-center">
            <p className="text-black w-fit">Advertise Your NFT</p>
          </div>
          <div className="w-[32px] h-[32px] rotate-45 border-r-4 border-t-4  border-base-300 bg-[#FEB372] -translate-x-1/2"></div>
        </div>
        </div>
        <div className="my-4 z-[2] -translate-x-[9rem]">
        <div className="w-fit text-5xl text-primary-content rounded-full bg-[#619BB2] p-2 mx-auto"><MdSell/></div>
        <div className="w-1 h-24 mx-auto bg-[#619BB2]"></div>
        <div className="flex justify-center items-center  ">
          <div className="w-56 h-10 bg-[#619BB2] flex justify-center items-center">
            <p className="w-fit text-black">Sell NFT</p>
          </div>
          <div className="w-[32px] h-[32px] rotate-45 border-r-4 border-t-4  border-base-300 bg-[#619BB2] -translate-x-1/2"></div>
        </div>
        </div>
        <div className="my-4 -translate-x-[10.75rem]">
        <div className="w-fit text-5xl  rounded-full bg-[#6D0474] p-2 mx-auto"><MdOutlineAttachMoney/></div>
        <div className="w-1 h-24 mx-auto bg-[#6D0474] "></div>
          <div className="flex justify-center items-center z-[1]  ">
            <div className="w-56 h-10 bg-[#6D0474] flex justify-center items-center">
              <p className="w-fit">Take Money</p>
            </div>
            <div className="w-[32px] h-[32px] rotate-45 border-r-4 border-t-4  border-base-300 bg-[#6D0474] -translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowComponent;
