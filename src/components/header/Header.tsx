import Link from 'next/link'
import styles from "./header.module.css";
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <div className={styles.right}>
        <Link className='border border-[#0059d6] text-[#0059d6] hover:bg-[#0059d6] hover:text-white py-2 px-4 sm:px-8' href="/login">Login</Link>
        <Link className='border  bg-[#0059d6] text-white py-2 hover:bg-[#2419be] px-4 sm:px-8' href="/register">Register</Link>
      </div>
    </header>
  )
}

export default Header