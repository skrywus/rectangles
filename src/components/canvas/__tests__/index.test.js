import React from 'react';
import {shallow} from 'enzyme';
import CanvasArea from '../index';

test('render CanvasArea without crash', () => {
    const wrapper = shallow(<CanvasArea/>);
    expect(wrapper.length === 1).toEqual(true);
});

test('render CanvasArea with correct ref', () => {
    const wrapper = shallow(<CanvasArea/>);
    expect(wrapper.node.ref === 'canvasForRectangles').toEqual(true);
});