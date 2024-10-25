import { useState } from 'react';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Link } from 'react-router-dom';
import api from '../../../config/axios';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [countdown, setCountdown] = useState(0); // Countdown state
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button disabled state

    const handleSendEmailForPassword = async (values) => {
        console.log(values);
        try {
            const response = await api.post("authenticate/forgot-password", values);
            const { status, message, data } = response.data;

            if (status === 200) {
                toast.success(data);
                startCountdown(); // Start the countdown when the request is successful
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred, please try again!');
        }
    };

    const startCountdown = () => {
        setCountdown(30); // Set the countdown timer (e.g., 30 seconds)
        setIsButtonDisabled(true);

        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer); // Clear the timer when it reaches zero
                    setIsButtonDisabled(false); // Enable the button again
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000); // Decrease the countdown every second
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center mt-25 px-6 py-9 lg:px-8 bg-hero-pattern relative bg-cover z-0'>
            <div className='absolute bg-black bg-opacity-80 inset-0 '></div>
            <div className='max-w-md mx-auto md:max-w-2xl shadow-xl mt-10'>
                <div className='md:flex'>
                    <div className='relative px-5 sm:mx-auto sm:w-full sm:max-w-sm  bg-[#131313] rounded-2xl py-10 shadow-lg'>
                        <h2 className="mt-5 mb-16 text-center text-3xl font-extrabold leading-9 text-[#bcab6f]">
                            Enter your email here!
                        </h2>
                        <Form labelCol={{ span: 24 }} onFinish={handleSendEmailForPassword}>
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

                            <p className="mt-5 text-center text-sm text-gray-500">
                                Remember your password? {' '}
                                <Link to="/login" className="font-semibold leading-6 text-red-600 hover:text-red-500">
                                    Back to Login here!
                                </Link>
                            </p>

                            <button
                                className='flex w-full justify-center rounded-md bg-[#a9995d] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#bcab6f] focus-visible:outline-2 focus-visible:outline-offset-2'
                                type='submit'
                                disabled={isButtonDisabled}
                            >
                                {isButtonDisabled ? `Try again in ${countdown}s` : 'Send Link'}
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
