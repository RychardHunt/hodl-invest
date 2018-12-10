import loginReducer from './reducers/loginReducer';
import buySellReducer from './reducers/buySellReducer';
import coinPriceReducer from './reducers/coinPriceReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {combineReducers, createStore, applyMiddleware } from 'redux';

function saveToLocalStorage(state){
  try{
   const serializedState = JSON.stringify(state);
   localStorage.setItem('state', serializedState);

  }
  catch(e){
    console.log(e);
  }

}

function loadFromLocalStorage(){
  try{
      const serializedState = localStorage.getItem('state');
      if(serializedState==null){
          return undefined;
      }
      return JSON.parse(serializedState);

  }
  catch(e){
    console.log(e);
    return undefined;
  }
}


const middleware = [thunk]
const persistedState = loadFromLocalStorage();
const rootReducer = combineReducers({login: loginReducer, portfolio: buySellReducer, coinData : coinPriceReducer})
const store = createStore(rootReducer,
               persistedState,
               composeWithDevTools(applyMiddleware(...middleware))

              );
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
export default store;
