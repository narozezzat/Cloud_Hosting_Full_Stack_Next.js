"use client";

import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { CategoryWithCount } from "@/lib/types";

interface ArticleFormFieldsProps {
  /** Unique prefix so field ids don't collide when multiple forms mount. */
  idPrefix: string;
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
  autoFocus?: boolean;
  /** Category picker (optional — omit to hide the field). */
  categories?: CategoryWithCount[];
  categoryId?: number | null;
  onCategoryChange?: (value: number | null) => void;
}

/** Shared title + description (+ optional category) fields for the article modals. */
export function ArticleFormFields({
  idPrefix,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  titlePlaceholder,
  descriptionPlaceholder,
  autoFocus = true,
  categories,
  categoryId,
  onCategoryChange,
}: ArticleFormFieldsProps) {
  return (
    <>
      <FormField label="Title" htmlFor={`${idPrefix}-title`}>
        <Input
          id={`${idPrefix}-title`}
          placeholder={titlePlaceholder}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          autoFocus={autoFocus}
        />
      </FormField>
      {categories && onCategoryChange && (
        <FormField label="Category" htmlFor={`${idPrefix}-category`}>
          <Select
            id={`${idPrefix}-category`}
            value={categoryId ?? ""}
            onChange={(e) =>
              onCategoryChange(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </FormField>
      )}
      <FormField label="Description" htmlFor={`${idPrefix}-description`}>
        <Textarea
          id={`${idPrefix}-description`}
          rows={6}
          placeholder={descriptionPlaceholder}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </FormField>
    </>
  );
}
