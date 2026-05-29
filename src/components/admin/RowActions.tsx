"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Article } from "@/generated/prisma";
import EditArticleModal from "./EditArticleModal";
import DeleteArticleButton from "./DeleteArticleButton";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RowActionsProps {
  article: Article;
}

export default function RowActions({ article }: RowActionsProps): React.ReactElement {
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Row actions"
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Pencil className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/articles/${article.id}`}>
              <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              View article
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            destructive
            onSelect={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditArticleModal
        article={article}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteArticleButton
        articleId={article.id}
        articleTitle={article.title}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
