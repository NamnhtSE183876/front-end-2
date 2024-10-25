import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles

const CreateStaff = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const accessToken = localStorage.getItem("accessToken"); // Get the access token

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/manager/createStaff",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
        }
      );
      const { status } = response.data;
      const { message } = response.data;
      if (status === 8) {
        toast.success(message);
      } else toast.error("This staff have already exited!");
    } catch (error) {
      toast.error(
        "Error creating staff: " +
        (error.response?.data?.message || error.message)
      ); // Show error toast
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePhoneNumber = (value) => {
    const phonePattern = /^[0-9]{10}$/; // Adjust pattern as needed for your requirements
    if (!phonePattern.test(value)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");
    }
  };

  const validateName = (value, fieldName) => {
    const namePattern = /^[a-zA-Z]+$/;
    if (!namePattern.test(value)) {
      fieldName === "firstName"
        ? setFirstNameError("Please enter a valid first name.")
        : setLastNameError("Please enter a valid last name.");
    } else {
      fieldName === "firstName" ? setFirstNameError("") : setLastNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    validateName(value, "firstName");
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    validateName(value, "lastName");
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Staff</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

        </div>
        <div className='grid grid-cols-2 gap-x-1.5'>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1 text-sm font-medium">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1 text-sm font-medium">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block mb-1 text-sm font-medium"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneChange}
            required
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
        >
          Create Staff
        </button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default CreateStaff;
