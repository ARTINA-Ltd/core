import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ImageCard from "../components/Cards/UserDashboardCards/ImageCard";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../App";

const Collections = () => {
  const [getData, setData] = useState();
  const user = useContext(UserContext);

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.artina.org/api/transaction/collection/${username}/nfts/`,
        {}
      )
      .then((res) => {
        setData(res.data);
      });
  }, [username]);

  return (
    <TestLayout>
      {getData && getData.length > 0 ? (
        ""
      ) : (
        <div className="w-full flex items-center justify-center  text-lg font-b3">
          <div className="hover:bg-red-100 bg-red-50 border-[1px] border-red-500 text-red-500 transition-all rounded-2xl py-1 px-5">
            هنوز مجموعه ای ندارید!
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-5 w-full items-center ">
        {getData
          ? getData.map((item, index) => (
              <div className="col-span-1" key={index}>
                <ImageCard
                  className="bg-white"
                  src={item.image_url}
                  price={item.last_price}
                  onClick={() => navigate(`/nft-details/${item.token_id}`)}
                  tokenId={item.token_id}
                  showSell={user ? user.data.username === username : false}
                >
                  {item.name}
                </ImageCard>
              </div>
            ))
          : ""}
      </div>
    </TestLayout>
  );
};

export default Collections;
