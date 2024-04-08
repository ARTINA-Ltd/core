import React from "react";
import SimpleCard from "./SimpleCard";

const SelectNftCard = ({ isSelected, name, price, image, onClick }) => {
  return (
    <div>
      <span
        id={`selectNftCard${name}`}
        onClick={onClick}
        className="cursor-pointer"
      >
        <SimpleCard
          className={` group transition-all duration-100 ${
            isSelected
              ? "bg-[#4e45d0] hover:bg-[#4e45d0] text-white"
              : "bg-[#0000aa05] hover:bg-[#0000aa08] opacity-60"
          }`}
        >
          <img
            src={image}
            className={`h-[300px] w-full object-cover rounded-2xl ${
              isSelected ? "" : "opacity-50"
            }`}
            alt=""
          />
          <div className="flex flex-col mt-2 px-2 gap-4">
            <div className="text-2xl font-b7">{name}</div>
            <div>{price} اتریوم</div>
          </div>
        </SimpleCard>
      </span>
    </div>
  );
};

export default SelectNftCard;
