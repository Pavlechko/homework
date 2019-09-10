import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export const store  = createStore(promiseReducer, applyMiddleware(thunk));
store.subscribe(()=>console.log(store.getState()));

function promiseReducer(state, action){
    if (!state){
      return {}
    }
    if (action.type === 'PROMISE'){
      return {...state, [action.name]: {status: action.status, payload: action.payload, error: action.error}}
    }
      return state;
    }

export default promiseReducer;
