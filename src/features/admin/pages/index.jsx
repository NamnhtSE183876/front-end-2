import Header from "../../../components/Header.jsx";
import Footer from "../../../components/Footer.jsx";
import SidebarAdmin from "../../../components/SidebarAdmin.jsx";
import ManageAuction from "../components/ManageAuction.jsx";
import ManageRequest from "../components/ManageRequest.jsx";
import CreateAuction from "../components/CreateAuction.jsx";
import CreateBreeder from "../components/CreateBreeder.jsx";
import CreateStaff from "../components/CreateStaff.jsx";
import UserProfile from "../components/UserProfile.jsx";
import { useState } from "react";

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    console.log(activeComponent);
    switch (activeComponent) {
      case "View Auction":
        return <ManageAuction />;
      case "Manage Request":
        return <ManageRequest />;
      case "Create Auction":
        return <CreateAuction />;
      case "Create Breeder":
        return <CreateBreeder />;
      case "Create Staff":
        return <CreateStaff />;
      case "Profile":
        return <UserProfile />;
      default:
        return <div>Welcome to the Admin Dashboard!</div>; // Default content
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <SidebarAdmin setActiveComponent={setActiveComponent} />
        <div className="flex-grow p-4">
          {renderComponent()} {/* Render the appropriate component */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
