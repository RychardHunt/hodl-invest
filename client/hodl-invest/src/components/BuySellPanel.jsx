import React, {Component} from 'react'
import './BuySellPanel.css'

export default class BuySellPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyIsSelected : true,
            dollars: "",
            coins: "",
            buyInput: "",
            sellInput: ""
        }
    }

    buy(event) {
        event.preventDefault();
        console.log(this.state.buyInput)
    }

    sell(event) {
        event.preventDefault();
        console.log(this.state.sellInput)
    }

    displayBuy(){
        this.setState({
            buyIsSelected: true,
            dollars: "0",
            coins: this.state.coins,
            buyInput: this.state.buyInput,
            sellInput: ""
        })
    }

    displaySell(){
        this.setState({
            buyIsSelected: false,
            dollars: this.state.dollars,
            coins: "0",
            buyInput: "",
            sellInput: this.state.sellInput
        })
    }

    handleBuyInput(event) {
        this.setState({
            buyIsSelected: this.state.buyIsSelected,
            dollars: this.state.dollars,
            coins: "processing",
            buyInput: event.target.value,
            sellInput: this.state.sellInput
        })
    }

    handleSellInput(event) {
        this.setState({
            buyIsSelected: this.state.buyIsSelected,
            dollars: "processing",
            coins: this.state.coins,
            buyInput: this.state.buyInput,
            sellInput: event.target.value
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
                            Enter amount: <input className="buy" value={this.state.buyInput} onChange={this.handleBuyInput.bind(this)} type="text" />
                            <br/>
                            Total: {this.state.coins} BTC
                            <br/>
                            <button onClick={this.buy.bind(this)}>Buy</button>
                        </form>
                        :
                        <form>
                            Enter amount: <input className="sell" value={this.state.sellInput} onChange={this.handleSellInput.bind(this)} type="text" />
                            <br/>
                            Total: ${this.state.dollars}
                            <br/>
                            <button onClick={this.buy.bind(this)}>Sell</button>
                        </form>
                    }
                </div>
            </div>
        )
    }
}