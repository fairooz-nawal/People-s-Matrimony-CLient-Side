import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountUp from "react-countup";
import img1 from "../../assets/succes1.jpg"
import img2 from "../../assets/success2.jpg"
import img3 from "../../assets/success3.jpg"
import img4 from "../../assets/success4.jpg"
const SuccessCounter = () => {
    const { data: stats = {}, isLoading, isError } = useQuery({
        queryKey: ["success-counter"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/success-counter");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="text-center text-2xl font-bold my-10 animate-pulse text-yellow-500">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-2xl font-bold text-red-500 my-10">
                Failed to load data.
            </div>
        );
    }

    return (
        <div className="my-[100px] px-4 w-11/12 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center cursive mb-10">
                Our Success Stories
            </h2>
            <p className="text-gray-600 mb-10">
                Here’s what we’ve achieved so far on People’s Matrimony ❤️
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 mx-auto">

                {/* Total Biodata */}
                <div className="relative">
                    <div className="w-[250px] h-[270px] md:w-[260px] md:h-[370px] mx-auto">
                        <img className="rounded-full w-full h-full" src={img1} alt="" />
                    </div>
                    <div className="bg-[#0d0d0da7] absolute bottom-[20%] left-[15%]  w-[200px] h-[100px] rounded-full">
                        <h3 className="text-5xl cursive font-bold text-white">
                            <CountUp end={stats.totalUsers} duration={2} />
                        </h3>
                        <p className="text-white cursive mt-2 text-lg font-medium">Total Biodata</p>
                    </div>
                </div>


                {/* Female Biodata */}
                <div className="relative">
                    <div className="w-[250px] h-[270px] md:w-[260px] md:h-[370px] mx-auto">
                        <img className="rounded-full w-full h-full" src={img2} alt="" />
                    </div>
                    <div className="bg-[#0d0d0da7] absolute bottom-[20%] left-[15%]  w-[200px] h-[100px] rounded-full">
                        <h3 className="text-5xl cursive font-bold text-white">
                            <CountUp end={stats.totalFemales} duration={2} />
                        </h3>
                        <p className="text-white cursive mt-2 text-lg font-medium">Girls Biodata</p>
                    </div>
                </div>


                {/* Male Biodata */}
                   <div className="relative">
                    <div className="w-[250px] h-[270px] md:w-[260px] md:h-[370px] mx-auto">
                        <img className="rounded-full w-full h-full" src={img3} alt="" />
                    </div>
                    <div className="bg-[#0d0d0da7] absolute bottom-[20%] left-[15%]  w-[200px] h-[100px] rounded-full">
                        <h3 className="text-5xl cursive font-bold text-white">
                            <CountUp end={stats.totalMales} duration={2} />
                        </h3>
                        <p className="text-white cursive mt-2 text-lg font-medium">Boys Biodata</p>
                    </div>
                </div>

                {/* Marriages Completed */}
                   <div className="relative">
                    <div className="w-[200px] h-[270px] md:w-[260px] md:h-[370px] mx-auto">
                        <img className="rounded-full w-full h-full" src={img4} alt="" />
                    </div>
                    <div className="bg-[#0d0d0da7] absolute bottom-[20%] left-[15%]  w-[200px] h-[100px] rounded-full">
                        <h3 className="text-5xl cursive font-bold text-white">
                            <CountUp end={stats.totalMarriages} duration={2} />
                        </h3>
                        <p className="text-white cursive mt-2 text-lg font-medium">Successful Marriages</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessCounter;
