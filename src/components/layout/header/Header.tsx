import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/lib/auth/verifyToken";
import HeaderClient from "./HeaderClient";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  return (
    <HeaderClient
      isAdmin={payload?.isAdmin || false}
      username={payload?.username ?? null}
    />
  );
};

export default Header;
