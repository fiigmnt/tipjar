import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [address, setAddress] = useState('NO RECEIVER');
  const [placement, setPlacement] = useState('left');
  const [color, setColor] = useState('dark');

  const updateSetting = ({ target }) => {
    const { value, name } = target;
    switch (name) {
      case 'address':
        setAddress(value);
        window.TipJarOptions.RECEIVER_ADDRESS = value;
        window.TipJar();
        break;
      case 'placement':
        setPlacement(value);
        window.TipJarOptions.PLACEMENT = value;
        window.TipJar();
        break;
      case 'color':
        setColor(value);
        window.TipJarOptions.COLOR_SCHEME = value;
        window.TipJar();
        break;
      default:
        console.log(`Something is seriously wrong here.`);
    }
  };

  const copyPaste = () => {
    return (
      <div style={{ textAlign: 'left', margin: '20px 0 0' }}>
        <code
          style={{ display: 'block' }}
        >{`<script type="text/javascript" async>`}</code>
        <code
          style={{ display: 'block', marginLeft: '2em' }}
        >{`window.TipJarOptions = {`}</code>
        <code
          style={{ display: 'block', marginLeft: '4em' }}
        >{`RECEIVER_ADDRESS: '${address}',`}</code>
        <code
          style={{ display: 'block', marginLeft: '4em' }}
        >{`COLOR_SCHEME: '${color}',`}</code>
        <code
          style={{ display: 'block', marginLeft: '4em' }}
        >{`PLACEMENT: '${placement}'`}</code>
        <code style={{ display: 'block', marginLeft: '2em' }}>{`};`}</code>
        <code style={{ display: 'block' }}>{`</script>`}</code>
        <code
          style={{ display: 'block' }}
        >{`<script type="text/javascript" src="https://tipjar.fiig.xyz/js/tipjar.js" async />`}</code>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>ETH TIPJAR</title>
        <meta name="title" content="ETH TipJar by fiigmnt" />
        <meta
          name="description"
          content="Now you too can have a Connect Wallet button on your site! Beg your friends & fans for some of that sweet sweet eth. This is our version of pass the hat. =]"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tipjar.weallgonnamake.it/" />
        <meta property="og:title" content="ETH TipJar by fiigmnt" />
        <meta
          property="og:description"
          content="Now you too can have a Connect Wallet button on your site! Beg your friends & fans for some of that sweet sweet eth. This is our version of pass the hat. =]"
        />
        <meta property="og:image" content="/images/meta.png" />

        <meta property="twitter:card" content="summary" />
        <meta
          property="twitter:url"
          content="https://tipjar.fiig.xyz"
        />
        <meta property="twitter:title" content="Eth TipJar by WAGMI" />
        <meta
          property="twitter:description"
          content="Beg your friends & fans for some of that sweet sweet eth."
        />
        <meta property="twitter:image" content="/images/meta.png" />

        <link rel="icon" href="/images/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Candal&display=swap"
          rel="stylesheet"
        />

        <script type="text/javascript" src="/js/TipJarOptions.js" async />
        <script type="text/javascript" src="/js/tipjar.js" async />
      </Head>

      <main
        className={styles.main}
        style={{
          color: color === 'light' ? '#201e1f' : '#f0efeb',
          backgroundColor: color === 'light' ? '#f0efeb' : '#201e1f',
        }}
      >
        <div className={styles.title}>
          <h1>TIPJAR</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h2>SETTINGS</h2>
            <span style={{fontFamily: "monospace"}}>You must have metamask installed to see example</span>
            <div
              className={styles.form}
              style={{
                border: `1px solid ${color === 'dark' ? '#f0efeb' : '#201e1f'}`,
                boxShadow: `15px 15px 1px ${
                  color === 'dark' ? '#f0efeb' : '#201e1f'
                }`,
              }}
            >
              <div className={styles.formSection}>
                <input
                  type="text"
                  id="amount"
                  name="address"
                  placeholder="wallet address"
                  onChange={updateSetting}
                />
              </div>
              <div className={styles.formSection}>
                <input
                  type="radio"
                  name="placement"
                  id="left"
                  value="left"
                  checked
                  onChange={updateSetting}
                />
                <span style={{ fontSize: '40px' }}>⇆</span>
                <input
                  type="radio"
                  name="placement"
                  id="right"
                  value="right"
                  onChange={updateSetting}
                />
              </div>
              <div className={styles.formSection}>
                <input
                  type="radio"
                  name="color"
                  id="dark"
                  value="dark"
                  checked
                  onChange={updateSetting}
                />
                <span style={{ fontSize: '40px' }}>☯</span>
                <input
                  type="radio"
                  name="color"
                  id="light"
                  value="light"
                  onChange={updateSetting}
                />
              </div>
            </div>
          </div>
          <div className={styles.copyPaste}>
            <h2>Copy & Paste</h2>
            <div
              className={styles.copyPasteContainer}
              style={{
                border: `1px solid ${color === 'dark' ? '#f0efeb' : '#201e1f'}`,
                boxShadow: `15px 15px 1px ${
                  color === 'dark' ? '#f0efeb' : '#201e1f'
                }`,
              }}
            >
              {copyPaste()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
