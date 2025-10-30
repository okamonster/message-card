"use client";
import { LinkButton } from "@/components/Buttons/LinkButton";
import { TextInput, Textarea, Button, Select } from "@mantine/core";
import styles from "./style.module.css";
import { Controller, useForm } from "react-hook-form";
import {
  regionLabelMap,
  regionList,
  type CreateMessageDto,
  type Region,
} from "@repo/common";
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
    control,
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<CreateMessageSchemaType>({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      nickName: "",
      message: "",
      region: "",
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
        region: data.region ? (data.region as Region) : "noAnswer",
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

        <Controller
          control={control}
          name="region"
          render={({ field }) => (
            <Select
              label="地域"
              placeholder="地域を選択してください"
              data={regionList.map((region) => ({
                value: region,
                label: regionLabelMap[region],
              }))}
              onChange={field.onChange}
              value={field.value}
              error={errors.region?.message}
              w={200}
            />
          )}
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
