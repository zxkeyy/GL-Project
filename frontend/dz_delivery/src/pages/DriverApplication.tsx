import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import logoBLack from "/logo-black.svg";
import qr from "/qr.svg";
import { Link } from "react-router-dom";

const DriverApplication = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#D3EE98] to-[#72BF78]">
            <nav className="p-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/">
                        <div>
                            <img src={logoBLack} alt="Blitz" className="h-8" />
                        </div>
                    </Link>
                    <div className="space-x-6">
                        <a
                            href="#"
                            className="text-[#333333] hover:text-[#72BF78] transition-colors"
                        >
                            Services
                        </a>
                        <a
                            href="#"
                            className="text-[#333333] hover:text-[#72BF78] transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-[#333333] hover:text-[#72BF78] transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold text-[#333333] mb-8">
                        Become a{" "}
                        <span className="text-[#72BF78]">Blitz Driver</span>
                    </h1>
                    <p className="text-xl text-[#666666] mb-12 max-w-2xl mx-auto">
                        Join our network of professional drivers and start
                        earning flexibly. Scan the QR using{" "}
                        <span className="font-extrabold text-black">
                            Expo Go
                        </span>{" "}
                        code below to get started with our mobile app.
                    </p>
                </motion.div>

                <div className="flex flex-col items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-lg shadow-lg mb-8"
                    >
                        <img src={qr} alt="QR Code" className="w-64 h-64" />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg font-semibold text-[#333333] mb-4"
                    >
                        Scan this QR code with the{" "}
                        <span className="font-extrabold text-black text-[22px]">
                            Expo Go
                        </span>{" "}
                        application on your phone
                    </motion.p>
                    <motion.a
                        href="https://expo.dev/client"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-[rgb(114,191,120)] bg-white px-2 py-2 rounded-xl hover:underline flex items-center"
                    >
                        Don't have Expo Go? Download it here
                        <ArrowForward className="ml-2" />
                    </motion.a>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8"
                >
                    <h2 className="text-3xl font-bold text-[#333333] mb-6">
                        Why Drive with Blitz?
                    </h2>
                    <ul className="list-disc pl-6 space-y-4 text-[#666666]">
                        <li>Flexible working hours - be your own boss</li>
                        <li>Competitive pay and incentives</li>
                        <li>
                            User-friendly mobile app for efficient deliveries
                        </li>
                        <li>
                            Opportunity to grow with a fast-paced, innovative
                            company
                        </li>
                        <li>Supportive community of fellow drivers</li>
                    </ul>
                </motion.div>
            </main>
        </div>
    );
};

export default DriverApplication;
