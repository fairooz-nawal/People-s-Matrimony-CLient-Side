import { FaUserPlus, FaSearch, FaHeart, FaComments } from "react-icons/fa";
import howItWorksImage from "../../assets/howItWorks.png"; 

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserPlus size={20} className="text-pink-500" />,
            title: "Create Your Profile",
            description: "Sign up and build your profile to start finding your perfect match.",
        },
        {
            icon: <FaSearch size={20} className="text-blue-500" />,
            title: "Browse Members",
            description: "Explore profiles and find people who match your preferences.",
        },
        {
            icon: <FaHeart size={20} className="text-red-500" />,
            title: "Show Interest",
            description: "Send interest requests to connect with members you like.",
        },
        {
            icon: <FaComments size={20} className="text-green-500" />,
            title: "Start Conversations",
            description: "Securely chat within the platform and take the next step.",
        },
    ];

    return (
        <div className="my-20 px-4 w-11/12 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center cursive mb-10">
                How It Works
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left Image */}
                <div className="flex justify-center">
                    <img
                        src={howItWorksImage}
                        alt="How it works"
                        className="rounded-xl shadow-lg"
                    />
                </div>

                    

                {/* Right Instructions with Flowchart */}
                <div className="relative">
                    {/* Golden Line */}
                    <div className="absolute left-5 top-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>

                    {/* Steps */}
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 mb-8 relative"
                        >
                            {/* Number Circle */}
                            <div className="z-10">
                                <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-white font-bold rounded-full shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    {step.icon}
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
