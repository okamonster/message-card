import { z } from "zod";

export const createMessageSchema = z.object({
  nickName: z
    .string()
    .min(1, { message: "ニックネームは必須です" })
    .max(15, { message: "ニックネームは15文字以内で入力してください" }),
  message: z
    .string()
    .min(1, { message: "メッセージは必須です" })
    .max(500, { message: "メッセージは500文字以内で入力してください" }),
  region: z.string(),
});

export type CreateMessageSchemaType = z.infer<typeof createMessageSchema>;
