import React from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ChangePassword from '../components/ChangePassword';

function ChangePassPage() {
    return <div>
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                <ChangePassword />
            </div>
            <Footer />
        </div>
    </div>;
}

export default ChangePassPage
