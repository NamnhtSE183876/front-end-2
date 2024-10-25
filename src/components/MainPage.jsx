import { Link } from 'react-router-dom';
import { useAuth } from '../features/protectedRoutes/AuthContext';

function MainPage() {
    const { userName } = useAuth();


    return (
        <div className="flex-auto bg-[#131313]">
            {/* Hero-section */}
            <section className="flex flex-col bg-hero-pattern bg-cover w-full mt-20">
                <div className="max-w-xl text-center lg:text-left px-8 lg:px-20 py-10 lg:py-20 bg-gradient-to-l from-transparent via-[rgba(10,10,12,0.4)] to-[#0a0a0c] drop-shadow-2xl">
                    <h1 className="text-2xl font-semibold font-mono text-amber-400 text-shadow-2xl">Prestige KoiAuction</h1>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white">We Are The Best Consulting Agency</h2>
                    <button className="bg-red-600 hover:bg-red-500 rounded-full py-3 px-4 md:py-4 md:px-5 font-bold mt-6">
                        <Link to="/auction">View Auction</Link>
                    </button>
                </div>
            </section>


            {/* Introduction Section */}
            <section className="text-center py-10 lg:py-20">
                <img src="/src/assets/Divider/t1HeaderDivider.png" alt="Divider" className="block w-full" />
                <h3 className="text-2xl lg:text-3xl font-bold text-[#bcab6f] mt-2">Our Main Goals</h3>
                <p className="max-w-2xl mx-auto text-gray-50 mt-4 px-4">
                    At <span className="text-yellow-500 font-bold">Prestige KoiAuction</span>, our mission is to revolutionize the online auction experience by providing a transparent, user-friendly platform for buyers and sellers alike.
                </p>
            </section>


            {userName ? (
                // Call to Action Section
                <section className="relative bg-section-pattern bg-cover text-center flex flex-col lg:flex-row items-center justify-center py-6 z-0">
                    {/* Dark overlay (placed under the content) */}
                    <div className='absolute bg-black bg-opacity-70 inset-0 z-10'></div>

                    {/* Visible heading */}
                    <h4 className="relative text-3xl font-extrabold text-[#bcab6f] py-6 z-20">
                        Thank You For Trusting Us!
                    </h4>

                    {/* Register button */}
                    <Link to="/auction" className="relative z-10 font-bold text-2xl bg-amber-500 hover:bg-amber-400 rounded-full px-20 py-3 lg:ml-10 lg:py-5">
                        View Auction Now!
                    </Link>
                </section>
            ) : (
                // Call to Action Section
                <section className="relative bg-section-pattern bg-cover text-center flex flex-col lg:flex-row items-center justify-center py-6 z-0">
                    {/* Dark overlay (placed under the content) */}
                    <div className='absolute bg-black bg-opacity-70 inset-0 z-0'></div>

                    {/* Visible heading */}
                    <h4 className="relative text-3xl font-extrabold text-[#bcab6f] py-6 z-10">
                        Want To Dive Into The World Of Koi?
                    </h4>

                    {/* Register button */}
                    <Link to="/register" className="relative z-10 font-bold text-2xl bg-amber-500 hover:bg-amber-400 rounded-full px-20 py-3 lg:ml-10 lg:py-5">
                        Register!
                    </Link>
                </section>
            )}

            {/* Breeder Section */}
            <section className="text-center py-10 lg:py-20">
                <h5 className="text-3xl font-bold text-[#bcab6f]">Breeders Participated</h5>
                <p className="max-w-2xl mx-auto text-gray-50 mt-4 mb-10">
                    Your direct connection to the top Japanese koi breeders
                </p>
                <div className="gap-2 w-full mb-10 z-20 sm:flex flex-wrap justify-center">
                    {/* Breeder Cards */}
                    {[
                        { name: "Marushin", logo: "marushin-logo.png" },
                        { name: "NND", logo: "nnd-logo.png" },
                        { name: "Saki", logo: "sakai-logo.png" },
                        { name: "Torazo", logo: "torazo-logo.png" },
                        { name: "Shinoda", logo: "shinoda-logo.png" },
                        { name: "Maruhiro", logo: "maruhiro-logo.png" },
                        { name: "Kanno", logo: "kanno-logo.png" },
                        { name: "Izumiya", logo: "izumiya-logo.png" },
                        { name: "Isa", logo: "isa-logo.png" },
                        { name: "Dainichi", logo: "dainichi-logo.png" },
                    ].map((breeder) => (
                        <div key={breeder.name} className="aspect-square sm:w-48 p-4 flex flex-col items-center justify-around bg-amber-500 rounded-xl hover:bg-amber-400">
                            <img className="object-contain max-h-[60%] max-w-[80%] h-full dark:saturate-0 invert-0 dark:invert" src={`/src/assets/logo/${breeder.logo}`} alt={`${breeder.name} Logo`} />
                            <span className="font-semibold">{breeder.name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default MainPage;
