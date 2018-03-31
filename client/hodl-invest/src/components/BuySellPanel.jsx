import React, {Component} from 'react'
import './BuySellPanel.css'

export default class BuySellPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDisplayed: this.sellMenu()
        }
    }

    buyMenu() {
        return <form>
            Enter amount: <input type="text" />
            <br/>
            Total: 0 BTC
            <br/>
            <button>Buy</button>
        </form>
    }

    sellMenu() {
        return <form>
            Enter amount: <input type="text" />
            <br/>
            Total: $0
            <br/>
            <button>Sell</button>
        </form>
    }

    renderBuy() {
        this.setState({menuDisplayed: this.buyMenu()});
    }

    renderSell() {
        this.setState({menuDisplayed: this.sellMenu()});
        alert('Hellow!')
    }

    render() {
        return (
            <div className="buy-sell-panel" >
                <h1>Purchase / Sell</h1>
                <div className="tab">
                    <button onClick={() => alert('will change menu to buy')}>Buy</button>
                    <button onClick={() => alert('will change menu to sell')}>Sell</button>
                </div>
                <div className="tabcontent">
                    {this.state.menuDisplayed}
                </div>
            </div>
        )
    }
}
