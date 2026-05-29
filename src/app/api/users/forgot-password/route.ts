import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";
import { DOMAIN } from "@/lib/constants";
import { ForgotPasswordDto } from "@/lib/validation/dtos";
import { forgotPasswordSchema } from "@/lib/validation/validationSchema";
import { sendEmail, passwordResetEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

/**
 *  @method  POST
 *  @route   ~/api/users/forgot-password
 *  @desc    Request a password-reset link
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const limited = checkRateLimit(request, "forgot-password", {
      limit: 5,
      windowMs: 15 * 60_000,
    });
    if (limited) return limited;

    const body = (await request.json()) as ForgotPasswordDto;

    const validation = forgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    // Verify the email is registered before sending anything.
    if (!user) {
      return NextResponse.json(
        { message: "No account is registered with that email." },
        { status: 404 },
      );
    }

    // Raw token goes in the link; only its hash is stored.
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Invalidate any earlier outstanding tokens for this user.
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id, used: false },
    });
    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const resetUrl = `${DOMAIN}/reset-password?token=${rawToken}`;
    const email = passwordResetEmail(resetUrl);
    // Don't let a delivery failure (e.g. Resend test-mode rejecting a
    // non-owner address) break the flow.
    try {
      await sendEmail({ to: user.email, ...email });
    } catch (mailError) {
      console.error("password reset email failed:", mailError);
    }

    return NextResponse.json(
      { message: "A reset link has been sent to your email." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
