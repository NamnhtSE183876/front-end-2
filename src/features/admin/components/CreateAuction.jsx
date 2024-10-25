import React, { useState, useEffect } from "react";
import axios from "axios";
import { Steps, Button, message, Form, DatePicker, Select, Table } from "antd";
import dayjs from "dayjs";
import api from "../../../config/axios";

const { Step } = Steps;
const token = localStorage.getItem("accessToken");
const CreateAuction = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [auction, setAuction] = useState({
    auctionTypeName: null,
    startTime: null,
    endTime: null,
    lots: [],
  });
  const [lots, setLots] = useState([]);

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        if (current === 0) {
          setAuction((prevAuction) => ({
            ...prevAuction,
            auctionTypeName: values.auctionType,
            startTime: values.startTime
              ? dayjs(values.startTime).format("YYYY-MM-DDTHH:mm:ss")
              : null,
            endTime: values.endTime
              ? dayjs(values.endTime).format("YYYY-MM-DDTHH:mm:ss")
              : null,
          }));
        }
        setCurrent(current + 1);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async () => {
    if (lots.length === 0) {
      message.error("Please add at least one lot before submitting!");
      return;
    }

    const auctionData = {
      auctionTypeName: auction.auctionTypeName,
      startTime: auction.startTime,
      endTime: auction.endTime,
      lots: lots.map((lot) => ({
        fishId: lot.fishId,
      })),
    };

    console.log("Auction Data to Submit:", auctionData);

    try {
      const response = await api.post("/manager/createAuction", auctionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if response has a custom status code
      if (response.data && response.data.status === 200) {
        console.log("API Response:", response.data); // Log the API response
        message.success("Auction created successfully!");
        form.resetFields();
        setCurrent(0);
        setLots([]);
      } else {
        // Handle custom status codes here
        if (response.data && response.data.message) {
          message.error(response.data.message);
        } else {
          message.error("Unexpected response from server");
        }
      }
    } catch (error) {
      console.error("Failed to create auction", error);

      // Handle overlapping auction times or other errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to create auction");
      }
    }
  };

  const steps = [
    {
      title: "Create Auction",
      content: (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please select start time!" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              defaultValue={dayjs()}
              className="w-full border border-gold rounded-md"
            />
          </Form.Item>
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[
              { required: true, message: "Please select end time!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startTime = getFieldValue("startTime");
                  if (!value || !startTime || dayjs(value).isAfter(startTime)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("End time must be later than start time!")
                  );
                },
              }),
            ]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              className="w-full border border-gold rounded-md"
            />
          </Form.Item>
          <Form.Item
            label="Auction Type"
            name="auctionType"
            rules={[{ required: true, message: "Please select auction type!" }]}
          >
            <Select
              placeholder="Select Auction Type"
              className="w-full border border-gold rounded-md"
            >
              <Select.Option value="FIXED_PRICE_SALE">
                Type 1 - Fixed Price Sale
              </Select.Option>
              <Select.Option value="SEALED_BID">
                Type 2 - Sealed Auction
              </Select.Option>
              <Select.Option value="ASCENDING_BID">
                Type 3 - Ascending Bid Auction
              </Select.Option>
              <Select.Option value="DESCENDING_BID">
                Type 4 - Descending Price Auction
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Add Lots",
      content: (
        <AddLots
          setLots={setLots}
          auctionTypeName={auction.auctionTypeName}
          startTime={auction.startTime}
          endTime={auction.endTime}
          lots={lots}
        />
      ),
    },
    {
      title: "Confirm",
      content: (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg font-bold mb-4">
            Please review all the information before finalizing the auction.
          </p>
          <h2 className="font-semibold">Auction Details:</h2>
          <p>Type: {auction.auctionTypeName}</p>
          <p>
            Start Time: {dayjs(auction.startTime).format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <p>
            End Time: {dayjs(auction.endTime).format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <h2 className="font-semibold mt-4">Lots:</h2>
          <ul className="list-disc pl-5">
            {lots.map((lot, index) => (
              <li key={index} className="mb-2">
                Fish ID: {lot.fishId}, Starting Price: {lot.startingPrice} (vnd)
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white  flex flex-col items-center pt-28">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border-2">
        <Steps current={current} className="mb-8" direction="horizontal">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
          {steps[current].content}
        </div>
        <div className="flex justify-between">
          <Button
            type="primary"
            onClick={prev}
            disabled={current === 0}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Previous
          </Button>
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleNext}
              className="bg-gold hover:bg-yellow-600 text-black"
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={onFinish}
              className="bg-gold hover:bg-yellow-600 text-black"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// AddLots Component for Step 2
const AddLots = ({ setLots, auctionTypeName, lots }) => {
  const [fishData, setFishData] = useState([]);

  useEffect(() => {
    const fetchFishData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/manager/get-fish-auction",
          { auctionTypeName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setFishData(response.data.data);
      } catch (err) {
        console.error("Error fetching fish data", err);
      }
    };

    if (auctionTypeName) {
      fetchFishData();
    }
  }, [auctionTypeName]);

  const handleAddRemoveLot = (fish) => {
    const existingIndex = lots.findIndex((lot) => lot.fishId === fish.fishId);
    if (existingIndex === -1) {
      const newLot = {
        fishId: fish.fishId,
        startingPrice: fish.price, // Make sure fish.price is set
      };
      setLots((prev) => [...prev, newLot]);
      message.success("Lot added successfully!");
    } else {
      setLots((prev) => prev.filter((lot) => lot.fishId !== fish.fishId));
      message.success("Lot removed successfully!");
    }
  };

  return (
    <>
      {fishData.length === 0 ? (
        <p className="text-red-500">No fishes match auction type</p>
      ) : (
        <Table
          dataSource={fishData}
          rowKey="fishId"
          pagination={false}
          columns={[
            {
              title: "Variety",
              dataIndex: "variety",
              key: "variety",
              render: (variety) => <span>{variety.varietyName}</span>,
            },
            {
              title: "Starting Price",
              dataIndex: "price",
              key: "price",
              render: (price) => <span>{price} (vnd)</span>,
            },
            {
              title: "Action",
              key: "action",
              render: (text, record) => (
                <Button
                  type="primary"
                  onClick={() => handleAddRemoveLot(record)}
                  className={`${lots.some((lot) => lot.fishId === record.fishId)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gold hover:bg-yellow-600"
                    } text-white`}
                >
                  {lots.some((lot) => lot.fishId === record.fishId)
                    ? "Remove Lot"
                    : "Add Lot"}
                </Button>
              ),
            },
          ]}
        />
      )}
    </>
  );
};

export default CreateAuction;
