import { message } from "antd";
export default function messageAntd(type, content) {
  return message[type]({
    content,
    maxCount: 0,
    // duration: 0,
  });
}

export const messageTypes = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
  warn: "warn",
  loading: "loading",
};
