import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageCard from "../components/Cards/UserDashboardCards/ImageCard";
import TestLayout from "../Layouts/TestLayout";
import { Link, useNavigate } from "react-router-dom";
import SimpleInput from "../components/Inputs/SimpleInput";
import BorderButton from "../components/Buttons/BorderButton";
import { Button } from "primereact/button";

const AllCollections = () => {
  const [getData, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState(null);
  const [filterByBool, setFilterByBool] = useState(null);
  const [sortPrice, setSortPrice] = useState(null);
  const [sortDate, setSortDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/transaction/nfts/get_all/`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBoolFilter = (attribute) => {
    setFilterByBool(filterByBool === attribute ? null : attribute); // Toggle filter on/off
  };

  const handleSortPrice = (option) => {
    if (sortPrice === option) {
      setSortPrice(null); // Remove sorting if already selected
    } else {
      setSortPrice(option);
    }
  };

  const handleSortDate = (option) => {
    if (sortDate === option) {
      setSortDate(null); // Remove sorting if already selected
    } else {
      setSortDate(option);
    }
  };

  return (
    <TestLayout>
      {/* Search input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="جستجو بر اساس نام یا ایجاد کننده"
          className="w-1/2 h-12 rounded-lg border-2 border-indigo-400 text-center sm:w-10/12"
          onChange={handleSearch}
        />
      </div>
      {/* Filter buttons */}
      <div className="flex gap-y-2 justify-center my-5 sm:text-xs sm:flex-col">
        <button
          className={`mx-2 p-2 rounded-lg ${filterByBool === "has_physical" ? "bg-indigo-500 text-white" : "bg-indigo-100 text-gray-700"}`}
          onClick={() => handleBoolFilter("has_physical")}
        >
          نمایش فقط NFT های فیزیکی
        </button>
        <button
          className={`mx-2 p-2 rounded-lg ${filterByBool === "in_exhibition" ? "bg-indigo-500 text-white" : "bg-indigo-100 text-gray-700"}`}
          onClick={() => handleBoolFilter("in_exhibition")}
        >
          نمایش فقط NFT های در نمایشگاه
        </button>
        <button
          className={`mx-2 p-2 rounded-lg ${filterByBool === "is_for_sale" ? "bg-indigo-500 text-white" : "bg-indigo-100 text-gray-700"}`}
          onClick={() => handleBoolFilter("is_for_sale")}
        >
          نمایش فقط NFT های قابل فروش
        </button>
        {/* Add more buttons for other attributes */}
      </div>
      {/* Sort buttons */}
      <div className="flex text-center my-5 sm:text-xs">
        <div className="flex-col w-full">
          <div className="font-b6 mb-2 text-center">مرتب سازی بر اساس قیمت</div>
          <button
            className={`mx-2 my-1 p-1 border-r-2 border-indigo-500 ${sortPrice === "low_to_high" ? "bg-indigo-500 text-white" : "bg-indigo-50 text-gray-700"}`}
            onClick={() => handleSortPrice("low_to_high")}
          >
            کم به زیاد
          </button>
          <button
            className={`mx-2 my-1 p-1 border-r-2 border-indigo-500 ${sortPrice === "high_to_low" ? "bg-indigo-500 text-white" : "bg-indigo-50 text-gray-700"}`}
            onClick={() => handleSortPrice("high_to_low")}
          >
            زیاد به کم
          </button>
        </div>
        <div className="flex-col w-full">
          <div className="font-b6 mb-2 text-center">مرتب سازی بر اساس تاریخ</div>
          <button
            className={`mx-2 my-1 p-1 border-r-2 border-indigo-500 ${sortDate === "newest_to_oldest" ? "bg-indigo-500 text-white" : "bg-indigo-50 text-gray-700"}`}
            onClick={() => handleSortDate("newest_to_oldest")}
          >
            جدیدترین به قدیمی‌ترین
          </button>
          <button
            className={`mx-2 my-1 p-1 border-r-2 border-indigo-500 ${sortDate === "oldest_to_newest" ? "bg-indigo-500 text-white" : "bg-indigo-50 text-gray-700"}`}
            onClick={() => handleSortDate("oldest_to_newest")}
          >
            قدیمی‌ترین به جدیدترین
          </button>
        </div>
      </div>
      {/* Render filtered and sorted data */}
      <div className="grid grid-cols-4 gap-5 w-full items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {getData
          .filter((item) => {
            if (!searchQuery) return true;
            return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.creator.toLowerCase().includes(searchQuery.toLowerCase());
          })
          .filter((item) => {
            if (!filterByBool) return true;
            return item[filterByBool];
          })
          .sort((a, b) => {
            if (sortPrice === "low_to_high") {
              return a.last_price - b.last_price;
            } else if (sortPrice === "high_to_low") {
              return b.last_price - a.last_price;
            } else if (sortDate === "newest_to_oldest") {
              return new Date(b.date) - new Date(a.date);
            } else if (sortDate === "oldest_to_newest") {
              return new Date(a.date) - new Date(b.date);
            } else {
              return 0;
            }
          })
          .map((item, index) => (
            <div className="col-span-1" key={index}>
              <ImageCard
                className="bg-white"
                src={item.image_url}
                price={item.last_price}
                onClick={() => navigate(`/nft-details/${item.token_id}`)}
                tokenId={item.token_id}
                creator={item.creator}
                has_creator={true}
              >
                <div className="flex-col">
                  <div className="font-b5 py-1">{item.name}</div>
                  <div className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 py-1">{item.creator}</div>
                </div>
              </ImageCard>
            </div>
          ))}
      </div>
    </TestLayout>
  );
};

export default AllCollections;
