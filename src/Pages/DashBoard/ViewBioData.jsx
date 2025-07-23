import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Component/Hooks/useAxiosSecure";
import Loading from "../Loading";
import { useParams } from "react-router";

const ViewBiodata = () => {
  const axiosSecure = useAxiosSecure();
  const {email} = useParams();
  const { data: biodata, isPending, isError } = useQuery({
    queryKey: ["biodataDetails", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singlealluser?email=${email}`);
      console.log(res.data);
      return res.data;
    }
  })
  console.log(biodata);
  
  isPending && <div className='text-center text-2xl font-bold'><Loading></Loading></div>
  isError && <div className='text-center text-2xl font-bold'>Error: {isError.message}</div>
  if (!biodata || biodata.length === 0) {
    return <div className='text-center text-2xl font-bold'>No Bio Data Found</div>
  }

  const handlePremium = () => {
    const bioDataInfo = {
      reqName: biodata?.name,
      reqEmail: biodata?.contactEmail,
      reqBioId: biodata?.biodataId
    }

    Swal.fire({
      title: "Do you want to sent Request to make BioData Premium?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then(async (result) => {
      if (result.isConfirmed) {
        const req = await axiosSecure.post(`/approvePremium?email=${biodata?.contactEmail}`, bioDataInfo)
        if (req.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "SuccessFully Sent request to make BioData premium",
            icon: "success",
          })
        } else {
          Swal.fire({
            title: "Request Already Sent Once",
            text: "You have Already Sent a request to Make Biodata Premium",
            icon: "info",
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Request to make BioData Premium is not sent", "", "info");
      }
    });
  }

  console.log(biodata);
  return (
    <div className=" w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-pink-500 p-6">
      <div className="max-w-3xl w-full bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-2xl p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-6">
          <img
            src={biodata.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-40 h-45 mx-auto rounded-full border-4 border-pink-400 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-pink-700 mt-4">
            {biodata.name}
          </h2>
          <p className="text-gray-600">{biodata.occupation}</p>
        </div>

        {/* Biodata Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 font-semibold">
              Biodata Type: <span className="font-normal">{biodata.gender}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Date of Birth: <span className="font-normal">{biodata.dob}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Height: <span className="font-normal">{biodata.height}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Weight: <span className="font-normal">{biodata.weight}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Age: <span className="font-normal">{biodata.age}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Race (Skin Color):{" "}
              <span className="font-normal">{biodata.race}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Father's Name:{" "}
              <span className="font-normal">{biodata.fatherName}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Mother's Name:{" "}
              <span className="font-normal">{biodata.motherName}</span>
            </p>
          </div>

          <div>
            <p className="text-gray-700 font-semibold">
              Permanent Division:{" "}
              <span className="font-normal">{biodata.permanentDivision}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Present Division:{" "}
              <span className="font-normal">{biodata.presentDivision}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Expected Partner Age:{" "}
              <span className="font-normal">{biodata.expectedPartnerAge}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Expected Partner Height:{" "}
              <span className="font-normal">{biodata.expectedPartnerHeight}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Expected Partner Weight:{" "}
              <span className="font-normal">{biodata.expectedPartnerWeight}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Contact Email:{" "}
              <span className="font-normal">{biodata.contactEmail}</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Mobile Number:{" "}
              <span className="font-normal">{biodata.mobileNumber}</span>
            </p>
          </div>
        </div><br />
        <button
          onClick={handlePremium}
          type="submit"
          className="w-full bg-red-400 text-white rounded-lg p-3 font-semibold border-2 border-gray-200 hover:bg-white hover:text-red-400 transition"
        >
          Make Bio to Premium
        </button>
      </div>
    </div>
  );
};

export default ViewBiodata;
