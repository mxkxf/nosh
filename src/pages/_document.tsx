import { readFileSync } from 'fs';
import { join } from 'path';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

type DocumentFiles = {
  sharedFiles: string[];
  pageFiles: string[];
  allFiles: string[];
};

class InlineStylesHead extends Head {
  getCssLinks({ allFiles }: DocumentFiles) {
    const { assetPrefix } = this.context;
    if (!allFiles || allFiles.length === 0) return null;

    return allFiles
      .filter((file) => /\.css$/.test(file))
      .map((file) => (
        <style
          key={file}
          nonce={this.props.nonce}
          data-href={`${assetPrefix}/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: readFileSync(join(process.cwd(), '.next', file), 'utf-8'),
          }}
        />
      ));
  }
}

export default class CustomDocument extends Document {
  render() {
    return (
      <Html className="transition" lang="en">
        <InlineStylesHead>
          <title>nosh | the modern RSS reader</title>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="The modern RSS reader" />
          <meta name="description" content="Modern RSS reader" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@_mikefrancis" />
          <meta name="twitter:creator" content="@_mikefrancis" />
          <meta property="og:url" content="https://nosh.rocks" />
          <meta property="og:title" content="nosh" />
          <meta property="og:description" content="Modern RSS reader" />
          <meta
            property="og:image"
            content="https://nosh.rocks/screenshot.png"
          />
        </InlineStylesHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
