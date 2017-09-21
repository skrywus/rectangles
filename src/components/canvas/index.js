import React from 'react';
import {drawRectangle} from '../../services/utils';

class CanvasArea extends React.Component {

    componentDidUpdate() {
        const {rectangles} = this.props;

        const myCanvas = this.refs.canvasForRectangles;
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        if(rectangles.data.length > 0) {
            rectangles.data.forEach((rect) => {
                drawRectangle(myCanvas, rect)
            })
        }
    }

    render() {
        return (
            <canvas id="canvasForRectangles" ref="canvasForRectangles" ></canvas>
        );
    }
};

export default CanvasArea;