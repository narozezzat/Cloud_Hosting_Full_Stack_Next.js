import Link from 'next/link'
import styles from "./header.module.css";
import Navbar from './Navbar';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { Button } from 'antd';
import UserDropdown from './UserDropdown';

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
            <Link
              href="/login"
            >
              <Button
                type='text'
                className='border rounded-none border-[#0059d6] text-[#0059d6] hover:!bg-[#0059d6] hover:!text-white py-2 px-4 sm:px-8'
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button
                type='text'
                className='rounded-none border bg-[#0059d6] text-white py-2 hover:!bg-[#2419be] hover:!text-white px-4 sm:px-8'
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
