import React, { useState } from "react";
import { Image, Button, Modal, Select } from "antd";

// Component to display auction request details
const RequestDetails = ({
  selectedRequest,
  staffList,
  onAssign,
  fetchRequest,
  onUpdateStatus,
  showUpdateStatusModal,
  updatingRequest,
  closeUpdateStatusModal,
  selectedStatus,
  setSelectedStatus,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  if (!selectedRequest) return <p>No request selected.</p>;

  const formatStatus = (status) => {
    switch (status) {
      case "INSPECTION_PASSED":
        return "Pass";
      case "INSPECTION_FAILED":
        return "Fail";
      case "PENDING":
        return "Pending";
      case "INSPECTION_IN_PROGRESS":
        return "In Progress";
      default:
        return status.charAt(0) + status.slice(1).toLowerCase(); // Capitalizes the first letter for other statuses
    }
  };

  const handleAssign = async () => {
    if (selectedStaff) {
      await onAssign(selectedRequest, selectedStaff); // Pass selected request and staff ID to onAssign
      setIsModalVisible(false); // Close the modal after assignment
      setSelectedStaff(null); // Clear selected staff
      fetchRequest(); // Refresh the auction requests
    } else {
      alert("Please select a staff member.");
    }
  };

  return (
    <div>
      <h2>Auction Request Details</h2>

      {/* Request Info */}
      <p>
        <strong>Request ID:</strong> {selectedRequest.requestId}
      </p>
      <p>
        <strong>Request Status:</strong> {formatStatus(selectedRequest.status)}
      </p>

      {/* Breeder Info */}
      {selectedRequest.breeder && (
        <>
          <p>
            <strong>Breeder ID:</strong> {selectedRequest.breeder.breederId}
          </p>
          <p>
            <strong>Breeder Name:</strong> {selectedRequest.breeder.breederName}
          </p>
          <p>
            <strong>Location:</strong> {selectedRequest.breeder.location}
          </p>
        </>
      )}

      {/* Fish Info */}
      {selectedRequest.koiFish && (
        <>
          <p>
            <strong>Fish ID:</strong> {selectedRequest.koiFish.fishId}
          </p>
          <p>
            <strong>Gender:</strong> {selectedRequest.koiFish.gender}
          </p>
          <p>
            <strong>Age:</strong> {selectedRequest.koiFish.age} years old
          </p>
          <p>
            <strong>Size:</strong> {selectedRequest.koiFish.size} cm
          </p>
          <p>
            <strong>Price:</strong> {selectedRequest.koiFish.price} $
          </p>
          <p>
            <strong>Auction Type:</strong>{" "}
            {selectedRequest.koiFish.auctionTypeName}
          </p>

          {/* Variety Info */}
          {selectedRequest.koiFish.variety && (
            <>
              <p>
                <strong>Variety ID:</strong>{" "}
                {selectedRequest.koiFish.variety.varietyId}
              </p>
              <p>
                <strong>Variety Name:</strong>{" "}
                {selectedRequest.koiFish.variety.varietyName}
              </p>
            </>
          )}

          {/* Media Info */}
          {selectedRequest.koiFish.media && (
            <>
              <Image
                width={200}
                src={selectedRequest.koiFish.media.imageUrl}
                alt="Auction Request"
                style={{ marginTop: 16 }}
              />
              {selectedRequest.koiFish.media.videoUrl ? (
                <div style={{ marginTop: 16 }}>
                  <strong>Video:</strong>
                  <video width="300" controls>
                    <source
                      src={selectedRequest.koiFish.media.videoUrl}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <p>No video available for this auction request.</p>
              )}
            </>
          )}
        </>
      )}

      {/* Staff Info */}
      {selectedRequest.staff && (
        <>
          <h3>Assigned Staff</h3>
          <p>
            <strong>Staff ID:</strong> {selectedRequest.staff.accountId}
          </p>
          <p>
            <strong>Name:</strong> {selectedRequest.staff.firstName}{" "}
            {selectedRequest.staff.lastName}
          </p>
          <p>
            <strong>Email:</strong> {selectedRequest.staff.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {selectedRequest.staff.phoneNumber}
          </p>
          <p>
            <strong>Role:</strong> {selectedRequest.staff.role}
          </p>
        </>
      )}

      {/* Only show Assign button if status is PENDING */}
      {selectedRequest.status === "PENDING" && (
        <>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Assign Staff
          </Button>

          {/* Assign Staff Modal */}
          <Modal
            visible={isModalVisible}
            title="Assign Staff"
            onCancel={() => setIsModalVisible(false)}
            onOk={handleAssign}
            okText="Assign"
            cancelText="Cancel"
          >
            <p>
              Assign a staff member to request ID: {selectedRequest.requestId}
            </p>
            <Select
              placeholder="Select staff"
              style={{ width: "100%" }}
              onChange={(value) => setSelectedStaff(value)}
            >
              {staffList.map((staff) => (
                <Select.Option key={staff.accountId} value={staff.accountId}>
                  {staff.firstName} | {staff.lastName} | AccountID:{" "}
                  {staff.accountId}
                </Select.Option>
              ))}
            </Select>
          </Modal>
        </>
      )}

      {/* Only show "Update Status" button if status is INSPECTION_IN_PROGRESS */}
      {selectedRequest.status === "INSPECTION_IN_PROGRESS" && (
        <>
          <Button
            type="primary"
            onClick={() => showUpdateStatusModal(selectedRequest)}
          >
            Update Status
          </Button>

          {/* Update Status Modal */}
          <Modal
            visible={!!updatingRequest}
            title="Update Request Status"
            onCancel={closeUpdateStatusModal}
            onOk={onUpdateStatus} // No need to pass parameters; handled internally
            okText="Update"
            cancelText="Cancel"
          >
            <p>
              Update the status for request ID: {updatingRequest?.requestId}
            </p>
            <Select
              placeholder="Select status"
              style={{ width: "100%" }}
              onChange={(value) => setSelectedStatus(value)}
              value={selectedStatus}
            >
              <Select.Option value="INSPECTION_PASSED">
                Inspection Passed
              </Select.Option>
              <Select.Option value="INSPECTION_FAILED">
                Inspection Failed
              </Select.Option>
            </Select>
          </Modal>
        </>
      )}
    </div>
  );
};

export default RequestDetails;
