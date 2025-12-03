import { App } from "antd";
import { useCallback } from "react";

export function useCopyToClipboard() {
  const { message } = App.useApp();
  const copyToClipboard = useCallback(
    (text: string, sucessMessage?: string) => {
      navigator.clipboard.writeText(text);
      message.info(sucessMessage ?? `"${text}" Copiado!`);
    },
    [message]
  );
  return copyToClipboard;
}
