import "../index.css";
import { useNavigate } from "react-router-dom";

function Auctioning({ auctionId }) {
  const navigate = useNavigate(); // Sử dụng useNavigate

  const handlePageChange = () => {
    navigate(`/lot/${auctionId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-hero-pattern bg-cover relative">
      <div className="absolute bg-black bg-opacity-70 inset-0"></div>
      <button
        onClick={handlePageChange}
        className="bg-yellow-400 rounded-full h-[400px] w-[400px] text-2xl animation-pulse absolute"
      >
        <h1 className="text-black font-bold">Auction#{auctionId}</h1>
        <h1 className="text-black font-bold mt-7">Bidding Now</h1>
      </button>
    </div>
  );
}

export default Auctioning;
