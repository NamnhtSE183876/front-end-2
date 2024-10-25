import React, { useState } from "react";
import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import Logo from "../../../assets/logo/PrestigeKoi_White.png";
import Picture from "../../../assets/picture/TwoFish.jpg";
import { useAuth } from "../../protectedRoutes/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

function FormLogin() {
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();
  const { setUserName, setRole, setAccessToken, setRefreshToken } = useAuth();

  const handleLoginGoogle = async (values) => {
    setLoading(true);
    const googleToken = values.credential;
    console.log("Google token: " + googleToken);

    const data = { token: googleToken };

    const handleResponse = async () => {
      try {
        const response = await api.post("authenticate/login-google", data);
        console.log(response.data);

        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const accountData = response.data.data.account;
        localStorage.setItem("accountData", JSON.stringify(accountData));

        setUserName(`${accountData.firstName} ${accountData.lastName}`);
        setRole(accountData.role);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        const { role } = accountData;

        // Navigation based on role
        if (role === "MANAGER") {
          navigate("/admin");
        } else if (role === "MEMBER") {
          navigate("/");
        } else if (role === "BREEDER") {
          navigate("/");
        } else if (role === "STAFF") {
          navigate("/staff");
        }

      } catch (error) {
        if (error.response) {
          // Retry logic: If the token is not valid yet, wait for a second and retry
          setTimeout(() => {
            handleLoginGoogle(values); // Retry login after 1 second
          }, 1000);
        } else {
          toast.error("Login GG was failed!");
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };
    handleResponse();
  };

  const handleLogin = async (values) => {
    setLoading(true); // Start loading
    try {
      const response = await api.post("authenticate/login", values);
      const { message } = response.data;
      const { status } = response.data;
      if (status == 1) {
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const accountData = response.data.data.account;
        localStorage.setItem("accountData", JSON.stringify(accountData));

        setUserName(`${accountData.firstName} ${accountData.lastName}`);
        setRole(accountData.role);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        const { role } = accountData;
        navigate(role === "MANAGER" ? "/admin" : role === "MEMBER" ? "/" : role === "BREEDER" ? "/" : "/staff");
      } else if (status == 2) {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something is wrong, please try again!");
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex min-h-full flex-1 columns-2 justify-center px-6 py-20 lg:px-8 bg-hero-pattern mt-25 bg-cover relative">
      <div className="absolute bg-black bg-opacity-80 inset-0"></div>
      <div className="max-w-md mx-auto md:max-w-2xl shadow-xl mt-10">
        <div className="md:flex">
          <div className="md:shrink-0">
            <img className="h-48 w-full object-cover md:h-full md:w-80 rounded-l-2xl filter brightness-100" src={Picture} alt="Modern building architecture" />
          </div>
          <div className="relative p-8 sm:mx-auto sm:w-full sm:max-w-sm bg-[#131313] py-10 rounded-r-2xl">
            <img src={Logo} alt="Koi69 Logo" className="mx-auto h-10 w-14" />
            <h2 className="mt-5 mb-5 text-center text-3xl font-extrabold leading-9 text-[#bcab6f]">Login in</h2>
            <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
              <FormItem
                label={<label className="block text-sm font-medium leading-6 text-white">Email</label>}
                name="email"
                rules={[{ required: true, message: "Please input your email" }]}
              >
                <Input />
              </FormItem>
              <FormItem
                label={<label className="block text-sm font-medium leading-6 text-white">Password</label>}
                name="password"
                rules={[{ required: true, message: "Please input your password" }]}
              >
                <Input.Password />
              </FormItem>

              <label className="ml-24 text-center text-sm text-gray-500">
                Forgot password? <Link to="/forgotPass" className="font-semibold leading-6 hover:text-[#c1b178] text-[#a99a65]">Click Here!</Link>
              </label>

              <div className="mt-10">
                <button
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${loading ? "bg-red-600" : "bg-red-600 hover:bg-red-700"
                    }`}
                  type="submit"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? "Loading..." : "Login"}
                </button>

                <p className="mt-2 text-center text-sm text-gray-500">
                  Not a member? <Link to="/register" className="font-semibold leading-6 hover:text-yellow-500 text-yellow-600">Register Here!</Link>
                </p>
                <br />
                <div className="flex w-full justify-center px-5 py-1.5 text-sm font-semibold leading-6">
                  <GoogleLogin
                    onSuccess={handleLoginGoogle}
                    onError={() => console.log("Login Failed")}
                    useOneTap
                    disabled={loading} // Disable Google Login button when loading
                  >
                  </GoogleLogin>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-md">
                      <svg
                        className="w-6 h-6 text-yellow-500 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
