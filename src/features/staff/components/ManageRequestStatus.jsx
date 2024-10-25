import { useEffect, useState } from "react";
import { Button, Select, Table, Modal } from "antd";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import RequestDetails from "../components/RequestDetails";

const ManageRequestStatus = ({ onGoBack }) => {
  const storedData = localStorage.getItem("accountData");
  const accountData = JSON.parse(storedData);
  const accountId = accountData.accountId;
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showList, setShowList] = useState(true);
  const [updatingRequest, setUpdatingRequest] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const fetchRequest = async () => {
    try {
      console.log(accountId ? accountId : "none");
      const token = localStorage.getItem("accessToken");
      const response = await api.get(`/staff/list-request/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      const auctionData = response.data.data;

      const formattedRequests = auctionData.map((item) => ({
        requestId: item.requestId,
        status: item.status,
        fishId: item.koiFish.fishId,
        breederId: item.breeder.breederId,
        breederName: item.breeder.breederName,
        mediaUrl: item.koiFish.media.imageUrl,
        staff: item.staff,
        koiFish: item.koiFish,
      }));

      setAuctionRequests(formattedRequests);
    } catch (error) {
      console.error("Error fetching auction request data:", error);
      toast.error("Failed to fetch auction request data");
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleUpdateStatus = async () => {
    if (!updatingRequest?.requestId || !selectedStatus) {
      toast.error("Please select a valid status");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.patch(
        `/staff/request/${updatingRequest.requestId}/status`,
        {
          requestStatus: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );

      console.log(response); // Debugging: Check the response from the API

      if (response.status === 200) {
        toast.success("Status updated successfully");
        await fetchRequest();
        closeUpdateStatusModal(); // Close modal on success
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error.response?.data); // Log server error
      toast.error("Failed to update status");
    }
  };

  const showUpdateStatusModal = (record) => {
    setUpdatingRequest(record);
    setSelectedStatus(null); // Reset selected status when showing modal
  };

  const closeUpdateStatusModal = () => {
    setUpdatingRequest(null);
    setSelectedStatus(null); // Reset selected status on close
  };

  const displayStatus = (status) => {
    switch (status) {
      case "INSPECTION_PASSED":
        return "Pass";
      case "INSPECTION_FAILED":
        return "Not Pass";
      case "INSPECTION_IN_PROGRESS":
        return "In Progress";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "requestId",
      key: "requestId",
    },
    {
      title: "Fish ID",
      dataIndex: "fishId",
      key: "fishId",
    },
    {
      title: "Breeder ID",
      dataIndex: "breederId",
      key: "breederId",
    },
    {
      title: "Breeder Name",
      dataIndex: "breederName",
      key: "breederName",
    },
    {
      title: "Image",
      dataIndex: "mediaUrl",
      key: "mediaUrl",
      render: (image) => <img src={image} alt="" width={200} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => displayStatus(record.status),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleViewDetail(record)} type="link">
            View Detail
          </Button>
          {record.status === "INSPECTION_IN_PROGRESS" && (
            <Button
              onClick={() => showUpdateStatusModal(record)}
              type="primary"
            >
              Update Status
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleViewDetail = (request) => {
    setSelectedRequest(request);
    setShowList(false);
  };

  const handleGoBack = () => {
    setShowList(true);
    setSelectedRequest(null);
  };

  return (
    <div className="mt-20">
      {showList ? (
        <>
          <h1 className="text-left font-bold text-2xl my-5">Auction Request Manager</h1>
          <Table columns={columns} dataSource={auctionRequests} />

          {/* Update Status Modal */}
          <Modal
            visible={!!updatingRequest}
            title="Update Request Status"
            onCancel={closeUpdateStatusModal}
            onOk={handleUpdateStatus} // No need to pass parameters; handled internally
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
      ) : (
        <>
          <Button onClick={handleGoBack}>Go Back</Button>
          <RequestDetails
            selectedRequest={selectedRequest}
            staffList={[]} // Pass staff list if needed
            onAssign={async (request, staffId) => {
              // Handle staff assignment logic here
            }}
            fetchRequest={fetchRequest}
            onUpdateStatus={handleUpdateStatus}
            showUpdateStatusModal={showUpdateStatusModal} // Pass this for status modal
            updatingRequest={updatingRequest} // Pass this state to the modal in RequestDetails
            closeUpdateStatusModal={closeUpdateStatusModal} // Close modal callback
            selectedStatus={selectedStatus} // Status for the modal
            setSelectedStatus={setSelectedStatus} // Set status function for modal
          />
        </>
      )}
    </div>
  );
};

export default ManageRequestStatus;
