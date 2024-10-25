import { useState, useEffect } from "react";
import { Button, Card, Select, Input, notification } from "antd";
import api from "../../../config/axios";

const RequestDetails = ({ request, onBack, fetchRequest }) => {
  const [offerPrice, setOfferPrice] = useState(null);
  const [offerAuctionType, setOfferAuctionType] = useState(null);

  useEffect(() => {
    if (request) {
      console.log("Request Object:", request);
      setOfferPrice(request.price); // This can be kept as is since it uses the request's price
      setOfferAuctionType(request.auctionTypeNameBreeder);
    }
  }, [request]);

  if (!request) return <p>No request selected.</p>;

  const formatAuctionType = (auctionTypeName) => {
    switch (auctionTypeName) {
      case "DESCENDING_BID":
        return "Descending Bid";
      case "ASCENDING_BID":
        return "Ascending Bid";
      case "SEALED_BID":
        return "Sealed Bid";
      case "FIXED_PRICE_SALE":
        return "Fixed Price Sale";
      default:
        return auctionTypeName;
    }
  };

  const formatStatus = (status) => {
    const statusMap = {
      INSPECTION_PASSED: "Passed",
      INSPECTION_FAILED: "Failed",
      INSPECTION_IN_PROGRESS: "Checking",
      PENDING: "Pending",
      PENDING_NEGOTIATION: "Negotiating",
      PENDING_MANAGER_OFFER: "Waiting for Manager Approve",
      PENDING_BREEDER_OFFER: "Waiting for Breeder Approve",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
      APPROVE: "Approved",
    };
    return (
      statusMap[status] || status.charAt(0) + status.slice(1).toLowerCase()
    );
  };

  const getStatusColor = (status) => {
    switch (
    status.toUpperCase() // Ensure status is case-insensitive
    ) {
      case "PENDING":
        return "blue"; // Color for pending status
      case "INSPECTION_IN_PROGRESS":
        return "orange"; // Color for inspection in progress
      case "INSPECTION_PASSED":
        return "green"; // Color for inspection passed
      case "INSPECTION_FAILED":
        return "red"; // Color for inspection failed
      case "PENDING_MANAGER_OFFER":
        return "gold"; // Color for pending manager offer
      case "PENDING_BREEDER_OFFER":
        return "lime"; // Color for pending breeder offer
      case "APPROVE":
        return "cyan"; // Color for approval
      case "REJECT":
        return "magenta"; // Color for rejection
      case "CANCELLED":
        return "volcano"; // Color for cancelled status
      default:
        return "default"; // Default color for unknown status
    }
  };

  const handleNegotiate = async () => {
    if (!offerAuctionType || offerPrice === null) {
      notification.error({
        message: "Error",
        description: "Please select auction type and enter offer price.",
      });
      return;
    }

    try {
      await api.post(
        `/breeder/request/negotiation/send-negotiation/${request.requestId}`,
        {
          price: offerPrice,
          auctionTypeName: offerAuctionType,
        }
      );
      notification.success({
        message: "Success",
        description: "Offer submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting negotiation offer:", error);
      notification.error({
        message: "Error",
        description: "Failed to submit the offer.",
      });
    }
  };

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.post(
        `/breeder/request/negotiation/accept/${request.requestId}`,
        {}, // No request body, so an empty object is passed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      notification.success({
        message: "Success",
        description: "Offer accepted successfully!",
      });
    } catch (error) {
      console.error("Error accepting offer:", error);
      notification.error({
        message: "Error",
        description: "Failed to accept the offer.",
      });
    }
  };

  const handleCancel = async () => {
    try {
      await api.post(`/manager/request/cancel/${request.requestId}`);
      notification.success({
        message: "Success",
        description: "Request cancelled successfully!",
      });
      fetchRequest();
    } catch (error) {
      console.error("Error cancelling request:", error);
      notification.error({
        message: "Error",
        description: "Failed to cancel the request.",
      });
    }
  };

  return (
    <div className="p-6 bg-[#131313] rounded-2xl text-white my-5 mx-5">
      <button
        type="default"
        onClick={onBack}
        className="bg-red-600 text-white rounded-lg px-4 py-2 mb-3 hover:bg-red-500"
      >
        Back
      </button>

      <h2 className="text-3xl font-extrabold mb-6 text-[#bcab6f] text-center">
        Request Details
      </h2>

      <div className="flex flex-col gap-9 mb-8 divide-y">
        {/* Left Side: All Information Section */}
        <div className="col-span-2">
          <div className="p-3 mb-5">
            <div className="grid grid-cols-3 gap-4">
              {/* Breeder Info */}
              <div className="bg-gray-900 hover:bg-gray-800 rounded-2xl  my-4 border-2 border-[#bcab6f] py-4 pl-10 outline outline-offset-4 mx-2">
                <p>
                  <strong>Breeder ID:</strong> {request.breederId}
                </p>
                <p>
                  <strong>Breeder Name:</strong> {request.breederName}
                </p>
                <p>
                  <strong>Location:</strong> {request.breederLocation}
                </p>
                <h4 className="font-extrabold text-2xl text-[#bcab6f] mt-6">
                  Breeder Info
                </h4>
              </div>

              {/* Koi Info */}
              <div className="bg-gray-900 hover:bg-gray-800 rounded-2xl my-4 border-2 border-[#bcab6f] py-4 pl-10 outline outline-offset-4 mx-2">
                <div className="grid grid-cols-2">
                  <p>
                    <strong>Fish ID:</strong> {request.fishId}
                  </p>
                  <p>
                    <strong>Size:</strong> {request.size}
                  </p>
                  <p>
                    <strong>Age:</strong> {request.age}
                  </p>
                  <p>
                    <strong>Variety:</strong> {request.varietyName}
                  </p>
                  <p>
                    <strong>Gender:</strong> {request.gender}
                  </p>
                </div>
                <h5 className="font-extrabold text-2xl text-[#bcab6f] mt-6">
                  Koi Info
                </h5>
              </div>

              {/* Request Info */}
              <div className="bg-gray-900 hover:bg-gray-800 rounded-2xl text-balance my-4 border-2 border-[#bcab6f] py-4 pl-10 outline outline-offset-4 mx-2">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusColor(request.status)}>
                    {formatStatus(request.status)}
                  </span>
                </p>
                <p>
                  <strong>Requested At:</strong>{" "}
                  {new Date(request.requestedAt).toLocaleString()}
                </p>
                <p>
                  <strong>Price:</strong> ${request.price}
                </p>
                <p>
                  <strong>Auction Type:</strong>{" "}
                  {request.auctionTypeNameBreeder}
                </p>
                <h6 className="font-extrabold text-2xl text-[#bcab6f]">
                  Request Info
                </h6>
              </div>
            </div>
          </div>

          {/* Negotiation Section */}
          {/* Only render the negotiation card when the status is PENDING_MANAGER_OFFER or PENDING_BREEDER_OFFER */}
          {(request.status === "PENDING_MANAGER_OFFER" ||
            request.status === "PENDING_BREEDER_OFFER") && (
              <Card className="bg-gray-900 hover:bg-gray-800 rounded-2xl  my-4 border-2 border-[#bcab6f] py-4 pl-10 outline outline-offset-4 outline-white mx-60">
                <h7 className="font-extrabold text-2xl text-[#bcab6f]">
                  Negotiation
                </h7>

                {request.status === "PENDING_BREEDER_OFFER" && (
                  <>
                    {/* Display Manager's Offer */}
                    <div style={{ marginBottom: "16px" }}>
                      <h8 className="text-white font-semibold underline underline-offset-1">
                        Manager's Offer
                      </h8>
                      <p className="text-white font-semibold">
                        <strong>Offer Price:</strong> ${request.offerPriceManager}
                      </p>
                      <p className="text-white font-semibold">
                        <strong>Auction Type:</strong>{" "}
                        {formatAuctionType(request.auctionTypeNameManager)}
                      </p>
                    </div>

                    {/* Negotiation Form */}
                    <Input
                      type="number"
                      placeholder="Your Offer Price"
                      value={offerPrice || ""}
                      onChange={(e) =>
                        setOfferPrice(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      className="text-white w-48 mb-4 mr-4 px-3 py-2 border-2 border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-transparent"
                      style={{ backgroundColor: "transparent" }}
                    />
                    <Select
                      placeholder="Select Auction Type"
                      value={offerAuctionType || undefined}
                      onChange={setOfferAuctionType}
                      style={{
                        width: "200px",
                        marginBottom: "16px",
                        height: "38px",
                      }}
                      className="pr-5"
                    >
                      <Select.Option value="ASCENDING_BID">
                        Ascending Bid
                      </Select.Option>
                      <Select.Option value="DESCENDING_BID">
                        Descending Bid
                      </Select.Option>
                      <Select.Option value="SEALED_BID">Sealed Bid</Select.Option>
                      <Select.Option value="DIRECT_SALE">
                        Direct Sale
                      </Select.Option>
                    </Select>
                    <Button type="primary" onClick={handleNegotiate}>
                      Submit Offer
                    </Button>

                    {/* Actions for Breeder Offer */}
                    <div className="mt-4">
                      <h9 className="font-mono text-[#bcab6f]">
                        Note! Clicking Accept Offer only if you have confirmed
                        your deal with us.
                      </h9>
                      <button
                        type="primary"
                        onClick={handleAccept}
                        className="bg-red-600 font-bold rounded-lg px-4 py-2 hover:bg-red-500 mx-4"
                      >
                        Accept Offer
                      </button>
                      <button
                        type="default"
                        onClick={handleCancel}
                        className="bg-slate-400 rounded-lg px-4 py-2 hover:bg-slate-300"
                      >
                        Cancel Offer
                      </button>
                    </div>
                  </>
                )}
              </Card>
            )}
        </div>

        {/* Media Section */}
        <div>
          <div className="flex flex-row justify-between gap-5 p-3">
            {/* Image Display */}
            <div className="">
              <strong className="text-[#bcab6f] font-extrabold text-2xl">
                Image:
              </strong>
              {request.image ? (
                <img src={request.image} alt="Koi Fish" className="w-80 h-80" />
              ) : (
                <div className="flex items-center justify-center bg-gray-800 h-48 rounded-md">
                  <p>No image available.</p>
                </div>
              )}
            </div>

            {/* Video Display */}
            <div className="w-1/2">
              <strong className="text-[#bcab6f] font-extrabold text-2xl">
                Video:
              </strong>
              {request.videoUrl ? (
                <video className="w-full h-96 mt-2 rounded-md" controls>
                  <source src={request.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex items-center justify-center bg-gray-800 h-48 rounded-md">
                  <p>No video available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
