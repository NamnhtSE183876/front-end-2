import React, { useState } from "react";
import { Card, Descriptions, Typography, Divider, Button, Input, message } from "antd";
import { useAuth } from "../../protectedRoutes/AuthContext";
import api from "../../../config/axios";
import { toast } from "react-toastify";

const { Title } = Typography;

const UserProfile = () => {
  // Get data and setter functions from AuthContext
  const { userName, role, setUserName } = useAuth();
  const [accountData, setAccountData] = useState(
    JSON.parse(localStorage.getItem("accountData")) || {}
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(accountData);

  const token = localStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const data = {
    firstName: editedData.firstName,
    lastName: editedData.lastName,
    phoneNumber: editedData.phoneNumber,
  };

  const handleSave = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await api.post('authenticate/update-profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status } = response.data;
      const { message } = response.data;
      if (status === 1007) {
        toast.success(message);

        // Update localStorage with the new accountData
        localStorage.setItem("accountData", JSON.stringify(editedData));

        // Update the accountData state with the edited data
        setAccountData(editedData);

        // Update userName in AuthContext to reflect the change across the app
        setUserName(`${editedData.firstName} ${editedData.lastName}`);

        setIsEditing(false);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="flex justify-center items-center h-auto mt-40">
      <Card
        title={
          <Title level={3} style={{ textAlign: "center", color: "#1890ff" }}>
            Admin Profile
          </Title>
        }
        bordered={true}
        style={{
          width: 500,
          padding: 20,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Descriptions
          bordered
          column={1}
          size="small"
          labelStyle={{ fontWeight: "bold" }}
          contentStyle={{ padding: "8px 16px" }}
        >
          <Descriptions.Item label="Name">{userName}</Descriptions.Item> {/* Display updated userName */}
          <Descriptions.Item label="Role">{role}</Descriptions.Item>
          <Descriptions.Item label="Email">{accountData.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {isEditing ? (
              <Input
                value={editedData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
            ) : (
              accountData.phoneNumber
            )}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {isEditing ? (
              <Input
                value={editedData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            ) : (
              accountData.firstName
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {isEditing ? (
              <Input
                value={editedData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            ) : (
              accountData.lastName
            )}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <div className="flex justify-end">
          {isEditing && (
            <Button style={{ marginRight: 10 }} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Saving..." : isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
