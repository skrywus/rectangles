import React from 'react';
import {shallow, mount} from 'enzyme';
import CanvasArea from '../index';

const rectangles = {
    data: [
        {
            width: 100, height: 100, x: 1, y: 1
        },
        {
            width: 200, height: 200, x: 1, y: 1
        }
    ],
    counter: 2,
    totalWidth: 300
};
test('render CanvasArea without crash', () => {
    const wrapper = shallow(<CanvasArea/>);
    expect(wrapper.length === 1).toEqual(true);
});

test('render CanvasArea with correct ref', () => {
    const wrapper = shallow(<CanvasArea/>);
    expect(wrapper.node.ref === 'canvasForRectangles').toEqual(true);
});

test('mount CanvasArea ', () => {
    const wrapper = mount(<CanvasArea rectangles={rectangles}/>);
    wrapper.instance().componentDidUpdate();
   // expect(wrapper.node.ref === 'canvasForRectangles').toEqual(true);
});