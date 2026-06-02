"use client";

import * as React from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { CategoryWithCount } from "@/lib/types";

/** Fetch the category list on the client (used by article modals & filters). */
export function useCategories(enabled = true) {
  const [categories, setCategories] = React.useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;
    let active = true;
    setLoading(true);
    axios
      .get<CategoryWithCount[]>(`${API_BASE_URL}/api/categories`)
      .then((res) => {
        if (active) setCategories(res.data);
      })
      .catch(() => {
        /* non-critical: category select just stays empty */
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [enabled]);

  return { categories, loading };
}
