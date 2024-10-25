import Header from '../../../components/Header';
import Test from '../../../components/Test';
import Footer from '../../../components/Footer';

function MemberPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                <Test />
            </div>
            <Footer />
        </div>
    );
}

export default MemberPage
