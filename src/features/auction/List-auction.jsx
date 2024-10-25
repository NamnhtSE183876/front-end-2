/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Auctioning from "./component-auction/auctioning";
import axios from "axios";
import api from "../../config/axios";

function Auction() {
  const [auctionId, setAuctionId] = useState();
  const navigate = useNavigate();

  const get_auctioning_api = "auction/get-auction/auctioning";

  const fetchAuctioning = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Token nè: ", token);
    const response = await api.get(get_auctioning_api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const auction = response.data.data[0]?.auctionId;
    setAuctionId(auction);
    console.log("hjajaja: ", auction);
  };

  useEffect(() => {
    fetchAuctioning();
  }, [auctionId]);

  const handlePastAuction = () => {
    navigate("/auctioned");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center h-screen bg-hero-pattern bg-cover relative">
        <div className="absolute bg-black bg-opacity-80 inset-0"></div>
        {auctionId && <Auctioning auctionId={auctionId} />}
        <div className="mt-96 absolute">
          <button
            onClick={handlePastAuction}
            className="mt-56 bg-yellow-200 rounded-3xl h-[50px] w-[200px] flex justify-center items-center hover:bg-yellow-300 transition-colors duration-300"
          >
            <h1>View Past Auctions</h1>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Auction;
