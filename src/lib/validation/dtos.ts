export interface CreateArticleDto {
  title: string;
  description: string;
  categoryId?: number | null;
}

export interface UpdateArticleDto {
  title?: string;
  description?: string;
  categoryId?: number | null;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

export interface CreateCommentDto {
  text: string;
  articleId: number;
  parentId?: number | null;
}

export interface UpdateCommentDto {
  text: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}
