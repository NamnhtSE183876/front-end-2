/* eslint-disable react/prop-types */
import { Input, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Socket } from "socket.io-client";
import api from "../../../config/axios";

function EnterPrice({
  currentPrice,
  startingPrice,
  increment,
  currentMemberId,
  lotId,
  fetchLot,
  fetchBidList,
  remainingTime,
  eventName,
  registed,
}) {
  const [bidPrice, setBidPrice] = useState("");
  const [registrationLink, setRegistrationLink] = useState(""); // Thêm state để lưu link đăng ký

  const post_bid_api = "bid/bidAuction"; //Bid
  const post_regis_api = "register-lot/regis"; //Deposit
  const post_socket_api = `test/send?eventName=${eventName}`;

  const handleBidNotification = async () => {
    try {
      await api.post(post_socket_api, {
        winnerName: currentMemberId, // Tên người thắng
        newPrice: bidPrice.replace(/\./g, ""), // Giá mới
        lotId: lotId, // ID của lô
      });
    } catch (error) {
      console.error("Error sending bid notification:", error);
    }
  };

  const handleBid = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // Move the headers object outside of the data you're sending
      const response = await api.post(
        post_bid_api,
        {
          lotId: lotId,
          price: bidPrice.replace(/\./g, ""), // Format price
          memberId: currentMemberId, // Ensure this is correctly passed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      toast.success(response.data.message);
      fetchLot();
      fetchBidList();
      await handleBidNotification(); // Gọi hàm thông báo sau khi đặt giá thầu
      setRegistrationLink("");
    } catch (error) {
      console.error("Error submitting bid:", error);
      console.log("Registration link: ", registrationLink);
    }
  };

  const fetchRegisLink = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await api.post(
      post_regis_api,
      {
        lotId: lotId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Đạ dang ki chua? ", registed);
    const link = response.data.data;
    console.log("Link: ", link);
    setRegistrationLink(link);
  };

  // Hàm định dạng số
  const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""; // {{ edit_8 }}
  };

  const handleDepositClick = () => {
    if (registrationLink) {
      window.open(registrationLink, "_blank"); // Mở link trong tab mới
    }
  };

  useEffect(() => {
    fetchRegisLink();
  }, []);

  return (
    <div
      className={`ml-[30px] mt-[20px] rounded-2xl border-2 hover:border-4 border-[#bcab6f] outline outline-offset-2 outline-white ${
        registrationLink ? "h-[170px]" : "h-[150px]"
      } w-[800px] text-white shadow-md bg-gray-900 hover:bg-gray-800`}
    >
      <div className="flex items-center justify-between gap-3 text-black">
        <div className="bg-slate-500 h-[40px] w-[550px] rounded-[50px] flex items-center justify-between pl-7 ml-3 mt-5 ">
          <h1 className="text-xl font-bold">Highest price</h1>
          <h1 className="text-xl font-extrabold mr-8 text-[#af882b]">
            {formatNumber(currentPrice)}
          </h1>
        </div>
        <div className="bg-slate-500 h-[40px] w-[550px] rounded-[50px] flex items-center justify-between pl-7 mr-3 mt-5">
          <h1 className="text-xl font-bold">Started Price</h1>
          <h1 className="text-xl font-bold mr-8">
            {formatNumber(startingPrice)}
          </h1>
        </div>
      </div>
      <div className="flex justify-between gap-3 mt-7">
        {registed && remainingTime > 0 && (
          <div className="ml-3 ">
            <button
              className="bg-red-600 hover:bg-red-500 rounded-2xl h-[40px] w-[100px] font-bold text-black hover:border-2 hover:border-[#bcab6f]"
              onClick={handleBid}
            >
              Bid
            </button>
          </div>
        )}
        <div>
          <Input
            className={`rounded-3xl mr-2 h-[40px] w-[270px] text-black ${
              !registed || remainingTime <= 0 ? "hidden" : ""
            }`}
            type="text"
            value={formatNumber(bidPrice)}
            onChange={(e) => setBidPrice(e.target.value.replace(/\./g, ""))}
          />
        </div>
        {!registed && remainingTime > 0 && (
          <div className="mr-[230px]">
            <button
              className="bg-blue-400 hover:bg-blue-300 rounded-2xl h-[40px] w-[150px] font-bold text-black hover:border-2 hover:border-[#bcab6f]"
              onClick={handleDepositClick} // Gọi hàm khi nhấn nút
            >
              Deposit here!
            </button>
          </div>
        )}
        <div className="bg-slate-500 h-[40px] w-[380px] rounded-[50px] flex items-center justify-between pl-7 mr-3 text-black ">
          <h1 className="text-xl font-bold ">Increment</h1>
          <h1 className="text-xl font-bold mr-8">{formatNumber(increment)}</h1>
        </div>
      </div>
    </div>
  );
}

export default EnterPrice;
