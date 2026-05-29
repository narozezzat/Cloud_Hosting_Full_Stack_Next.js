"use client";

import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

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
}

/** Shared title + description fields for the add/edit article modals. */
export function ArticleFormFields({
  idPrefix,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  titlePlaceholder,
  descriptionPlaceholder,
  autoFocus = true,
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
