"use client";
import { LinkButton } from "@/components/Buttons/LinkButton";
import { TextInput, Textarea, Button } from "@mantine/core";
import styles from "./style.module.css";
import { useForm } from "react-hook-form";
import type { CreateMessageDto } from "@repo/common";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createMessageSchema,
  CreateMessageSchemaType,
} from "@/entities/Message";
import { useSendMessage } from "../../hooks/useSendMessage";
import { serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/useToast";
import { useDisclosure } from "@mantine/hooks";
import { SendCompleteModal } from "../SendCompleteModal";

export const MessageForm = (): React.ReactNode => {
  const { sendMessage } = useSendMessage();
  const { showErrorToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<CreateMessageSchemaType>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      nickName: "",
      message: "",
    },
  });

  const [isOpen, { open }] = useDisclosure(false);

  const onSubmit = async (data: CreateMessageSchemaType) => {
    try {
      const dto: CreateMessageDto = {
        nickName: data.nickName,
        message: data.message,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        displayStatus: "visible",
      };
      await sendMessage(dto);
      open();
    } catch (error) {
      showErrorToast("メッセージの送信に失敗しました");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="ニックネーム"
          placeholder="ニックネームを入力してください"
          {...register("nickName")}
          error={errors.nickName?.message}
        />

        <Textarea
          label="メッセージ"
          placeholder="あかりさんへのお祝いメッセージを書いてね"
          rows={6}
          {...register("message")}
          error={errors.message?.message}
        />

        <div className={styles.actions}>
          <LinkButton
            href="/"
            color="var(--button-primary-color)"
            radius="lg"
            variant="outline"
          >
            戻る
          </LinkButton>
          <Button
            type="submit"
            disabled={!isValid}
            color="var(--button-primary-color)"
            variant="filled"
            radius="lg"
            loading={isSubmitting}
          >
            送信
          </Button>
        </div>
      </form>
      <SendCompleteModal opened={isOpen} />
    </>
  );
};
