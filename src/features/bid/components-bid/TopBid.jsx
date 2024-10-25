import { Button } from "antd";
import { useEffect, useState } from "react";

function TopBid({ list }) {
  // Nhận danh sách bid từ props
  const [topBids, setTopBids] = useState([]);

  useEffect(() => {
    // Tìm 5 bidAmount cao nhất
    const sortedBids = [...list].sort((a, b) => b.bidAmount - a.bidAmount);
    setTopBids(sortedBids.slice(0, 5));
  }, [list]);

  return (
    <div className="ml-[30px] bg-gray-900 hover:bg-gray-800 rounded-2xl border-2 border-[#bcab6f] outline outline-offset-2 outline-white h-full w-[800px] text-white shadow-md">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl p-5 text-[#bcab6f]">Top Bid</h1>
        <Button className="font-bold m-6 rounded-3xl">Refresh</Button>
      </div>
      <div className="overflow-y-auto h-[400px]">
        {topBids.map((bid, index) => (
          <div
            key={index}
            className={`h-[70px] w-[700px] m-5 rounded-[20px] flex items-center justify-between pl-7 ml-10 ${
              bid.bidAmount === Math.max(...topBids.map((b) => b.bidAmount))
                ? "bg-green-500"
                : "bg-slate-400"
            }`}
          >
            <h1 className="text-xl font-bold">{bid.firstName}</h1>
            <h1 className="text-xl font-bold mr-8">{bid.bidAmount}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBid;
