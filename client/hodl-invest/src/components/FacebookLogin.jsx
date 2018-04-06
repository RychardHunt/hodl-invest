import React, {Component} from 'react';
import './FacebookLogin.css';

class FacebookLogin extends Component {


 componentDidMount(){





 }










  render() {

    const FB = window.FB;
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '188448561938544',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.12'
      });


      FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
      });

    };

    (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.12&appId=188448561938544&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response){
  if(response.status==="connected"){
    console.log("Logged In and Authenticated");
  }
  else{
    console.log("Not Authenticated");
  }
}

    return (<div class="container">
    <div class="fb-login-button" data-max-rows="1" data-size="large"
       data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false"
        data-use-continue-as="false"></div>

    </div>)
  }
}

export default FacebookLogin;
