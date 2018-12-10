

export  function getCoinValue(coin, callback){


  const connect_url = "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/" + coin;
  fetch(connect_url).then(function(response) {
    response.text().then(function(text) {
        console.log("John "+ callback);
      callback( coin ,  parseFloat(text));
    });
  });

}



export function validateInput(input) {
  //Only numbers and periods
  for (let i = 0; i < input.length; ++i) {
    let currentChar = input.charAt(i);
    if (!(currentChar >= '0' && currentChar <= '9') || currentChar === '.') {
      return false;
    }
  }
  //Only one period
  let hasPeriod = false;
  for (let i = 0; i < input.length; ++i) {
    let currentChar = input.charAt(i);
    if (currentChar === '.') {
      if (hasPeriod) {
        return false;
      } else {
        hasPeriod = true;
      }
    }
  }
  return true;
}
