import React, {Component} from 'react';
import './FacebookLogin.css';

class FacebookLogin extends Component {



//   (function(d, s, id) {
//     var js,
//       fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {
//       return;
//     }
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }
//
// (document, 'script', 'facebook-jssdk'));
//
//
//
//     window.fbAsyncInit = function() {
//       FB.init({
//         appId      : '188448561938544',
//         cookie     : true,
//         xfbml      : true,
//         version    : 'v2.8'
//       });
//     }
//     FB.getLoginStatus(function(response) {
//         statusChangeCallback(response);
//     });
//
//
//
//     (function(d, s, id){
//        var js, fjs = d.getElementsByTagName(s)[0];
//        if (d.getElementById(id)) {return;}
//        js = d.createElement(s); js.id = id;
//        js.src = "https://connect.facebook.net/en_US/sdk.js";
//        fjs.parentNode.insertBefore(js, fjs);
//      }(document, 'script', 'facebook-jssdk'));
//
//      function statusChangeCallback(reponse){
//        if(response.status==='connected'){
//          console.log("log in and authenticated");
//        }
//        else{
//          console.log("Not logged in");
//        }
//      }
  //
  // function statusChangeCallback(reponse) {
  //   if (response.status === 'connected') {
  //     console.log("log in and authenticated");
  //   } else {
  //     console.log("Not logged in");
  //   }
  // }
  render() {

    return (<div class="container">
      <button>
        loginWithFacebook</button>

    </div>)
  }
}

export default FacebookLogin;
