import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Tag,
  Select,
  Input,
  Modal,
  notification,
  Image,
} from "antd";
import api from "../../../config/axios";
import { FaFish, FaFlag } from "react-icons/fa"; // Importing required icons

const RequestDetails = ({ request, onBack, staffList, fetchRequest }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [offerPrice, setOfferPrice] = useState(null);
  const [offerAuctionType, setOfferAuctionType] = useState(null);

  useEffect(() => {
    if (request) {
      fetchRequest();
      console.log("Request Object:", request);
      setOfferPrice(request.price);
      setOfferAuctionType(request.auctionTypeName);
    }
  }, [request]);

  if (!request) return <p>No request selected.</p>;

  const formatStatus = (status) => {
    const statusMap = {
      INSPECTION_PASSED: "Passed",
      INSPECTION_FAILED: "Failed",
      INSPECTION_IN_PROGRESS: "Checking",
      PENDING: "Pending",
      PENDING_NEGOTIATION: "Negotiating",
      PENDING_MANAGER_OFFER: "Waiting for Manager Approve", // Custom status for manager offer
      PENDING_BREEDER_OFFER: "Waiting for Breeder Approve", // Custom status for breeder offer
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
      APPROVE: "Approved", // Added new status for APPROVE
    };
    return (
      statusMap[status] || status.charAt(0) + status.slice(1).toLowerCase()
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "INSPECTION_PASSED":
        return "green";
      case "INSPECTION_FAILED":
        return "red";
      case "INSPECTION_IN_PROGRESS":
        return "orange";
      case "PENDING":
        return "blue";
      case "PENDING_NEGOTIATION":
        return "purple";
      case "PENDING_MANAGER_OFFER": // Color for manager offer
        return "cyan";
      case "PENDING_BREEDER_OFFER": // Color for breeder offer
        return "gold";
      case "COMPLETED":
        return "geekblue";
      case "CANCELLED":
        return "volcano";
      case "APPROVE": // Color for APPROVE status
        return "cyan";
      default:
        return "default";
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
      const token = localStorage.getItem("accessToken");
      await api.post(
        `/manager/request/negotiation/${request.requestId}`,
        {
          offerPrice,
          auctionTypeName: offerAuctionType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );
      notification.success({
        message: "Success",
        description: "Offer submitted successfully!",
      });
      await fetchRequest();
    } catch (error) {
      console.error("Error submitting negotiation offer:", error);
      notification.error({
        message: "Error",
        description: "Failed to submit the offer.",
      });
    }
  };

  const handleAssignStaff = async () => {
    if (!selectedStaff) {
      notification.error({
        message: "Error",
        description: "Please select a staff member.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("accessToken"); // Correct token key
      const response = await api.post(
        `/manager/request/assign-staff/${request.requestId}?accountId=${selectedStaff}`,
        {}, // Empty data object for the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct token in header
          },
        }
      );
      console.log(selectedStaff);
      console.log(request.requestId);
      console.log(response);
      notification.success({
        message: "Success",
        description: "Staff assigned successfully!",
      });
      await fetchRequest();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error assigning staff:", error);
      notification.error({
        message: "Error",
        description: "Failed to assign staff.",
      });
    }
  };

  return (
    <div>
      <h2>Request Details</h2>
      <Row gutter={16}>
        {/* Left Side: All Information Section */}
        <Col span={16}>
          <Card title={<strong>All Information</strong>} className="mb-4">
            <Row gutter={8}>
              {/* Breeder Info Column */}
              <Col span={8}>
                <h4>
                  <strong>Breeder Info</strong>
                </h4>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Breeder ID:</strong> {request.breederId}
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Breeder Name:</strong> {request.breederName}
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Location:</strong> {request.breederLocation}
                </p>
              </Col>

              {/* Vertical Divider */}
              <Col span={1} style={{ textAlign: "center" }}>
                <div
                  style={{
                    borderLeft: "1px solid #d9d9d9",
                    height: "100%",
                    margin: "0 0 4px",
                  }}
                />
              </Col>

              {/* Koi Info Column */}
              <Col span={7}>
                <h4>
                  <strong>Koi Info</strong>
                </h4>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Fish ID:</strong> {request.fishId}
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Size:</strong> {request.size}
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Age:</strong> {request.age}
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Variety:</strong> {request.varietyName}
                </p>
              </Col>

              {/* Vertical Divider */}
              <Col span={1} style={{ textAlign: "center" }}>
                <div
                  style={{
                    borderLeft: "1px solid #d9d9d9",
                    height: "100%",
                    margin: "0 0 4px",
                  }}
                />
              </Col>

              {/* Request Info Column */}
              <Col span={7}>
                <h4>
                  <strong>Request Info</strong>
                </h4>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>
                    <FaFlag /> Status:
                  </strong>{" "}
                  <Tag color={getStatusColor(request.status)}>
                    {formatStatus(request.status)}
                  </Tag>
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Requested At:</strong>{" "}
                  {new Date(request.requestedAt).toLocaleString()}
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Price:</strong> ${request.price}
                </p>
                <p style={{ margin: "0 0 4px" }}>
                  <strong>Auction Type:</strong> {request.auctionTypeName}
                </p>
              </Col>
            </Row>
          </Card>

          {/* Staff Assignment and Negotiation Section */}
          <Card className="mb-4">
            <h3>
              <strong>Actions</strong>
            </h3>
            {request.status === "PENDING" && (
              <>
                <Select
                  placeholder="Select staff"
                  onChange={setSelectedStaff}
                  style={{ width: "300px", marginBottom: "16px" }}
                >
                  {staffList.map((staff) => (
                    <Select.Option
                      key={staff.accountId}
                      value={staff.accountId}
                    >
                      {staff.firstName} {staff.lastName} (ID: {staff.accountId})
                    </Select.Option>
                  ))}
                </Select>
                <Button
                  onClick={() => setIsModalVisible(true)}
                  disabled={!selectedStaff}
                  type="primary"
                  className="bg-red-500 hover:bg-red-700 text-white"
                >
                  Assign
                </Button>

                <Modal
                  title="Confirm Staff Assignment"
                  visible={isModalVisible}
                  onOk={handleAssignStaff}
                  onCancel={() => setIsModalVisible(false)}
                >
                  <p>Are you sure you want to assign this staff member?</p>
                </Modal>
              </>
            )}

            {(request.status === "INSPECTION_PASSED" ||
              request.status === "PENDING_MANAGER_OFFER") && (
              <>
                <h3>
                  <strong>Negotiate</strong>
                </h3>
                {request.status === "PENDING_MANAGER_OFFER" && (
                  <p>Waiting for Manager Approve</p>
                )}
                <Input
                  type="number"
                  placeholder="Offer Price"
                  value={offerPrice || ""}
                  onChange={(e) =>
                    setOfferPrice(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  style={{ width: "200px", marginBottom: "16px" }}
                />
                <Select
                  placeholder="Select Auction Type"
                  value={offerAuctionType || undefined}
                  onChange={setOfferAuctionType}
                  style={{ width: "200px", marginBottom: "16px" }}
                >
                  <Select.Option value="ASCENDING_BID">
                    Ascending Bid
                  </Select.Option>
                  <Select.Option value="DESCENDING_BID">
                    Descending Bid
                  </Select.Option>
                  <Select.Option value="SEALED_BID">Sealed Bid</Select.Option>
                  <Select.Option value="FIXED_PRICE_SALE">
                    Fixed Price Sale
                  </Select.Option>
                </Select>
                <Button
                  onClick={handleNegotiate}
                  type="primary"
                  className="bg-red-500 hover:bg-red-700 text-white"
                >
                  Submit Offer
                </Button>
              </>
            )}

            {request.status === "PENDING_BREEDER_OFFER" && (
              <p>Waiting for Breeder Approve</p>
            )}
          </Card>
        </Col>

        {/* Right Side: Media Section */}
        <Col span={8}>
          <Card title={<strong>Media</strong>} className="mb-4">
            {/* Video Preview */}
            {request.videoUrl ? (
              <div style={{ marginTop: 16 }}>
                <strong>Video:</strong>
                <video width="300" controls>
                  <source src={request.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <p>No video available for this auction request.</p>
            )}

            {/* Image Display */}
            <h4>
              <strong>Image:</strong>
            </h4>
            {request.image ? (
              <Image
                src={request.image}
                alt="Koi Fish"
                style={{ width: 200 }}
              />
            ) : (
              <p>No image available for this auction request.</p>
            )}
          </Card>
        </Col>
      </Row>

      <Button onClick={onBack} type="default" className="mt-4">
        Back
      </Button>
    </div>
  );
};

export default RequestDetails;
