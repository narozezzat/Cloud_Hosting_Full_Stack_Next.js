"use client";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { AiOutlineLogout } from "react-icons/ai";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went wrong");
    }
  };

  return (
    <Button
      type="text"
      icon={<AiOutlineLogout />}
      onClick={logoutHandler}
      className="bg-gray-700 hover:!bg-gray-800 hover:!text-white text-gray-200 px-4 py-2 sm:px-8 rounded"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
