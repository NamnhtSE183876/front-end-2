import "./index.css";
import Time from "./component-lot/time";
import Picture from "./component-lot/picture";
import Information from "./component-lot/infomation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";

function Lot() {
  const { auctionId } = useParams();
  const [lots, setLots] = useState([]);
  const [endTime, setEndTime] = useState();
  const [remainingTime, setRemainingTime] = useState();
  const navigate = useNavigate();

  const get_lot_api = `auction/get-auction/${auctionId}`;

  const fetchLots = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(get_lot_api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API: ", response.data.data);
      const listLots = response.data.data.lots.map((lot) => ({
        // Cập nhật ở đây
        lotId: lot.lotId,
        varietyName: lot.koiFish.varietyName,
        currentPrice: lot.currentPrice,
        breederName: lot.koiFish.breederName,
        gender: lot.koiFish.gender,
        size: lot.koiFish.size,
        age: lot.koiFish.age,
        imageUrl: lot.koiFish.imageUrl,
      }));
      setLots(listLots);
      console.log("data nhận dc: ", listLots); // Cập nhật để in ra danh sách lots
      setEndTime(response.data.data.endTime);
      console.log("End time ", response.data.data.endTime);
    } catch (error) {
      console.error("Error fetching lots: ", error);
    }
  };

  useEffect(() => {
    fetchLots();
  }, [auctionId]);

  useEffect(() => {
    if (lots) {
      const endingTime = new Date(endTime).getTime();
      const interval = setInterval(() => {
        const now = Date.now();
        const timeLeft = endingTime - now;

        // Nếu thời gian còn lại <= 0, dừng interval
        if (timeLeft <= 0) {
          clearInterval(interval);
          setRemainingTime(-1); // Đặt giá trị đặc biệt để chỉ ra đã kết thúc
        } else {
          setRemainingTime(timeLeft);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lots]);

  const handlePageChange = (lotId) => {
    navigate(`/bid/${lotId}/${auctionId}`); // Chuyển hướng đến trang Bid với lotId
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mt-[50px] bg-hero-pattern bg-cover relative">
        <div className="absolute bg-black bg-opacity-70 inset-0"></div>
        <div className="relative">
          {lots && <Time remainingTime={remainingTime} auctionId={auctionId} />}
        </div>
        <div className="mb-10 z-20 sm:flex flex-wrap justify-center gap-36 relative">
          {lots.map((lot, index) => (
            <div key={index}>
              <button
                onClick={() => handlePageChange(lot.lotId)} // Truyền lotId vào hàm
                className="h-[600px] w-full bg-gray-900 rounded-[50px] pb-14 my-10 border-2 border-[#bcab6f] hover:bg-gray-800 hover:border-4"
              >
                {lots && (
                  <div className="w-full h-auto object-cover">
                    <Picture img={lot.imageUrl} />
                  </div>
                )}
                <div className="flex justify-center font-bold mt-3 ">
                  {lots && (
                    <Information
                      varietyName={lot.varietyName}
                      currentPrice={lot.currentPrice}
                      breederName={lot.breederName}
                      gender={lot.gender}
                      size={lot.size}
                      age={lot.age}
                    />
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Lot;
