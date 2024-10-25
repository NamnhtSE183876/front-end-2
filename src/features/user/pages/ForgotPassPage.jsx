import React from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ForgotPassword from '../components/ForgotPassword';

function ForgotPassPage() {
    return <div>
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                <ForgotPassword />
            </div>
            <Footer />
        </div>
    </div>;
}

export default ForgotPassPage
