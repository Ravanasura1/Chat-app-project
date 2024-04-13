import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });


      if (!res.ok) {
        // Handle any non-OK response statuses as errors
        throw new Error(`Logout failed with status code ${res.status}`);
      }

      const data = await res.json();

      // Check if the data contains an error property
      if (data.error) {
        if (data.error !== 'Logged out successfully') {
          throw new Error(data.error);
        }
      }

      // If the response is successful, proceed with logout
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logout successful")
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error.message);
      toast.error(`Logout failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;

