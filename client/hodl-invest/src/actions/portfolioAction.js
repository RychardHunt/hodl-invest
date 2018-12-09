export const buyCoins = (coin, quantity) => {
  return (dispatch) => {
   dispatch({
     type: "BUY",
     payload: {
       coin: coin,
       quantity: quantity,

     }

   });

 }

}

export const sellCoins = (coin, quantity) => {
  return (dispatch) => {
   dispatch({
     type: "SELL",
     payload: {
       coin: coin,
       quantity:quantity
     }

   });

 }

}


export const initialize = (coinList) => {
  return (dispatch) => {
   dispatch({
     type: "INITIALIZE",
     payload: {
       coinList: coinList
     }

   });

 }

}
