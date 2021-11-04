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
        <code style={{ display: 'block' }}>{`<script type="text/javascript" src="https://weallgonnamake.it/tipjar-min.js" async />`}</code>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
          <h1>WAGMI</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h2>TIPJAR SETTINGS</h2>
            <sub>You must have metamask installed to see example</sub>
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
