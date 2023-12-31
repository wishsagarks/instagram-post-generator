import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js' strategy="beforeInteractive" />
        <Script
          id="kofi-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              kofiWidgetOverlay.draw('freakingwish', {
                'type': 'floating-chat',
                'floating-chat.donateButton.text': 'Support me',
                'floating-chat.donateButton.background-color': '#0E66C2',
                'floating-chat.donateButton.text-color': '#fff'
              });
            `,
          }}
        />
      </body>
    </Html>
  );
}
