import React, {Component} from 'react'
import './BuySellPanel.css'

export default class BuySellPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyIsSelected : true,
            dollars: "0",
            coins: "0",
            buyInput: "",
            sellInput: "",
            buySelect: "btc",
            sellSelect: "btc"
        }
    }

    buy(event) {
        //event.preventDefault();
        if(this.state.buyInput.length === 0) {
            alert('Please enter an amount.');
            event.preventDefault();
            return;
        }

        let inputDollars = parseFloat(this.state.buyInput);
        let ticker = this.state.buySelect;
        let data = JSON.stringify({
            "ticker": ticker,
            "price": inputDollars
        });
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", this.props.transactionURL);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
        event.preventDefault();
    }

    sell(event) {
        //event.preventDefault();
        if(this.state.sellInput.length === 0) {
            alert('Please enter an amount.');
            event.preventDefault();
            return;
        }
        let inputCoins = parseFloat(this.state.sellInput);
        let ticker = this.state.buySelect;
        let data = JSON.stringify({
            "ticker": ticker,
            "price": inputCoins
        });
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", this.props.transactionURL);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
        event.preventDefault();
    }

    displayBuy(){
        this.setState({
            buyIsSelected: true,
            dollars: "0",
            coins: this.state.coins,
            buyInput: this.state.buyInput,
            sellInput: "",
            buySelect: this.state.buySelect,
            sellSelect: "btc"
        })
    }

    displaySell(){
        this.setState({
            buyIsSelected: false,
            dollars: this.state.dollars,
            coins: "0",
            buyInput: "",
            sellInput: this.state.sellInput,
            buySelect: "btc",
            sellSelect: this.state.sellSelect
        })
    }

    handleBuyInput(event) {
        let input = event.target.value;
        for(let i = 0; i < input.length;++i) {
            let currentChar = input.charAt(i);
            if(currentChar.match(/[a-z]/i)) {
                return;
            }
        }
        this.setState({
            buyIsSelected: this.state.buyIsSelected,
            dollars: this.state.dollars,
            coins: input,
            buyInput: event.target.value,
            sellInput: this.state.sellInput,
            buySelect: this.state.buySelect,
            sellSelect: this.state.sellSelect
        })
    }

    handleSellInput(event) {
        let input = event.target.value;
        for(let i = 0; i < input.length;++i) {
            let currentChar = input.charAt(i);
            if(currentChar.match(/[a-z]/i)) {
                return;
            }
        }
        this.setState({
            buyIsSelected: this.state.buyIsSelected,
            dollars: input,
            coins: this.state.coins,
            buyInput: this.state.buyInput,
            sellInput: event.target.value,
            buySelect: this.state.buySelect,
            sellSelect: this.state.sellSelect
        })
    }

    handleBuySelect(event) {
        this.setState({
            buyIsSelected: this.state.buyIsSelected,
            dollars: this.state.dollars,
            coins: this.state.coins,
            buyInput: this.state.buyInput,
            sellInput: this.state.sellInput,
            buySelect: event.target.value,
            sellSelect: this.state.sellSelect
        })
    }

    handleSellSelect(event) {
        this.setState({
            buyIsSelected: this.state.buyIsSelected,
            dollars: this.state.dollars,
            coins: this.state.coins,
            buyInput: this.state.buyInput,
            sellInput: this.state.sellInput,
            buySelect: this.state.buySelect,
            sellSelect: event.target.value
        })
    }

    render() {
        return (
            <div className="buy-sell-panel" >
                <h1>Purchase / Sell</h1>
                <div className="tab">
                    <button onClick={this.displayBuy.bind(this)}>Buy</button>
                    <button onClick={this.displaySell.bind(this)}>Sell</button>
                </div>
                <div className="tabcontent">
                    {
                        this.state.buyIsSelected?
                        <form>
                            Select crypto:
                            <select value={this.state.buySelect} onChange={this.handleBuySelect.bind(this)}>
                                <option value="btc">BTC</option>
                            </select>
                            <br/>
                            Enter amount: <input className="buy" value={this.state.buyInput} onChange={this.handleBuyInput.bind(this)} type="text" />
                            <br/>
                            Total: {this.state.coins} {this.state.buySelect}
                            <br/>
                            <button onClick={this.buy.bind(this)}>Buy</button>
                        </form>
                        :
                        <form>
                            Select crypto:
                            <select value={this.state.sellSelect} onChange={this.handleSellSelect.bind(this)}>
                                <option value="btc">BTC</option>
                            </select>
                            <br/>
                            Enter amount: <input className="sell" value={this.state.sellInput} onChange={this.handleSellInput.bind(this)} type="text" />
                            <br/>
                            Total: ${this.state.dollars}
                            <br/>
                            <button onClick={this.sell.bind(this)}>Sell</button>
                        </form>
                    }
                </div>
            </div>
        )
    }
}