import { z } from "zod";

export const emailValidationSchema = z.string().refine(
  (value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(value);
  },
  {
    message: "正しいメールアドレスを入力してください",
  }
);

export const passwordValidationSchema = z
  .string()
  .min(8, "パスワードは8文字以上にしてください");
