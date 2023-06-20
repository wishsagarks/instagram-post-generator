import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>

      </Head>
      <body>
        <Main />
        <NextScript />
        <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js' />
        <Script  
          id="freakingwish" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
            `kofiWidgetOverlay.draw('freakingwish', {
              'type': 'floating-chat',
              'floating-chat.donateButton.text':'Tip Me',
              'floating-chat.donateButton.background-color': '#00b9fe',
              'floating-chat.donateButton.text-color': '#fff'
            });`
          }}
        />
      </body>
    </Html >
  )
}
