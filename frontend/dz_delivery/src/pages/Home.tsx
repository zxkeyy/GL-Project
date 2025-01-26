import { motion } from "framer-motion";
import {
    ArrowForward,
    Speed,
    Security,
    AccessTime,
    EmojiPeople,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import header from "/header.svg";
import driver from "/driver.svg";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#D3EE98] to-[#72BF78]">
            <NavBar />

            <main className="max-w-7xl mx-auto px-6 pb-20">
                <section className="mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="flex justify-center">
                            <img src={header} alt="" width={600} />
                        </div>
                        <h2 className="text-6xl font-bold text-[#333333] mb-6">
                            Delivery at the Speed of{" "}
                            <span className="text-[#72BF78]">Blitz</span>
                        </h2>
                        <p className="text-xl text-[#666666] mb-10 max-w-2xl mx-auto">
                            Experience lightning-fast, secure, and reliable
                            delivery services that revolutionize the way you
                            send and receive packages.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#72BF78] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5DA364] transition-colors flex items-center mx-auto"
                        >
                            Track Your Package
                            <ArrowForward className="ml-2" />
                        </motion.button>
                    </motion.div>
                </section>

                <section className="mb-32">
                    <h3 className="text-4xl font-bold text-center text-[#333333] mb-16">
                        Why Choose Blitz?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: (
                                    <Speed className="text-5xl text-[#72BF78]" />
                                ),
                                title: "Lightning Fast",
                                description:
                                    "Unparalleled speed in package delivery",
                            },
                            {
                                icon: (
                                    <Security className="text-5xl text-[#72BF78]" />
                                ),
                                title: "Secure Handling",
                                description: "Your packages are in safe hands",
                            },
                            {
                                icon: (
                                    <AccessTime className="text-5xl text-[#72BF78]" />
                                ),
                                title: "Real-Time Tracking",
                                description:
                                    "Know where your package is, always",
                            },
                            {
                                icon: (
                                    <EmojiPeople className="text-5xl text-[#72BF78]" />
                                ),
                                title: "Flexible Work",
                                description:
                                    "Join our network of delivery partners",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                {item.icon}
                                <h4 className="text-xl font-semibold mt-4 mb-2 text-[#333333]">
                                    {item.title}
                                </h4>
                                <p className="text-[#666666]">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-32">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 p-12 flex flex-col justify-center">
                                <h3 className="text-4xl font-bold text-[#333333] mb-6">
                                    Become a Blitz Driver
                                </h3>
                                <p className="text-lg text-[#666666] mb-8">
                                    Join our network of professional drivers and
                                    enjoy flexible earning opportunities. Be
                                    your own boss and deliver on your schedule.
                                </p>
                                <Link to="/driver-application">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-[#72BF78] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5DA364] transition-colors self-start"
                                    >
                                        Apply Now
                                    </motion.button>
                                </Link>
                            </div>
                            <div className="md:w-1/2">
                                <img
                                    src={driver}
                                    alt="Blitz Driver App"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-4xl font-bold text-center text-[#333333] mb-16">
                        Our Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Same-Day Delivery",
                                description:
                                    "Get your packages delivered within hours",
                            },
                            {
                                title: "International Shipping",
                                description:
                                    "Send packages worldwide with ease",
                            },
                            {
                                title: "Business Solutions",
                                description:
                                    "Tailored logistics for your company",
                            },
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <h4 className="text-2xl font-semibold mb-4 text-[#333333]">
                                    {service.title}
                                </h4>
                                <p className="text-[#666666] mb-6">
                                    {service.description}
                                </p>
                                <a
                                    href="#"
                                    className="text-[#72BF78] font-semibold hover:underline"
                                >
                                    Learn More
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="bg-[#333333] text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h5 className="text-xl font-semibold mb-4">
                                Blitz
                            </h5>
                            <p className="text-sm text-gray-300">
                                Revolutionizing delivery services with speed and
                                reliability.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-4">
                                Quick Links
                            </h5>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-4">
                                Legal
                            </h5>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-4">
                                Connect
                            </h5>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-300 hover:text-white transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 text-center text-sm text-gray-300">
                        © 2023 Blitz Delivery Services. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
