import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/verifyToken";
import { getAnalytics } from "@/lib/analytics";

/**
 *  @method  GET
 *  @route   ~/api/admin/analytics
 *  @desc    Aggregated analytics for the admin dashboard.
 *  @access  private (admin only)
 */
export async function GET(request: NextRequest) {
  const user = verifyToken(request);
  if (!user) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 },
    );
  }
  if (!user.isAdmin) {
    return NextResponse.json(
      { message: "Admin access required" },
      { status: 403 },
    );
  }

  try {
    const analytics = await getAnalytics();
    return NextResponse.json(analytics, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load analytics" },
      { status: 500 },
    );
  }
}
