import Footer from "../../../components/Footer";
import FormRegister from "../../../features/user/components/FormRegister";
import Header from "../../../components/Header";

const RegisterPage = () => {
  return <div>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <FormRegister />
      </div>
      <Footer />
    </div>
  </div>;
};

export default RegisterPage;
