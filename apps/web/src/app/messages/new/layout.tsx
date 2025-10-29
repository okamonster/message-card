import DefaultHeader from "@/components/Navigations/DefaultHeader";

export default function MessagesNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultHeader backHref="/" title="メッセージを送る" />
      {children}
    </>
  );
}
