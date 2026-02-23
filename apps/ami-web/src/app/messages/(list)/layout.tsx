import DefaultHeader from "@/components/Navigations/DefaultHeader";

export default function MessagesListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DefaultHeader backHref="/" title="みんなのメッセージ" />
      {children}
    </>
  );
}
