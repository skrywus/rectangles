import {createAction} from 'redux-actions';

export const ADD_RECTANGLE = 'RECTANGLE/ADD';
export const STORE_CLEAR = 'STORE/CLEAR';

export const addRectangle = createAction(ADD_RECTANGLE);
export const storeClear = createAction(STORE_CLEAR);

export const addRectangleRequest = (values) => {
    return function(dispatch) {
        dispatch(addRectangle(values));
    }
};

export const clearStoreRequest = () => {
    return function(dispatch) {
        dispatch(storeClear());
    }
};