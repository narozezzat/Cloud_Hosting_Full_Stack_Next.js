"use client";

import * as React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Trash2, ShieldCheck, Shield } from "lucide-react";
import { DOMAIN } from "@/lib/constants";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { AdminUserRow } from "@/lib/types";
import { formatDate } from "@/lib/formatDate";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";
import useLoading from "@/hooks/useLoading";

interface AdminUsersClientProps {
  users: AdminUserRow[];
  /** The signed-in admin — can't delete or demote themselves here. */
  currentUserId: number;
  /** Active server-side search term (drives the empty-state copy). */
  searchQuery?: string;
}

export default function AdminUsersClient({
  users,
  currentUserId,
  searchQuery,
}: AdminUsersClientProps) {
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = React.useState<AdminUserRow | null>(
    null,
  );
  const [busyId, setBusyId] = React.useState<number | null>(null);
  const { loading: deleting, withLoading: withDeleting } = useLoading();

  const toggleAdmin = async (user: AdminUserRow) => {
    setBusyId(user.id);
    try {
      await axios.patch(`${DOMAIN}/api/users/${user.id}`, {
        isAdmin: !user.isAdmin,
      });
      toast.success(
        `${user.username} is now ${!user.isAdmin ? "an admin" : "a member"}`,
      );
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await withDeleting(async () => {
        await axios.delete(`${DOMAIN}/api/users/${pendingDelete.id}`);
        toast.success("User deleted");
        setPendingDelete(null);
        router.refresh();
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Joined</TableHead>
            <TableHead className="text-center">Comments</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={6}
                className="h-24 text-center text-muted-foreground"
              >
                {searchQuery
                  ? `No users match “${searchQuery}”.`
                  : "No users yet."}
              </TableCell>
            </TableRow>
          )}
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    href={`/users/${user.id}`}
                    className="flex items-center gap-3 hover:underline"
                  >
                    <Avatar name={user.username} size="sm" />
                    <span className="font-medium text-foreground">
                      {user.username}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {formatDate(String(user.createdAt))}
                </TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {user._count.comments}
                </TableCell>
                <TableCell>
                  {user.isAdmin ? (
                    <Badge variant="accent">Admin</Badge>
                  ) : (
                    <Badge variant="default">Member</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => toggleAdmin(user)}
                      disabled={isSelf || busyId === user.id}
                      aria-label={
                        user.isAdmin ? "Revoke admin" : "Make admin"
                      }
                      title={
                        isSelf
                          ? "You can't change your own role"
                          : user.isAdmin
                            ? "Revoke admin"
                            : "Make admin"
                      }
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {user.isAdmin ? (
                        <Shield className="h-4 w-4" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(user)}
                      disabled={isSelf}
                      aria-label={`Delete ${user.username}`}
                      title={
                        isSelf ? "You can't delete yourself" : "Delete user"
                      }
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {pendingDelete && (
        <ConfirmationModal
          isOpen={Boolean(pendingDelete)}
          onClose={() => setPendingDelete(null)}
          onConfirm={handleDelete}
          title="Delete this user?"
          message={
            <span>
              This permanently removes{" "}
              <span className="font-semibold text-foreground">
                {pendingDelete.username}
              </span>{" "}
              and all their comments. This action cannot be undone.
            </span>
          }
          confirmText="Delete user"
          cancelText="Cancel"
          isLoading={deleting}
          tone="danger"
        />
      )}
    </>
  );
}
