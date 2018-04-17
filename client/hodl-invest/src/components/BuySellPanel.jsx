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
            sellSelect: 'btc'
        }
    }

    displayBuy(){
        this.setState({
            isBuySelected : true,
            usdAmount: '0',
            coinAmount: this.state.coinAmount,
            buyInput: this.state.buyInput,
            sellInput: '',
            buySelect: this.state.buySelect,
            sellSelect: 'btc'
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
            sellSelect: this.state.sellSelect
        })
    }

    handleBuySelect(event) {
        this.setState({
            isBuySelected : this.state.isBuySelected,
            usdAmount: this.state.usdAmount,
            coinAmount: this.state.coinAmount,
            buyInput: this.state.buyInput,
            sellInput: this.state.sellInput,
            buySelect: event.target.value,
            sellSelect: this.state.sellSelect
        })
    }

    handleSellSelect(event) {
        this.setState({
            isBuySelected : this.state.isBuySelected,
            usdAmount: this.state.usdAmount,
            coinAmount: this.state.coinAmount,
            buyInput: this.state.buyInput,
            sellInput: this.state.sellInput,
            buySelect: this.state.buySelect,
            sellSelect: event.target.value
        })
    }

    validateInput(input) {
        for(let i = 0; i < input.length; ++i) {
            let currentChar = input.charAt(i);
            if(!((currentChar >= '0' && currentChar <= '9') || currentChar === '.')) {
                return false;
            }
        }
        return true;
    }

    getCoinValue(ticker) {
        var data = null;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/eth");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "daead1f1-6344-42b5-89dc-92981df21b62");

        xhr.send(data);
    }

    convertToUsd(ticker,coinAmount) {

    }

    convertToCoin(ticker,usdAmount) {

    }

    handleBuyInput(event) {
        let input = event.target.value;
        if(!this.validateInput(input)) {
            return
        }
        //Update state
        this.setState({
            sBuySelected : this.state.isBuySelected,
            usdAmount: this.state.usdAmount,
            coinAmount: this.state.coinAmount,
            buyInput: input,
            sellInput: this.state.sellInput,
            buySelect: this.state.buySelect,
            sellSelect: event.target.value
        })
    }

    handleSellInput(event) {
        this.getCoinValue('btc');
        let input = event.target.value;
        if(!this.validateInput(input)) {
            return
        }

        this.setState({
            sBuySelected : this.state.isBuySelected,
            usdAmount: this.state.usdAmount,
            coinAmount: this.state.coinAmount,
            buyInput: this.state.buyInput,
            sellInput: input,
            buySelect: this.state.buySelect,
            sellSelect: event.target.value
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
                Enter amount: <input value={this.state.buyInput} onChange={this.handleBuyInput.bind(this)}/>
                <br/>
                Total: {this.state.coinAmount} CoinType
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
                Enter amount: <input value={this.state.sellInput} onChange={this.handleSellInput.bind(this)}/>
                <br/>
                Total: ${this.state.usdAmount}
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
