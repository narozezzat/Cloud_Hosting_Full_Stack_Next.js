import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin || false} />
      <div className={styles.right}>
        {payload ? (
          <>
            <div className="flex items-center gap-2">
              <UserDropdown username={payload?.username} />
            </div>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="border rounded-none border-[#0059d6] text-[#0059d6] hover:bg-[#0059d6] hover:text-white py-1.5 px-4 sm:px-8">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="rounded-none border border-[#0059d6] bg-[#0059d6] text-white py-1.5 hover:bg-[#2419be] px-4 sm:px-8">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
