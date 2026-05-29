"use client";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LogOut, User } from "lucide-react";

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

  const items: MenuProps["items"] = [
    {
      key: "user",
      disabled: true,
      label: (
        <div className="flex flex-col py-1">
          <span className="text-xs text-muted-foreground">Signed in as</span>
          <span className="font-semibold">{username}</span>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "profile",
      label: <a href="/profile">Profile</a>,
      icon: <User size={14} />,
    },
    {
      key: "logout",
      label: <span onClick={handleLogout}>Log out</span>,
      icon: <LogOut size={14} />,
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
      <button
        type="button"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white shadow-sm transition-transform duration-hover hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Account menu for ${username}`}
      >
        {username?.charAt(0).toUpperCase()}
      </button>
    </Dropdown>
  );
};

export default UserDropdown;
