import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ImageCard from "../components/Cards/UserDashboardCards/ImageCard";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { Link, useNavigate } from "react-router-dom";

const Collections = () => {
  const [getData, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.artina.org/api/transaction/UserCollection/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
        },
        mode: "cors",
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  }, []);

  return (
    <TestLayout>
      <div className="d-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full items-center ">
        {getData
          ? getData.map((item, index) => (
              <div className="col-span-1" key={index}>
                <ImageCard
                  className="bg-white"
                  src={item.image_url}
                  price={item.last_price}
                  onClick={()=> navigate(`/nft-details/${item.token_id}`)}
                  tokenId={item.token_id}
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
