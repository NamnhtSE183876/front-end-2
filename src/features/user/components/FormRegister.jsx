import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../config/axios';
import { toast } from 'react-toastify';
import Picture from "../../../assets/picture/OneFish.jpg";
import { useState } from 'react';


function FormRegister() {
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();
    const handleRegister = async (values) => {
        //submit into backend with receive values
        console.log(values);
        try {
            setLoading(true);
            const response = await api.post("authenticate/signup", values);
            console.log(response);
            const { status } = response.data;
            const { message } = response.data;
            console.log(status);
            console.log(message);
            if (status === 200) {
                toast.success(message);
                navigate("/login");
            }
            else if (status != 200)
                toast.error(message);
        } catch (error) {
            console.log(error);
            toast.error("This account has already existed!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-9 lg:px-8 bg-hero-pattern relative bg-cover z-0'>
            <div className='absolute bg-black bg-opacity-80 inset-0 '></div>
            <div className='max-w-md mx-auto md:max-w-2xl shadow-xl mt-16'>
                <div className='md:flex'>
                    <div className="md:shrink-0">
                        <img
                            className="h-48 w-full object-cover md:h-full md:w-80 rounded-l-2xl filter brightness-100"
                            src={Picture}
                            alt="Modern building architecture"
                        />
                    </div>
                    <div className='relative px-5 sm:mx-auto sm:w-full sm:max-w-sm  bg-[#131313] rounded-r-2xl py-10 shadow-lg'>
                        <h2 className="mt-5 mb-5 text-center text-3xl font-extrabold leading-9 text-[#bcab6f]">
                            Create An Account
                        </h2>
                        <Form labelCol={{ span: 24, }} onFinish={handleRegister}>
                            <div className='grid grid-cols-2 gap-x-1.5'>

                                <FormItem
                                    label={<label className='block text-sm font-medium leading-6 text-white'>First Name</label>}
                                    name="firstName"
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name',
                                        },
                                        {
                                            type: 'string',
                                            message: 'Please enter a valid name',
                                        },
                                        {
                                            pattern: /^[A-Za-z]+$/,
                                            message: 'Name must contain only letters',
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>

                                <FormItem
                                    label={<label className='block text-sm font-medium leading-6 text-white'>Last Name</label>}
                                    name="lastName"
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name',
                                        },
                                        {
                                            type: 'string',
                                            message: 'Please enter a valid name',
                                        },
                                        {
                                            pattern: /^[A-Za-z]+$/,
                                            message: 'Name must contain only letters',
                                        },
                                    ]}
                                >
                                    <Input />
                                </FormItem>
                            </div>
                            <FormItem
                                label={<label className='block text-sm font-medium leading-6 text-white'>Phone Number</label>}
                                name="phoneNumber"
                                className='block text-sm font-medium leading-6 text-gray-900'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number',
                                    },
                                    {
                                        pattern: /^[0-9]+$/,
                                        message: 'Phone number must contain only digits',
                                    },
                                    {
                                        pattern: /^0[3|5|7|8|9][0-9]{8}$/,
                                        message: 'Phone number must be a valid Vietnamese number',
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>

                            <FormItem
                                label={<label className='block text-sm font-medium leading-6 text-white'>Email</label>}
                                name="email"
                                className='block text-sm font-medium leading-6 text-gray-900'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Please enter a valid email',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Email cannot contain special characters, except for . or @',
                                    },
                                ]}
                            >
                                <Input />
                            </FormItem>
                            <FormItem
                                label={<label className='block text-sm font-medium leading-6 text-white'>Password</label>}
                                name="password"
                                className='block text-sm font-medium leading-6 text-gray-900'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </FormItem>

                            <Form.Item
                                label={<label className='block text-sm font-medium leading-6 text-white'>Confirm Password</label>}
                                name="confirmPassword"
                                className='block text-sm font-medium leading-6 text-gray-900'
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password'
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <p className="mt-5 text-center text-sm text-gray-500">
                                Already a member? {' '}
                                <Link to="/login" className="font-semibold leading-6 text-red-600 hover:text-red-500">
                                    Login here!
                                </Link>
                            </p>

                            <button
                                className='flex w-full justify-center rounded-md bg-[#bcab6f] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#a9995d] focus-visible:outline-2 focus-visible:outline-offset-2'
                                type='submit'
                                disabled={loading}
                            >
                                Register
                            </button>
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
                        </Form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormRegister