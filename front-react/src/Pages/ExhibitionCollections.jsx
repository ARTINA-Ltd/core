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

const ExhibitionCollections = () => {
  const [getData, setData] = useState();
  const [getExhibition, setExhibition] = useState();

  const user = useContext(UserContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.artina.org/api/exhibition/exhibition/${id}/`)
      .then((res) => {
        setData(res.data);
      });
    axios
      .get(`https://api.artina.org/api/exhibition/ExhibitionInfoView/${id}/`)
      .then((res) => {
        setExhibition(res.data);
      });
  }, []);

  return (
    <TestLayout>
      <img
        src={getExhibition ? getExhibition.image : ""}
        className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
        alt=""
      />
      <div className="text-6xl font-b9 w-full text-center">{getExhibition.marketName}</div>

      <div className="d-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full items-center mt-6">
        {getData ? (
          getData.map((item, index) => (
            <div className="col-span-1" key={index}>
              <ImageCard
                className="bg-white"
                src={item.image_url}
                price={item.last_price}
                onClick={() => navigate(`/nft-details/${item.token_id}`)}
                tokenId={item.token_id}
                showSell={false}
              >
                {item.name}
              </ImageCard>
            </div>
          ))
        ) : (
          <div>هنوز مجموعه ای ندارید.</div>
        )}
      </div>
    </TestLayout>
  );
};

export default ExhibitionCollections;
