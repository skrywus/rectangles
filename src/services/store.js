/* global process */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from '../state/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export function createRedux() {

    const middleware = [thunk];
    let store = createStore(
        rootReducer,
        undefined,
        composeWithDevTools(
            applyMiddleware(...middleware),
            autoRehydrate()
        )
    );

    persistStore(store);

    return store;
}