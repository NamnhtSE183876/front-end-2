import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get route params
import api from "../config/axios"; // Import your configured Axios instance
import Header from "../components/Header"; // Import your Header component
import Footer from "../components/Footer"; // Import your Footer component
import { Card } from "antd";

const Payment = () => {
  const { lotId } = useParams(); // Get the lotId from the route
  const [invoice, setInvoice] = useState(null); // State to hold invoice data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Function to fetch invoice data
    const fetchInvoice = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Retrieve access token from local storage
        const response = await api.get(`/invoice/get-specific-invoice`, {
          params: { lotId }, // Pass the lotId as a query parameter
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add Bearer token to headers
          },
        });

        // Check if the response is okay
        if (response.status === 200) {
          setInvoice(response.data.data); // Set the invoice data in state
        } else {
          throw new Error("Failed to fetch invoice");
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setError(error); // Set error in state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchInvoice(); // Call the fetch function
  }, [lotId]); // Dependency array includes lotId

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error fetching invoice: {error.message}</div>;
  }

  // Styles for the invoice
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      marginTop: "20px",
      position: "relative", // Prevent header overlap
      zIndex: 1, // Ensure content is above background elements
    },
    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
    },
    section: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    strong: {
      fontWeight: "bold",
    },
    koiFishImage: {
      maxWidth: "200px",
      marginTop: "10px",
    },
    video: {
      width: "300px",
      marginTop: "10px",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
    linkHover: {
      textDecoration: "underline",
    },
    // Add padding-top to accommodate the header height
    content: {
      paddingTop: "70px", // Adjust this value based on your header height
    },
  };

  // Render invoice details if available
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Include the header component */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Payment for Lot: {lotId}
        </h1>

        {invoice && (
          <div className="flex justify-center space-x-4">
            {" "}
            {/* Space between cards */}
            {/* Invoice Card */}
            <Card
              title="Invoice Details"
              style={{ width: 300 }} // Width of the card
              className="shadow-lg" // Tailwind shadow
            >
              <p>
                <span className="font-semibold">Invoice ID:</span>{" "}
                {invoice.invoiceId}
              </p>
              <p>
                <span className="font-semibold">Final Amount:</span>{" "}
                {invoice.finalAmount}
              </p>
              <p>
                <span className="font-semibold">Invoice Date:</span>{" "}
                {new Date(invoice.invoiceDate).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Tax:</span> {invoice.tax}
              </p>
              <p>
                <span className="font-semibold">Due Date:</span>{" "}
                {new Date(invoice.dueDate).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Subtotal:</span>{" "}
                {invoice.subTotal}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {invoice.status}
              </p>
              <p>
                <span className="font-semibold">Payment Link:</span>{" "}
                <a
                  href={invoice.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Click here to pay
                </a>
              </p>
            </Card>
            {/* Koi Fish Card */}
            {invoice.koiFish && (
              <Card
                title="Koi Fish Details"
                style={{ width: 300 }} // Set the card width
                className="shadow-lg flex flex-col" // Use flex column for vertical stacking
              >
                <p>
                  <span className="font-semibold">Fish ID:</span>{" "}
                  {invoice.koiFish.fishId}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {invoice.koiFish.gender}
                </p>
                <p>
                  <span className="font-semibold">Age:</span>{" "}
                  {invoice.koiFish.age}
                </p>
                <p>
                  <span className="font-semibold">Size:</span>{" "}
                  {invoice.koiFish.size}
                </p>
                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  {invoice.koiFish.price}
                </p>
                <p>
                  <span className="font-semibold">Variety Name:</span>{" "}
                  {invoice.koiFish.varietyName}
                </p>
                <p>
                  <span className="font-semibold">Breeder Name:</span>{" "}
                  {invoice.koiFish.breederName}
                </p>

                <div className="flex space-x-4 mt-4">
                  {/* Space between image and video */}
                  {invoice.koiFish.imageUrl && (
                    <div className="flex-1 flex flex-col items-center">
                      <strong>Image:</strong>
                      <br />
                      <img
                        src={invoice.koiFish.imageUrl}
                        alt="Koi Fish"
                        className="max-w-full h-auto object-cover" // Maintain aspect ratio
                        style={{ maxHeight: "200px", width: "auto" }} // Set a max height
                      />
                    </div>
                  )}
                  {invoice.koiFish.videoUrl && (
                    <div className="flex-1 flex flex-col items-center">
                      <strong>Video:</strong>
                      <br />
                      <div
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <video
                          controls
                          className="w-full h-full object-cover" // Full width, full height
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }} // Use cover to fill the container
                        >
                          <source
                            src={invoice.koiFish.videoUrl}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
      <Footer /> {/* Include the footer component */}
    </div>
  );
};

export default Payment;
