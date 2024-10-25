import { useState, useEffect, useRef } from "react";
import "./index.css";
import Time from "./components-bid/time";
import Picture from "./components-bid/picture";
import Information from "./components-bid/Infomation";
import EnterPrice from "./components-bid/EnterPrice";
import TopBid from "./components-bid/TopBid";
import Video from "./components-bid/Video";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom"; // Import useParams
import { io } from "socket.io-client";
import api from "../../config/axios";
import { toast } from "react-toastify"; // Import toast
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";

function Bid() {
  const { lotId } = useParams(); // Lấy lotId từ URL
  const { auctionId } = useParams();
  const [lot, setLot] = useState();
  const [remainingTime, setRemainingTime] = useState(0);
  const [bidList, setBidList] = useState([]); // State for bid list
  const [connectionStatus, setConnectionStatus] = useState(""); // State to store connection status
  const storedData = localStorage.getItem("accountData");
  const accountData = JSON.parse(storedData);
  const currentAccountId = accountData.accountId;
  const eventName = `Event_${lotId}`;
  const [winnerAccountId, setWinnerAccountId] = useState();
  const [hasEnded, setHasEnded] = useState(false); // Thêm biến trạng thái để theo dõi thời gian đã kết thúc
  const [registed, setRegisted] = useState(false);

  // Memoize socket connection using useRef to ensure it's stable across renders
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const get_lot_api = `auction/get-lot/${lotId}`; // Sử dụng lotId
  const get_bidList_api = `bid/list?lotId=${lotId}`; // API for bid list
  const get_winner_api = `register-lot/get-winner?lotId=${lotId}`;
  const get_checkRegisted_api = `register-lot/is-registered/${lotId}/${currentAccountId}`;

  const fetchCheckRegisted = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await api.get(get_checkRegisted_api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Is registed? ", response.data.message);
    if (response.data.message == "Member already registered") setRegisted(true);
  };

  const fetchWinner = async () => {
    const token = localStorage.getItem("accessToken");
    const response = await api.get(get_winner_api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Winner: ", response.data.data);
    setWinnerAccountId(response.data.data.member.account.accountId);
    console.log("Winner accountId: ", winnerAccountId);
  };

  const fetchLot = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(get_lot_api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Api lot: ", response.data.data);
      setLot(response.data.data);
    } catch (error) {
      console.error("Error fetching lot data at bid.jsx:", error);
    }
  };

  const fetchBidList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get(get_bidList_api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const listData = response.data.data.map((bid) => ({
        bidAmount: bid.bidAmount,
        firstName: bid.member.account.firstName,
      }));
      listData.sort((a, b) => b.bidAmount - a.bidAmount);
      setBidList(listData);
      console.log("AccountId: ", currentAccountId);
    } catch (error) {
      console.error("Error fetching bid data at bid.jsx:", error);
    }
  };

  useEffect(() => {
    fetchLot();
    fetchBidList();
    fetchWinner();
    fetchCheckRegisted();
  }, [winnerAccountId]);

  const handlePaymentClick = (toastId) => {
    toast.dismiss(toastId); // Close the toast
    navigate(`/payment/${lotId}`); // Redirect to payment page
  };

  // này t code nhạc xổ số vjp dành cho người win á
  // const playAudio = async () => {
  //   try {
  //     const audioRef = ref(
  //       storage,
  //       "https://firebasestorage.googleapis.com/v0/b/student-management-41928.appspot.com/o/y2mate.com%20-%20X%E1%BB%95%20S%E1%BB%91%20Ki%E1%BA%BFn%20Thi%E1%BA%BFt%20DXY%20Remix%20(mp3cut.net).mp3?alt=media&token=df48fa3f-8102-49a1-b632-4464ddba12a7"
  //     ); // Firebase path to your audio file
  //     const audioUrl = await getDownloadURL(audioRef);
  //     const audio = new Audio(audioUrl);
  //     audio.play(); // Play the audio
  //   } catch (error) {
  //     console.error("Error playing audio:", error);
  //   }
  // };

  const customRainbowStyle = {
    background:
      "linear-gradient(90deg, #ff0066, #ffcc00, #33cc33, #00ccff, #6600cc)",
    color: "#fff",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
  };

  useEffect(() => {
    if (lot) {
      console.log("End time: ", lot.endingTime);
      const endingTime = new Date(lot.endingTime).getTime();
      const interval = setInterval(() => {
        const now = Date.now();
        const timeLeft = endingTime - now;
        if (timeLeft <= 0) {
          clearInterval(interval);
          setRemainingTime(-1);
          if (registed) {
            if (!hasEnded) {
              setHasEnded(true); // Mark as ended
              if (currentAccountId === winnerAccountId) {
                // Rainbow colors for winner toast
                const toastId = toast(
                  <>
                    🎉 Congrats! You have won.
                    <button
                      onClick={() => handlePaymentClick(toastId)}
                      style={{
                        color: "white",
                        textDecoration: "underline",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      Click here to proceed to payment.
                    </button>
                  </>,
                  {
                    autoClose: false, // Don't automatically close
                    style: customRainbowStyle, // Apply your rainbow style
                  }
                );
              } else {
                toast("Bạn đã thua, chúc bạn may mắn lần sau!", {
                  autoClose: false, // Don't auto-close
                });
              }
            }
          }
        } else {
          setRemainingTime(timeLeft);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lot, hasEnded, currentAccountId, winnerAccountId]);

  //Này của socket
  useEffect(() => {
    // Only establish the socket connection if it doesn't exist
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8081"); // Establish connection
    }

    const socket = socketRef.current; // Access the stable socket

    // Listen for the connect event
    socket.on("connect", () => {
      console.log("WebSocket Connected");
      setConnectionStatus("WebSocket Connected");
    });

    // Listen for specific event
    socket.on(eventName, (data) => {
      console.log("Received data from specific event:", data);
      fetchLot();
      fetchBidList();
    });

    // Clean up the event listener on unmount or when eventName changes
    return () => {
      socket.off(eventName); // Properly remove listener
    };
  }, [eventName]); // Only re-subscribe when eventName changes

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-hero-pattern bg-cover relative">
        <div className="absolute bg-black bg-opacity-80 inset-0"></div>
        <h1 className="relative mt-5">
          {lot && <Time remainingTime={remainingTime} auctionId={auctionId} />}
        </h1>
        <div className="flex flex-row justify-center relative mb-10">
          <div className="mt-16">
            <div className="max-w-full">
              {lot && <Picture img={lot.koiFish.imageUrl} />}
            </div>
            <div className="mt-4 lg:mt-[30px]">
              {lot && <Video vid={lot.koiFish.videoUrl} />}
            </div>
          </div>
          <div className="mr-0 lg:mr-[190px] mt-10 ">
            <div>
              {lot && (
                <Information
                  gender={lot.koiFish.gender}
                  size={lot.koiFish.size}
                  age={lot.koiFish.age}
                  breeder={lot.koiFish.breederName}
                  varietyName={lot.koiFish.varietyName}
                  fishId={lot.koiFish.fishId}
                  registed={registed}
                />
              )}
            </div>
            <div>
              {lot && (
                <EnterPrice
                  currentPrice={lot.currentPrice}
                  startingPrice={lot.startingPrice}
                  increment={lot.increment}
                  lotId={lotId}
                  fetchLot={fetchLot}
                  fetchBidList={fetchBidList}
                  remainingTime={remainingTime}
                  eventName={eventName}
                  socket={socketRef.current} // Use stable socket instance
                  registed={registed}
                />
              )}
            </div>
            <div className="mt-4 lg:mt-[20px]">
              {lot && <TopBid list={bidList} />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bid;
