# hodl-invest

https://hodl-invest.herokuapp.com/

https://hodl-invest-server.herokuapp.com/

Beta video: https://www.youtube.com/watch?v=PzSBN1chqCE&feature=youtu.be

Landing page: https://hodl-invest.herokuapp.com/landingpage

[![Gitter chat](https://badges.gitter.im/MutualFund/Lobby.png)](https://gitter.im/MutualFund/Lobby)

<h2> Description: </h2>

Hodl Invest is a mock crypto currency exchange simulator where users can use play money to buy and sell virtual bitcoins and see how well they did if they actually made the decision on the real cryptocurrency exchange. Our mission is to make it easier and less daunting for people to get into cryptocurrencies while also creating a fun and interactive experience for intermediate cryptocurrency traders who are interested in testing their investment strategies.


<h2>Minimum Viable Product:</h2>

Users would be able to login to our platform to perform buying and selling virtual bitcoins transactions with play money as well as checking their history of transactions.

<h3>Users would be able to:</h3>

<ol>1. see interactive graphs</ol>
<ol>2. have play money </ol>
<ol>3. buy and sell virtual bitcoins</ol>
<ol>4. check user transactions history</ol>
<ol>5. authenticate through a social media website </ol>


<h2>Add Ons:</h2>
<ol>1. There will be a highscores where users can see who the best performing users are.</ol>
<ol>2. There will be support for more multiple virtual cryptocurrencies.</ol>
<ol>3. Users will be able to refer friends and get additional virtual play money.</ol>
<ol>4. Transactions would account for transaction fees based on the respective cryptocoin. </ol>


<h2>User Stories:</h2>
<ol>1. As a user, I want to be able to buy and sell virtual bitcoins so that I can learn more about the real cryptocurrency market through a real-life stimulator and have better understanding of my investment strategy.</ol>

<ol>2. As a user, I want to be able to see a history of my transactions so that I can see how well my investment strategies are working and create new strategies to adjust the market.</ol>

<ol>3. As a user, I want to be able to check the current portfolio so that I can see at a glance of the total value of my portfolio.</ol>

<ol>4. As an administrator, I want to store user account information so that I can correctly update the corresponding data and offer a reliable experience for users to trade.</ol>
  
<ol>5. As an administrator, I want to interface with cryptocurrency exchanges so that I can have the reliable data for my users to understand the current market movements.</ol>

***

**hodl-invest server API documentation**
https://hodl-invest-server.herokuapp.com/
----

* **https://hodl-invest-server.herokuapp.com/api/v1/users/**


* **Method:**
  

  `GET`  

*  **URL Params**

   **Required:**

* **Data Params**

   **Required:**
   
 * **Sample Call:**

 ```
 var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(null);
 ```

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

* **Data Params**

   **Required:**

   `username=[string]`
   `password=[string]`
   `name=[string]`
   `email=[string]`

* **Sample Call:**
```
var data = JSON.stringify({
  "username": "user",
  "name": "tyler",
  "email": "email@email.com",
  "password": "password"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cache-Control", "no-cache");

xhr.send(data);
```  
* **https://hodl-invest-server.herokuapp.com/api/v1/users/{username}**

* **Method:**
  `GET`
  
*  **URL Params**

   **Required:**

   `username=[string]`

* **Data Params**

   **Required:**

* **Sample Call:**

```
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/users/zoro");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cache-Control", "no-cache");

xhr.send(data);
```

* **Returns JSON:**

```
{
    "username": "zoro",
    "name": "kenny",
    "playMoney": 76909.33368264533,
    "transactions": [
        {
            "cryptocoin": {
                "ticker": "btc",
                "price": 6543
            },
            "amount": 5,
            "transactionType": "BUY",
            "timestamp": "2018-04-12T18:45:49.741"
        },
        {
            "cryptocoin": {
                "ticker": "eth",
                "price": 525
            },
            "amount": 3,
            "transactionType": "SELL",
            "timestamp": "2018-04-12T18:45:49.741"
        },
        {
            "cryptocoin": {
                "ticker": "BTC",
                "price": 7696.888772451555
            },
            "amount": 3,
            "transactionType": "BUY",
            "timestamp": "2018-04-12T19:02:54.113"
        }
    ],
    "portfolio": {
        "BTC": 3
    }
}
```

* **Method:**
  `DELETE`

*  **URL Params**

   **Required:**

   `username=[string]`


* **Data Params**

   **Required:**

   `token=[string]`


* **Sample Call:**

```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("DELETE", "https://hodl-invest-server.herokuapp.com/api/v1/users/ninja");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
```
 
* **https://hodl-invest-server.herokuapp.com/api/v1/users/{username}/transactions**

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**

   **Optional:**

* **Returns JSON:**
```
   [
    {
        "cryptocoin": {
            "ticker": "btc",
            "price": 6543
        },
        "amount": 5,
        "transactionType": "BUY",
        "timestamp": "2018-04-12T18:45:49.741"
    },
    {
        "cryptocoin": {
            "ticker": "eth",
            "price": 525
        },
        "amount": 3,
        "transactionType": "SELL",
        "timestamp": "2018-04-12T18:45:49.741"
    }
]
```

* **https://hodl-invest-server.herokuapp.com/api/v1/users/login**

* **Method:**
  
  `POST`

*  **URL Params**

   **Required:**

* **Data Params**

   **Required:**

   `username=[string]` 
   `password=[string]`

* **Sample Call:**
```
var data = JSON.stringify({
  "username": "zoro",
  "password": "fakepassword"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/login");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
```

* **Returns JSON:**

```
   {
    "token": "bS30Kkpbwj8rvUXtWVZzOKzWGoJjyatLVF17397vNW329gY6wdqJDdlj8BrNhif3",
    "username": "zoro"
}
```

* **https://hodl-invest-server.herokuapp.com/api/v1/users/logout**

* **Method:**
  
  `POST`
  
  **URL Params**

   **Required:**

* **Data Params**

   **Required:**

   `token=[string]`

* **Sample Call:**
```
var data = JSON.stringify({
  "token": "id8qGYO1ClxCIBqZNfUTX9W5EzKgzWJ8unCXcbN3iuTh2qRPTNcYACk2GJKHdkOV"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/logout");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
```


* **https://hodl-invest-server.herokuapp.com/api/v1/users/buy/{ticker}/{amount}**


* **Method:**

  `POST`  

  **URL Params**

   **Required:**
   
   `ticker=[string]`
   `amount=[double]`

* **Data Params**

   **Required:**

   `token=[string]`
   
 * **Sample Call:**

```
var data = JSON.stringify({
  "token": "sBaDqq91QKYfPSILejlE7mlHttqbykbT2EgVZJrGqwroyci9rJRaBvW4WomKBXaD",
  "username": "user"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/buy/xrp/500");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cache-Control", "no-cache");

xhr.send(data);
```

* **https://hodl-invest-server.herokuapp.com/api/v1/users/sell/{ticker}/{amount}**


* **Method:**

  `POST`  

  **URL Params**

   **Required:**
   
   `ticker=[string]`
   `amount=[double]`

* **Data Params**

   **Required:**

   `token=[string]`
   
 * **Sample Call:**

```
var data = JSON.stringify({
  "token": "sBaDqq91QKYfPSILejlE7mlHttqbykbT2EgVZJrGqwroyci9rJRaBvW4WomKBXaD",
  "username": "user"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://hodl-invest-server.herokuapp.com/api/v1/users/sell/xrp/500");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cache-Control", "no-cache");

xhr.send(data);
```


* **https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/{ticker}*


* **Method:**

  `GET`  

  **URL Params**

   **Required:**
   
   `ticker=[string]`

* **Data Params**

   **Required:**
   
 * **Sample Call:**

```
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://hodl-invest-server.herokuapp.com/api/v1/cryptocoins/BTC");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "daead1f1-6344-42b5-89dc-92981df21b62");

xhr.send(data);
```



