import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { ResetPasswordDto } from "@/lib/validation/dtos";
import { resetPasswordSchema } from "@/lib/validation/validationSchema";

/**
 *  @method  POST
 *  @route   ~/api/users/reset-password
 *  @desc    Reset a password using a token from the email link
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ResetPasswordDto;

    const validation = resetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(body.token)
      .digest("hex");

    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!record || record.used || record.expiresAt < new Date()) {
      return NextResponse.json(
        { message: "invalid or expired reset link" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { used: true },
      }),
    ]);

    return NextResponse.json(
      { message: "password reset successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
