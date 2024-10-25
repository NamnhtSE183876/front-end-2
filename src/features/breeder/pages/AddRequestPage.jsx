import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import AddBreederRequest from "../components/AddBreederRequest";

const AddRequestPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                <AddBreederRequest />
            </div>
            <Footer />
        </div>
    );
};

export default AddRequestPage;