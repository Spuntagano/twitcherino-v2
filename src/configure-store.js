import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  return createStore(
  	  reducers,
  	  {
        streams: []
      },
  	  compose(
  		  applyMiddleware(
  		    thunkMiddleware,
  		    loggerMiddleware
  		  ),
  		  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  	  )
  	);
}