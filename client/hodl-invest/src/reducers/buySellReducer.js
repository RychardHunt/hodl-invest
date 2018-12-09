const initialState = {
  coinList: {}
}

export default function buySellReducer(state = initialState, action, coin){


  switch (action.type) {
    case "BUY":
      coin = action.payload.coin.toUpperCase();
      console.log(coin+ " "+ action.payload.quantity+ " logged");
      return {
        ...state,
         coinList: {
           ...state.coinList,
           [coin] :  state.coinList[coin] +action.payload.quantity
         }
       }

    case "INITIALIZE":
      return {
        ...state,
        coinList : action.payload.coinList
      }

    case "SELL":
    coin = action.payload.coin.toUpperCase();
    return {
      ...state,
       coinList: {
         ...state.coinList,
         [coin] : state.coinList[coin] - action.payload.quantity
       }
     }

    default:
      return state;
  }

}
