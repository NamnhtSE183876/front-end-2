import { useState } from "react";
import { Form, InputNumber, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../../config/axios"; // Assuming Axios instance is set up properly
import uploadFile from "../../../utils/file"; // Firebase file upload utility

const AddBreederRequest = ({ onBack }) => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const storedData = localStorage.getItem('accountData');
  const accountData = storedData ? JSON.parse(storedData) : {};
  const accountId = accountData.accountId || null;

  // Check if accountId exists
  if (!accountId) {
    message.error("Account information is missing.");
    return null; // Prevent component rendering if account data is not available
  }

  // Handles the form submission
  const handleSubmitFish = async (values) => {
    try {
      setLoading(true);

      // Prepare request payload
      const media = {};
      if (imageList.length) media.imageUrl = imageList[0].url;
      if (videoList.length) media.videoUrl = videoList[0].url;

      const payload = {
        accountId,
        koiFish: {
          varietyName: values.varietyName,
          gender: values.gender,
          age: values.age,
          size: values.size,
          price: values.price,
          auctionTypeName: values.auctionTypeName,
          media,
        },
      };

      console.log("Submitting payload:", payload);

      // Send POST request to API
      const token = localStorage.getItem("accessToken");
      const response = await api.post("/breeder/request/addRequest", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API response:", response);
      message.success("Breeder request submitted successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit breeder request. Please try again.";
      message.error(errorMessage);
      console.error("Error in submitting request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async ({ fileList }) => {
    try {
      if (fileList.length) {
        const uploadFileObj = fileList[fileList.length - 1].originFileObj || fileList[fileList.length - 1];
        const imageUrl = await uploadFile(uploadFileObj);

        setImageList([{ ...fileList[fileList.length - 1], url: imageUrl }]);

        form.setFields([{ name: "imageUrl", errors: [] }]);
      } else {
        setImageList([]);
      }
    } catch (error) {
      message.error("Failed to upload image");
      console.error("Image upload error:", error);
    }
  };

  const handleVideoChange = async ({ fileList }) => {
    try {
      if (fileList.length) {
        const uploadFileObj = fileList[fileList.length - 1].originFileObj || fileList[fileList.length - 1];
        const videoUrl = await uploadFile(uploadFileObj);

        setVideoList([{ ...fileList[fileList.length - 1], url: videoUrl }]);

        form.setFields([{ name: "videoUrl", errors: [] }]);
      } else {
        setVideoList([]);
      }
    } catch (error) {
      message.error("Failed to upload video");
      console.error("Video upload error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 columns-2 justify-center px-6 py-20 lg:px-8 bg-hero-pattern mt-25 bg-cover relative">
      <div className="absolute bg-black bg-opacity-80 inset-0"></div>
      <div className="bg-[#131313] my-10 max-w-md mx-auto md:max-w-2xl shadow-xl mt-10 rounded-2xl p-6 relative">
        <div className="flex items-center justify-center space-x-4">
          <span>
            <img
              src="\src\assets\Divider\diamondLeft.png"
              alt="Left Divider"
              className="w-auto transform scale-x-[-1]"
            />
          </span>
          <h1 className="text-center text-[#bcab6f] font-bold my-6 text-3xl">
            REQUEST
          </h1>
          <span>
            <img
              src="\src\assets\Divider\diamondRight.png"
              alt="Right Divider"
              className="w-auto"
            />
          </span>
        </div>

        <Form onFinish={handleSubmitFish} form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-2">
            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Variety Name</label>}
              name="varietyName"
              rules={[{ required: true, message: "Please choose variety name" }]}
            >
              <Select>
                <Select.Option value="Kohaku">Kohaku</Select.Option>
                <Select.Option value="Sanke">Sanke</Select.Option>
                <Select.Option value="Showa">Showa</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Age</label>}
              name="age"
              rules={[{ required: true, message: "Please enter age of fish" }]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Gender</label>}
              name="gender"
              rules={[{ required: true, message: "Please choose gender of fish" }]}
            >
              <Select>
                <Select.Option value="MALE">Male</Select.Option>
                <Select.Option value="FEMALE">Female</Select.Option>
                <Select.Option value="UNKNOWN">Unknown</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Size (cm)</label>}
              name="size"
              rules={[{ required: true, message: "Please enter size of fish" }]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Price ($)</label>}
              name="price"
              rules={[{ required: true, message: "Please enter price of fish" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Auction Type</label>}
              name="auctionTypeName"
              rules={[{ required: true, message: "Please select auction type" }]}
            >
              <Select>
                <Select.Option value="FIXED_PRICE_SALE">Fixed Price Sale</Select.Option>
                <Select.Option value="SEALED_BID">Sealed Bid</Select.Option>
                <Select.Option value="ASCENDING_BID">Ascending Bid</Select.Option>
                <Select.Option value="DESCENDING_BID">Descending Bid</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Image</label>}
              name="imageUrl"
              rules={[
                {
                  validator: () =>
                    imageList.length
                      ? Promise.resolve()
                      : Promise.reject("Please upload at least one image"),
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={imageList}
                onChange={handleImageChange}
                accept="image/*"
                beforeUpload={() => false}
              >
                {imageList.length < 1 && (
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label={<label className="block text-sm font-medium leading-6 text-white">Video</label>}
              name="videoUrl"
              rules={[
                {
                  validator: () =>
                    videoList.length
                      ? Promise.resolve()
                      : Promise.reject("Please upload a video"),
                },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={videoList}
                onChange={handleVideoChange}
                accept="video/*"
                beforeUpload={() => false}
              >
                {videoList.length < 1 && (
                  <Button icon={<UploadOutlined />}>Upload Video</Button>
                )}
              </Upload>
            </Form.Item>
          </div>

          <div className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-2xl bg-[#bcab6f] px-3 py-3 text-sm font-extrabold leading-6 text-black shadow-sm hover:bg-[#a9995d] focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Submit Request
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBreederRequest;
