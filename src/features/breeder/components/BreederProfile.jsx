import { NavLink, Outlet } from "react-router-dom"; // Use NavLink for active state styling
import { useAuth } from "../../protectedRoutes/AuthContext";

function BreederProfile() {
    const { userName, breederName } = useAuth();



    const breederLogos = {
        Dainichi: "/src/assets/logo/dainichi-logo.png",
        Isa: "/src/assets/logo/isa-logo.png",
        Izumiya: "/src/assets/logo/izumiya-logo.png",
        Kanno: "/src/assets/logo/kanno-logo.png",
        Koi69: "/src/assets/logo/koi69Logo_dark.png",
        Maruhiro: "/src/assets/logo/maruhiro-logo.png",
        Marushin: "/src/assets/logo/marushin-logo.png",
        NND: "/src/assets/logo/nnd-logo.png",
        PrestigeKoiBlack: "/src/assets/logo/PrestigeKoi_Black.png",
        PrestigeKoiWhite: "/src/assets/logo/PrestigeKoi_White.png",
        Sakai: "/src/assets/logo/sakai-logo.png",
        Shinoda: "/src/assets/logo/shinoda-logo.png",
        Torazo: "/src/assets/logo/torazo-logo.png",
    };



    const profileLogo = breederLogos[breederName] || "/src/assets/logo/torazo-logo.png";

    return (
        <div className="bg-black w-full relative">
            {/* Profile Header Section */}
            <section className="relative h-52 bg-hero-pattern bg-cover flex justify-center items-center mt-20">
                {/* Overlay */}
                <div className="absolute bg-black bg-opacity-70 inset-0"></div>
                {/* Profile Info */}
                <div className="relative z-10 text-center text-white flex flex-col items-center mt-10">
                    {/* Profile Picture */}
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-500 overflow-hidden">
                        <img
                            src={profileLogo}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* User Info */}
                    <h2 className="mt-2 text-lg">{userName}</h2>
                    <p className="text-sm text-gray-400">From {breederName}</p>
                </div>
            </section>

            {/* Navigation Section */}
            <section className="bg-gray-900 text-white py-3">
                <div className="container mx-auto flex justify-center space-x-4">
                    <NavLink
                        to="/breeder/profile/details"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2"
                                : "flex items-center space-x-2 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-full"
                        }
                    >
                        PROFILE DETAILS
                    </NavLink>
                    <NavLink
                        to="/breeder/profile/view-request"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2"
                                : "flex items-center space-x-2 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-full"
                        }
                    >
                        REQUEST LIST
                    </NavLink>
                    <NavLink
                        to="/breeder/profile/bids"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2"
                                : "flex items-center space-x-2 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-full"
                        }
                    >
                        BIDS
                    </NavLink>
                    <NavLink
                        to="/breeder/profile/achievements"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2"
                                : "flex items-center space-x-2 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-full"
                        }
                    >
                        ACHIEVEMENTS
                    </NavLink>
                    <NavLink
                        to="/breeder/profile/transactions"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2"
                                : "flex items-center space-x-2 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-full"
                        }
                    >
                        TRANSACTIONS
                    </NavLink>
                    <NavLink
                        to="/breeder/profile/reputation"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-2 bg-yellow-500 text-black rounded-full px-4 py-2"
                                : "flex items-center space-x-2 px-4 py-2 hover:bg-yellow-500 hover:text-black rounded-full"
                        }
                    >
                        REPUTATION
                    </NavLink>
                </div>
            </section>

            {/* Dynamic Content */}
            <section className="p-6">
                <div className="container mx-auto">
                    <Outlet /> {/* Dynamic content will load here */}
                </div>
            </section>
        </div>
    );
}

export default BreederProfile;
