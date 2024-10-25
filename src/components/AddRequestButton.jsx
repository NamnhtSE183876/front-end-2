import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AddRequestButton = () => {
    return (
        <div className="flex flex-col items-center"> {/* Centering the content vertically */}
            {/* Wrap the button with the Link tag to navigate to a desired page */}
            <Link to="/breeder/add-request">
                {/* Circle button with icon */}
                <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    <PlusOutlined className="text-2xl" />
                </button>
            </Link>

            {/* Text below the button */}
            <p className="mt-2 text-orange-600 font-extrabold text-sm tracking-wide text-center"> {/* Added text-center for centering */}
                ADD REQUEST
            </p>
        </div>
    );
};

export default AddRequestButton;
