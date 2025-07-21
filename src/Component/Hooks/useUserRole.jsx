import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { ContextAPI } from "../ContextAPI/AuthProvider";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
 const {users, loading: authLoding} = useContext(ContextAPI);
  
 const { data: roleData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user-role", users?.email], // cache by email
    enabled: !authLoding && !!users?.email, // only fetch if email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-role?email=${users?.email}`);
      return res.data; // { email, role, premium }
    },
  });

  return {
    role: roleData?.role || "user", // fallback role
    premium: roleData?.premium || false,
    roleLoading: isLoading || authLoding, // fallback loa
    isError,
    error,
    refetch, // so you can manually refresh if needed
  };
};

export default useUserRole;
