import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../../config/axios';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';

function ChangePassword() {
    const navigate = useNavigate();
    const location = useLocation();

    // Function to extract query parameters
    const getQueryParams = (param) => {
        return new URLSearchParams(location.search).get(param);
    };

    // Extract the reset_token from the URL
    const reset_token = getQueryParams('reset_token');
    console.log(reset_token);

    useEffect(() => {
        if (!reset_token) {
            toast.error("You do not the right to access this page!");
            navigate("/");
        }
    }, [reset_token, navigate]);


    const handleChangePassword = async (values) => {
        try {
            const responseV1 = await api.post("authenticate/reset-password", null, {
                params: { reset_token }
            });
            const { status } = responseV1.data;
            const { message } = responseV1.data;
            if (status === 200) {
                const responseV2 = await api.post("authenticate/change-password", values, {
                    params: { reset_token }
                });
                const { message } = responseV2.data;
                const { status } = responseV2.data;
                console.log(message);
                if (status === 200) {
                    toast.success(message);
                    navigate("/login");
                } else {
                    toast.error(message);
                    navigate("/");
                }
            }
            else {
                toast.error(message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Undefied Bug, Please Try Again!");
            navigate("/");
        }
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center mt-25 px-6 py-9 lg:px-8 bg-hero-pattern relative bg-cover z-0'>
            <div className='absolute bg-black bg-opacity-80 inset-0 '></div>
            <div className='max-w-md mx-auto md:max-w-2xl shadow-xl mt-10'>
                <div className='md:flex'>
                    <div className='relative px-5 sm:mx-auto sm:w-full sm:max-w-sm  bg-[#131313] rounded-2xl py-10 shadow-lg'>
                        <h2 className="mt-5 mb-16 text-center text-3xl font-extrabold leading-9 text-[#bcab6f]">
                            Enter Your New Password
                        </h2>
                        <Form labelCol={{ span: 24, }} onFinish={handleChangePassword}>

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
                                Somehow you do not want to change your old password anymore? {' '}
                                <Link to="/login" className="font-semibold leading-6 text-red-600 hover:text-red-500">
                                    Back to Login here!
                                </Link>
                            </p>

                            <button className='flex w-full justify-center rounded-md bg-[#a9995d] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#bcab6f] focus-visible:outline-2 focus-visible:outline-offset-2' type='submit'>Change Password</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
