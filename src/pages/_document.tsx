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
        <InlineStylesHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
