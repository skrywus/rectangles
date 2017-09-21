import React from 'react';
import {shallow, mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';

const mockStore = configureMockStore([ thunk ]);
const storeStateMock = {
    myReducer:{
        someState: 'ABC'
    }
};

let store;
let component;

test('render App without crash', () => {
    store = mockStore(storeStateMock);
    const wrapper = shallow(<App store={store}/>);
    expect(wrapper.length === 1).toEqual(true);
});
