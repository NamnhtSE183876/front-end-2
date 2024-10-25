import { TbGavel } from "react-icons/tb";

function Information({ auctionId, lots, startTime, endTime }) {
  // Extract the variety names and join them with commas
  const varietyNames = lots.map((lot) => lot.varietyName).join(", ");

  const formatTime = (time) => {
    const date = new Date(time); // Create a Date object from the time
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit", // Add seconds to the format
      hour12: false, // Change to true for 12-hour format
    };
    return date.toLocaleString("en-US", options); // Use toLocaleString for full date and time formatting
  };

  return (
    <div>
      <h1 className="text-[#bcab6f] text-3xl font-bold pt-5 pr-[200px]">
        Auction#{auctionId}
      </h1>
      <div className="flex items-start ml-5">
        <TbGavel className="h-[150px] w-[70px] text-white pb-3" />
        <div className="mt-10 ml-3">
          <div>
            <h2 className="text-white flex items-center text-sm">
              {formatTime(startTime)} - {formatTime(endTime)}
            </h2>
          </div>
          <div className="flex items-start">
            <h1 className="text-white text-xl font-bold">Variety:</h1>
            <h2 className="text-white text-l ml-1 mt-1">{varietyNames}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
