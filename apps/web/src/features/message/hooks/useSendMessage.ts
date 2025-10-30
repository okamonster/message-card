import { useEvent } from "@/features/event/EventProvider";
import { useToast } from "@/hooks/useToast";
import { createMessage } from "@/infrastructures/MessageOperations";
import { CreateMessageDto } from "@repo/common";

export const useSendMessage = () => {
  const { event } = useEvent();

  const sendMessage = async (dto: CreateMessageDto) => {
    if (!event) {
      throw new Error("Event not found");
    }
    await createMessage(event.eventId, dto);
  };

  return {
    sendMessage,
  };
};
