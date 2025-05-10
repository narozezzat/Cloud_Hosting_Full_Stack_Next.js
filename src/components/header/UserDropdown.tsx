"use client";
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import axios from "axios";
import { DOMAIN } from '@/utils/constants';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineLogout } from 'react-icons/ai';

interface UserDropdownProps {
  username: string;
}

const UserDropdown = ({ username }: UserDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went wrong");
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <AiOutlineLogout />,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <div className="w-9 h-9 rounded-full bg-[#0059d6] flex items-center justify-center text-white font-bold cursor-pointer">
        {username?.charAt(0).toUpperCase()}
      </div>
    </Dropdown>
  );
};

export default UserDropdown;