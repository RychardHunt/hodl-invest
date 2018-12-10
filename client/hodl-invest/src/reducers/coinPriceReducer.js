const initialState = {
  coinPriceList: {}
}
export default function coinPriceReducer(state= initialState, action){
  console.log("Coins are being updated");
  switch(action.type){
    case "UPDATE" :
    return {
      ...state,
      coinPriceList: {
        ...state.coinPriceList,
        [action.payload.coin] :  action.payload.value
      }
    };
    default:
      return state;

  }

}
