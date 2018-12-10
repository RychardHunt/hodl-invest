
export const updateCoinPrices = (coin, coinValue) => {


     return (dispatch) => {
      dispatch({
        type: "UPDATE",
        payload: {
          coin: [coin],
          value: coinValue
        }

      });

    }
}
