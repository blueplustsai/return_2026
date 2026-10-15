import Script from "next/script";

const difyToken = process.env.DIFY_EMBED_TOKEN || "YOUR_DIFY_EMBED_TOKEN";

/**
 * Dify web chat embed. The token stays a placeholder until DIFY_EMBED_TOKEN
 * is set in the environment. No extra floating button is rendered here.
 */
export function DifyChatWidget() {
  const config = `window.difyChatbotConfig = {
  token: ${JSON.stringify(difyToken)},
  baseUrl: 'https://udify.app'
}`;

  return (
    <>
      {/* Rendered only from the root layout so the embed is in the initial HTML. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="dify-chatbot-config" strategy="beforeInteractive">
        {config}
      </Script>
      <Script src="https://udify.app/embed.min.js" id={difyToken} strategy="afterInteractive" />
    </>
  );
}
