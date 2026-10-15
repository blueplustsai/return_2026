export function openDifyWidget() {
  if (typeof document === "undefined") return;
  const widget = document.getElementById("dify-chatbot-bubble-button");
  if (widget instanceof HTMLElement) widget.click();
}