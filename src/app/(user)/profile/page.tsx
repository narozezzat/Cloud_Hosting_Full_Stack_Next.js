import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/lib/auth/verifyToken";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { GradientBlob } from "@/components/ui/GradientBlob";

export default function ProfilePage() {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (!payload) redirect("/login");

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlob position="top-right" size="md" />
        <div className="container py-16">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 text-3xl font-bold text-white shadow-md">
              {payload.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-display text-display-sm font-extrabold tracking-tight">
                {payload.username}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="success">Active</Badge>
                {payload.isAdmin && <Badge variant="accent">Admin</Badge>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section align="left" eyebrow="Profile" title="Account details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card variant="elevated" className="p-6">
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="mt-1 font-display text-lg font-semibold">
              {payload.username}
            </p>
          </Card>
          <Card variant="elevated" className="p-6">
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="mt-1 font-display text-lg font-semibold">
              {payload.isAdmin ? "Administrator" : "Member"}
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
