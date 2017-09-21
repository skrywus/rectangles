import {handleActions} from 'redux-actions';

import {
    ADD_RECTANGLE,
    STORE_CLEAR
} from './actions';

const initialState = {
    rectangle:
        {
            data: [],
            counter: 0,
            totalWidth: 0
        }
};

const actionsHandlers = {
    [ADD_RECTANGLE]: (state, action) => ({
        ...state,
        rectangle:
            {
                ...state.rectangle,
                data: [...state.rectangle.data, action.payload],
                counter: (state.rectangle.counter+1),
                totalWidth: state.rectangle.totalWidth+parseInt(action.payload.width,0)
            }
    }),
    [STORE_CLEAR]: (state, action) => ({
        rectangle:
            {
                data: [],
                counter: 0,
                totalWidth: 0
            }
    })
};

export default handleActions(actionsHandlers, initialState);
