import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be less than 200 characters" }),
  description: z.string().min(10),
  categoryId: z.number().int().positive().nullish(),
});

export const updateArticleSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  description: z.string().min(10).optional(),
  categoryId: z.number().int().positive().nullish(),
});

// Category Schemas
export const createCategorySchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(2, { message: "name should be at least 2 characters long" })
    .max(60, { message: "name should be less than 60 characters" }),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(60),
});

// Register Schema
export const registerSchema = z.object({
  username: z.string().min(2).max(100), //.optional(),
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().min(3).max(200).email(),
  password: z.string().min(6),
});

// Create Comment Schema
export const createCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
  parentId: z.number().int().positive().nullish(),
});

// Password Reset Schemas
export const forgotPasswordSchema = z.object({
  email: z.string().min(3).max(200).email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
});

// Update User Profile Schema
export const updateUserSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  email: z.string().min(3).max(200).email().optional(),
  password: z.string().min(6).optional(),
});
