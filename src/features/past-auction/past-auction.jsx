/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import viteLogo from "/vite.svg";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import api from "../../config/axios";
import Information from "./component-past-auction/information";
import Search from "./component-past-auction/search";
import { Button } from "antd";

function Auctioned() {
  const [auctioned, setAuctioned] = useState([]);
  const navigate = useNavigate();

  const get_auctioned_api = "auction/get-auction/completed";

  const fetchAuctioned = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Token nè: ", token);
    const response = await api.get(get_auctioned_api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const auction = response.data.data.map((auction) => ({
      auctionId: auction.auctionId,
      startTime: auction.startTime,
      endTime: auction.endTime,
      lots: auction.lots.map((lot) => ({
        lotId: lot.lotId,
        varietyName: lot.koiFish.varietyName,
        imageUrl: lot.imageUrl,
      })),
    }));
    setAuctioned(auction);
  };

  useEffect(() => {
    fetchAuctioned();
  }, []);

  const handleLotPage = (id) => {
    navigate(`/lot/${id}`);
  };
  return (
    <div className="bg-black flex flex-col min-h-screen">
      <Header />
      <h1 className="text-[#bcab6f] mt-[100px] ml-10 text-3xl font-bold">
        Past Auction
      </h1>
      <div>
        <Search />
      </div>
      <div className="flex flex-wrap justify-start gap-16 ml-[100px]">
        {auctioned.map((auction, index) => (
          <div key={index}>
            <button
              onClick={() => handleLotPage(auction.auctionId)}
              className="ml-10 mt-5 mb-10 h-[200px] w-[400px] bg-slate-600"
            >
              {auctioned && (
                <Information
                  auctionId={auction.auctionId}
                  lots={auction.lots}
                  startTime={auction.startTime}
                  endTime={auction.endTime}
                />
              )}
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Auctioned;
