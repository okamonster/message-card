"use client";

import { Paper } from "@mantine/core";
import classes from "./style.module.css";
import { MessageForm } from "@/features/message/components/MessageForm/index";

export const MessageSendContainer = (): React.ReactNode => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>メッセージを送る</h2>
      <Paper withBorder radius="md" className={classes.paper} shadow="md">
        <MessageForm />
      </Paper>
    </div>
  );
};
