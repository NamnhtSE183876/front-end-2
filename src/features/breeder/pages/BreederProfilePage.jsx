import React from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BreederProfile from '../components/BreederProfile';

function BreederProfilePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                <BreederProfile />
            </div>
            <Footer />
        </div>
    );
}

export default BreederProfilePage
