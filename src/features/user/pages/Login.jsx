import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import FormLogin from "../../../features/user/components/FormLogin";


const LoginPage = () => {
  return <div>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <FormLogin />
      </div>
      <Footer />
    </div>
  </div>;
};

export default LoginPage;
