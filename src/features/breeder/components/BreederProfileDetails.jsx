import { useState, useEffect } from "react";
import { Card, Descriptions, Typography, Divider, Button, Input, Select } from "antd";
import { useAuth } from "../../protectedRoutes/AuthContext";
import api from "../../../config/axios";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Option } = Select;

const BreederProfileDetails = () => {
    const { userName, setUserName } = useAuth();
    const [accountData, setAccountData] = useState(
        JSON.parse(localStorage.getItem("accountData")) || {}
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(accountData);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("accessToken");

    // Fetch breederName and location from API
    useEffect(() => {
        const fetchBreederInfo = async () => {
            try {
                const response = await api.get("/breeder/get-breeder-information", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { data } = response.data;
                setAccountData((prevData) => ({
                    ...prevData,
                    breederName: data.breederName,
                    location: data.location,
                }));
                setEditedData((prevData) => ({
                    ...prevData,
                    breederName: data.breederName,
                    location: data.location,
                }));
            } catch (error) {
                console.error("Error fetching breeder information:", error);
            }
        };

        fetchBreederInfo();
    }, [token]);

    const handleInputChange = (field, value) => {
        setEditedData({ ...editedData, [field]: value });
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await api.post(
                "/authenticate/update-breeder-profile",
                editedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const { status } = response.data;
            const { message } = response.data;
            console.log(status);
            if (status === 1006) {
                toast.success(message);
                localStorage.setItem("accountData", JSON.stringify(editedData));
                setAccountData(editedData);
                setUserName(`${editedData.firstName} ${editedData.lastName}`);
                setIsEditing(false);
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-auto py-8">
            <Card
                title={<Title level={3} style={{ textAlign: "center", color: "#bcab6f" }}>Breeder Profile</Title>}
                bordered={false}
                style={{
                    maxWidth: 600,
                    width: "100%",
                    backgroundColor: "#1f1f1f",
                    color: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    borderRadius: "10px"
                }}
            >
                <Descriptions bordered column={1} size="small" style={{ backgroundColor: "#2b2b2b" }}>
                    <Descriptions.Item label={<span style={{ color: "#999" }}>Name</span>}>
                        <span style={{ color: "#ffffff" }}>{userName}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color: "#999" }}>Email</span>}>
                        <span style={{ color: "#ffffff" }}>{accountData.email}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color: "#999" }}>Phone Number</span>}>
                        {isEditing ? (
                            <Input
                                value={editedData.phoneNumber}
                                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                            />
                        ) : (
                            <span style={{ color: "#ffffff" }}>{accountData.phoneNumber}</span>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color: "#999" }}>First Name</span>}>
                        {isEditing ? (
                            <Input
                                value={editedData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                            />
                        ) : (
                            <span style={{ color: "#ffffff" }}>{accountData.firstName}</span>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color: "#999" }}>Last Name</span>}>
                        {isEditing ? (
                            <Input
                                value={editedData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                            />
                        ) : (
                            <span style={{ color: "#ffffff" }}>{accountData.lastName}</span>
                        )}
                    </Descriptions.Item>
                    {/* New fields for breederName and location */}
                    <Descriptions.Item label={<span style={{ color: "#999" }}>Breeder Name</span>}>
                        {isEditing ? (
                            <Select
                                value={editedData.breederName}
                                onChange={(value) => handleInputChange("breederName", value)}
                                style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555", width: "100%" }}
                            >
                                <Option value="">Select a breeder</Option>
                                <Option value="Marushin">Marushin</Option>
                                <Option value="NND">NND</Option>
                                <Option value="Saki">Saki</Option>
                                <Option value="Torazo">Torazo</Option>
                                <Option value="Shinoda">Shinoda</Option>
                                <Option value="Maruhiro">Maruhiro</Option>
                                <Option value="Kanno">Kanno</Option>
                                <Option value="Izumiya">Izumiya</Option>
                                <Option value="Isa">Isa</Option>
                                <Option value="Dainichi">Dainichi</Option>
                            </Select>
                        ) : (
                            <span style={{ color: "#ffffff" }}>{accountData.breederName}</span>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label={<span style={{ color: "#999" }}>Location</span>}>
                        {isEditing ? (
                            <Input
                                value={editedData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                style={{ backgroundColor: "#333", color: "#fff", borderColor: "#555" }}
                            />
                        ) : (
                            <span style={{ color: "#ffffff" }}>{accountData.location}</span>
                        )}
                    </Descriptions.Item>
                </Descriptions>
                <Divider style={{ borderColor: "#555" }} />
                <div className="flex justify-end">
                    {isEditing && (
                        <Button
                            style={{ marginRight: 10, backgroundColor: "#bcab6f", borderColor: "#ff4d4f", color: "#fff" }}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="primary"
                        style={{ backgroundColor: "#bcab6f", borderColor: "#52c41a", color: "#fff" }}
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : isEditing ? "Save" : "Edit"}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default BreederProfileDetails;
