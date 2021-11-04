const GLOBALS = {
  COLOR_SCHEME: 'dark',
  PLACEMENT: 'right',
}

const ADDRESS = {
  SENDER: null,
  RECEIVER: null,
};

const ELEMENTS = {
  tipButton: null,
  tipModal: null,
  tipInput: null,
  senderAddress: null,
};

let etherem;

const connectWallet = async () => {
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    // ISSUE: You can only connect a single wallet address, defaults to first
    ADDRESS.SENDER = accounts[0];
    const { tipButton, senderAddress } = ELEMENTS;

    senderAddress.innerHTML = abbreviateAddress(ADDRESS.SENDER);
    senderAddress.style.display = 'block';
    tipButton.innerHTML = `Tip Jar`;
    tipButton.onclick = displayModal;
  } catch (error) {
    console.error(errorHandler(error));
  }
};

const sendTip = async () => {
  try {
    const { tipInput } = ELEMENTS;
    const value = (tipInput.value * 1000000000000000000).toString(16);

    const transactionHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: ADDRESS.RECEIVER,
          from: ADDRESS.SENDER,
          value: `0x${value}`,
        },
      ],
    });
    // Handle the result
    console.log(transactionHash);
    hideModal();
  } catch (error) {
    hideModal();
    console.error(errorHandler(error));
  }
};

const displayModal = () => {
  const { tipModal, tipButton } = ELEMENTS;

  tipModal.style.display = 'block';
  tipButton.innerHTML = 'Send Tip';
  tipButton.onclick = sendTip;
};

const hideModal = () => {
  const { tipModal, tipButton } = ELEMENTS;

  tipModal.style.display = 'none';
  tipButton.innerHTML = 'Tip Jar';
  tipButton.onclick = displayModal;
};

const generateTipJar = () => {
  const style = `
    .tipContainer {
      position: absolute;
      top: 0;
      ${GLOBALS.PLACEMENT}: 0 !important;
      max-width: 500px;
      margin: 20px;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      font-family: inherit;
      z-index: 108000;
      color: ${GLOBALS.COLOR_SCHEME === 'dark' ? '#ffffff' : '#212429'}
    }
    
    .tipContainer input {
      padding: 10px;
      outline: none;
      border: none;
    }
    
    .tipContainer input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    
    .tipContainer p {
      margin: 0;
      font-size: 0.8rem;
    }
    
    .tipButtonContainer {
      display: flex;
      flex-direction: row-reverse;
    }
    
    .tipButton {
      padding: 10px 25px;
      border: 2px solid ${GLOBALS.COLOR_SCHEME === 'dark' ? '#ffffff' : '#212429'};
      border-radius: 10px;
      cursor: pointer;
    }
    
    .senderAddress {
      padding: 10px;
      border-radius: 10px 0 0 10px;
      display: none;
    }
    
    .receiverAddress {
      padding: 10px 0;
    }
    
    .tipModal {
      display: flex;
      flex-direction: column;
      align-items: center;
      display: none;
    }
    
    .walletInformation {
      width: 100%;
      padding: 0 10px;
    }
    
    .tipAmountContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .tipAmount {
      width: '100%';
      margin: 10px;
      white-space: nowrap;
      overflow: hidden;
      appearance: textfield;
      text-align: right;
    }
    
    .eth {
      padding: 0 10px 0 0;
      font-size: 1.4rem;
    }
  `;

  const html = `
    <style>${style}</style>
    <div class="tipContainer">
    <div id="tipModal" class="tipModal">
      <div classNam="tipAmountContainer">
        <input id="tipInput" class="tipAmount" type="number" min="0" step="0.01" placeholder="0" />
        <span class="eth">Ξ</span>
      </div>
      <div class="walletInformation">
        <p>To:</p>
        <div class="receiverAddress">${abbreviateAddress(
          ADDRESS.RECEIVER
        )}</div>
        <p>From:</p>
      </div>
    </div>
    <div class="tipButtonContainer">
      <div id="tipButton" class="tipButton">Connect Wallet</div>
      <div id="senderAddress" class="senderAddress" />
    </div>
  </div>
  `;

  const tipJarElement = document.createElement('div');
  tipJarElement.innerHTML = html;
  return tipJarElement;
};

const abbreviateAddress = (walletAddress) => {
  return walletAddress.length > 20
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(
        walletAddress.length - 4
      )}`
    : walletAddress;
};

const errorHandler = (error) => {
  if (typeof error === 'object') {
    return `💰 TipJar Error:${JSON.stringify(error)}`;
  }
  return `💰 TipJar Error:${error}`;
};

window.TipJar = () => {
  if (window.TipJarOptions && window.ethereum) {
    const { RECEIVER_ADDRESS, COLOR_SCHEME, PLACEMENT } = window.TipJarOptions;

    ethereum = window.ethereum;
    ADDRESS.RECEIVER = RECEIVER_ADDRESS;
    GLOBALS.COLOR_SCHEME = COLOR_SCHEME;
    GLOBALS.PLACEMENT = PLACEMENT;

    try {
      if (window.tipJar) window.tipJar.remove();
      window.tipJar = generateTipJar();
      document.body.insertAdjacentElement('beforeend', window.tipJar);

      ELEMENTS.tipButton = document.getElementById('tipButton');
      ELEMENTS.tipModal = document.getElementById('tipModal');
      ELEMENTS.tipInput = document.getElementById('tipInput');
      ELEMENTS.senderAddress = document.getElementById('senderAddress');

      ELEMENTS.tipButton.onclick = connectWallet;
    } catch (error) {
      console.error(errorHandler(error));
    }
  } else {
    console.log('TipJar cannont be shown!');
    return;
  }
}

window.TipJar();
