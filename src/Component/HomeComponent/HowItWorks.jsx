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

                {/* Right Instructions */}
                <div>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 mb-6"
                        >
                            <div className="bg-gray-100 p-3 rounded-full">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {index + 1}. {step.title}
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
