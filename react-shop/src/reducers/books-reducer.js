import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export const store  = createStore(promiseReducer, applyMiddleware(thunk));
store.subscribe(()=>console.log(store.getState()));

function promiseReducer(state, action){
  if (!state){
    return {}
  }
  if (action.type === 'PROMISE'){
    console.log('++++++++');
    console.log(state);
    return {
      ...state,
      [action.name]: {status: action.status,
        payload: action.payload,
        error: action.error}
      }
  }
  if (action.type === 'ADD_BOOK'){
    return {
      ...state,
      [action.name]: [
        ...state.products.payload.getProducts,
        action.payload
      ]
    }
  }
  if (action.tupe === 'REMOVE_BOOK'){
    return {
      ...state,
      [action.name]: {...state.products.payload.getProducts.filter(o => o.id !== action.payload)}
    }
  }
  return state;
}


export default promiseReducer;
