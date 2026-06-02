export const ARTICLE_PER_PAGE = 10;
export const COMMENT_PER_PAGE = 50;

const PRODUCTION_DOMAIN = "https://cloud-hosting-full-stack-next-js.vercel.app";
const DEVELOPMENT_DOMAIN = "http://localhost:3000";

export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_DOMAIN
    : DEVELOPMENT_DOMAIN;

export const API_BASE_URL = "";
