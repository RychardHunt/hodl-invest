import React, {Component} from 'react'
import './BuySellPanel.css'

class BuySellPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuySelected : true,
            usdAmount: '0',
            coinAmount: '0',
            buyInput: '',
            sellInput: '',
            buySelect: 'btc',
            sellSelect: 'btc',
            btcPrice: 0,
            ethPrice: 0
        };
        this.getBtcValue();
        this.getEthValue();
    }

    static validateInput(input) {
        //Only numbers and periods
        for(let i = 0; i < input.length; ++i) {
            let currentChar = input.charAt(i);
            if(!((currentChar >= '0' && currentChar <= '9') || currentChar === '.')) {
                return false;
            }
        }

        //Only one period
        let hasPeriod = false;
        for(let i = 0; i < input.length; ++i) {
            let currentChar = input.charAt(i);
            if(currentChar === '.') {
                if(hasPeriod) {
                    return false;
                } else {
                    hasPeriod = true;
                }
            }
        }
        return true;
    }

    coinToUsd(input,ticker) {
        //Buying ONLY
        if(input === '' || input === '.') {
            return '0';
        }
        let parsedInput = parseFloat(input);
        if(ticker === "btc") {
            return '' + ((parsedInput * this.state.btcPrice).toFixed(2));
        } else {
            return '' + ((parsedInput * this.state.ethPrice).toFixed(2));
        }
    }

    getBtcValue() {
        let buySellPanel = this;
        let data = null;
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                buySellPanel.setState({
                    BuySelected : buySellPanel.state.isBuySelected,
                    usdAmount: buySellPanel.state.usdAmount,
                    coinAmount: buySellPanel.state.coinAmount,
                    buyInput: buySellPanel.state.buyInput,
                    sellInput: buySellPanel.state.sellInput,
                    buySelect: buySellPanel.state.buySelect,
                    sellSelect: buySellPanel.sellSelect,
                    btcPrice: parseFloat(this.responseText),
                    ethPrice: buySellPanel.state.ethPrice
                })
            }
        });
        xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/btc");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "daead1f1-6344-42b5-89dc-92981df21b62");
        xhr.send(data);
    }

    getEthValue() {
        let buySellPanel = this;
        let data = null;
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                buySellPanel.setState({
                    BuySelected : buySellPanel.state.isBuySelected,
                    usdAmount: buySellPanel.state.usdAmount,
                    coinAmount: buySellPanel.state.coinAmount,
                    buyInput: buySellPanel.state.buyInput,
                    sellInput: buySellPanel.state.sellInput,
                    buySelect: buySellPanel.state.buySelect,
                    sellSelect: buySellPanel.sellSelect,
                    btcPrice: buySellPanel.state.btcPrice,
                    ethPrice: parseFloat(this.responseText)
                })
            }
        });
        xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/eth");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "daead1f1-6344-42b5-89dc-92981df21b62");
        xhr.send(data);
    }

    displayBuy(){
        this.setState({
            isBuySelected : true,
            usdAmount: '0',
            coinAmount: this.state.coinAmount,
            buyInput: this.state.buyInput,
            sellInput: '',
            buySelect: this.state.buySelect,
            sellSelect: 'btc',
            btcPrice: this.state.btcPrice,
            ethPrice: this.state.ethPrice
        });
    }

    displaySell(){
        this.setState({
            isBuySelected : false,
            usdAmount: this.state.usdAmount,
            coinAmount: '0',
            buyInput: '',
            sellInput: this.state.sellInput,
            buySelect: 'btc',
            sellSelect: this.state.sellSelect,
            btcPrice: this.state.btcPrice,
            ethPrice: this.state.ethPrice
        })
    }

    handleBuySelect(event) {
        this.setState({
            isBuySelected : this.state.isBuySelected,
            usdAmount: this.coinToUsd(this.state.buyInput,event.target.value),
            coinAmount: this.state.coinAmount,
            buyInput: this.state.buyInput,
            sellInput: this.state.sellInput,
            buySelect: event.target.value,
            sellSelect: this.state.sellSelect,
            btcPrice: this.state.btcPrice,
            ethPrice: this.state.ethPrice
        });
    }

    handleSellSelect(event) {
        this.setState({
            isBuySelected : this.state.isBuySelected,
            usdAmount: this.state.usdAmount,
            coinAmount: this.coinToUsd(this.state.sellInput,event.target.value),
            buyInput: this.state.buyInput,
            sellInput: this.state.sellInput,
            buySelect: this.state.buySelect,
            sellSelect: event.target.value,
            btcPrice: this.state.btcPrice,
            ethPrice: this.state.ethPrice
        });
    }

    handleBuyInput(event) {
        let input = event.target.value;
        if(!BuySellPanel.validateInput(input)) {
            return
        }
        //Update state
        this.setState({
            isBuySelected : this.state.isBuySelected,
            usdAmount: this.coinToUsd(input,this.state.buySelect),
            coinAmount: this.state.coinAmount,
            buyInput: input,
            sellInput: this.state.sellInput,
            buySelect: this.state.buySelect,
            sellSelect: this.state.sellSelect,
            btcPrice: this.state.btcPrice,
            ethPrice: this.state.ethPrice
        });
    }

    handleSellInput(event) {
        let input = event.target.value;
        if(!BuySellPanel.validateInput(input)) {
            return
        }

        this.setState({
            isBuySelected : this.state.isBuySelected,
            usdAmount: this.state.usdAmount,
            coinAmount: this.coinToUsd(input,this.state.sellSelect),
            buyInput: this.state.buyInput,
            sellInput: input,
            buySelect: this.state.buySelect,
            sellSelect: this.state.sellSelect,
            btcPrice: this.state.btcPrice,
            ethPrice: this.state.ethPrice
        })
    }

    displayForm() {
        if (this.state.isBuySelected) {
            return <form>
                Select coin:
                <select value={this.state.buySelect} onChange={this.handleBuySelect.bind(this)}>
                    <option value="btc">BTC</option>
                    <option value="eth">ETH</option>
                </select>
                <br/>
                Enter coin amount: <input value={this.state.buyInput} onChange={this.handleBuyInput.bind(this)}/>
                <br/>
                Total cost: ${this.state.usdAmount}
                <br/>
                <button onClick={null}>Buy</button>
            </form>
        } else {
            return <form>
                Select coin:
                <select value={this.state.sellSelect} onChange={this.handleSellSelect.bind(this)}>
                    <option value="btc">BTC</option>
                    <option value="eth">ETH</option>
                </select>
                <br/>
                Enter coin amount: <input value={this.state.sellInput} onChange={this.handleSellInput.bind(this)}/>
                <br/>
                Total value: ${this.state.coinAmount}
                <br/>
                <button onClick={null}>Sell</button>
            </form>
        }
    }

    render() {
        return (
            <div className="buy-sell-panel" >
                <h1>Buy / Sell</h1>
                <div className="tab">
                    <button onClick={this.displayBuy.bind(this)}>Buy</button>
                    <button onClick={this.displaySell.bind(this)}>Sell</button>
                </div>
                <div className="tabcontent">
                    {this.displayForm()}
                </div>
            </div>
        )
    }
}

export default BuySellPanel;
