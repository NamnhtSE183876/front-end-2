import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
  FormOutlined,
  CarOutlined,
  AuditOutlined,
  EyeOutlined, // For viewing auctions
  PlusOutlined, // For creating auctions
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <HomeOutlined />),
  getItem("Profile", "2", <UserOutlined />),
  getItem("Manage Request", "3", <FormOutlined />),
  getItem("Manage Auction", "sub1", <AuditOutlined />, [
    getItem("View Auction", "4", <EyeOutlined />),
    getItem("Create Auction", "5", <PlusOutlined />),
  ]),
  getItem("Manage Transport", "6", <CarOutlined />),
  getItem("View Transaction", "7", <FileOutlined />),
  getItem("Create Breeder", "8", <PlusOutlined />),
  getItem("Create Staff", "9", <PlusOutlined />),
  // Add a new item for the collapse/expand button
  getItem("Toggle Menu", "toggle", <MenuFoldOutlined />),
];

const SidebarAdmin = ({ setActiveComponent }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {
    // Check if the collapse/expand button was clicked
    if (e.key === "toggle") {
      setCollapsed(!collapsed);
      return;
    }

    // Use e.key to determine which item was clicked
    switch (e.key) {
      case "1":
        setActiveComponent("Dashboard");
        break;
      case "2":
        setActiveComponent("Profile");
        break;
      case "3":
        setActiveComponent("Manage Request");
        break;
      case "4":
        setActiveComponent("View Auction");
        break;
      case "5":
        setActiveComponent("Create Auction");
        break;
      case "6":
        setActiveComponent("Manage Transport");
        break;
      case "7":
        setActiveComponent("View Transaction");
        break;
      case "8":
        setActiveComponent("Create Breeder");
        break;
      case "9":
        setActiveComponent("Create Staff");
        break;
      default:
        setActiveComponent("Dashboard");
    }
  };

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="bg-black flex flex-col" // Use h-screen to ensure the height remains consistent
    >
      <div className="flex justify-center items-center flex-col my-20">
        {!collapsed && <p className="text-white mt-16 font-bold">Admin Dashboard</p>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items.map(item =>
          item.key === "toggle"
            ? { ...item, icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
            : item
        )}
        className="bg-[#c74743] text-white flex-grow"
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default SidebarAdmin;
