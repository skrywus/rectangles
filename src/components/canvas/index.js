import React from 'react';
import {LINE_WIDTH, LINE_STYLE} from '../../services/config';

class CanvasArea extends React.Component {

    componentDidUpdate() {
        const {rectangles} = this.props;
        //console.log(this.refs.canvasForRectangles);
        const myCanvas = this.refs.canvasForRectangles;
        this.ctx = myCanvas.getContext("2d");
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        if(rectangles.data.length > 0) {
            rectangles.data.forEach((rect) => {
                this.createNewRectangle({
                    width: rect.width,
                    height: rect.height,
                    x: rect.x,
                    y: rect.y
                })
            })
        }
    }

    createNewRectangle(rectangle) {
        this.ctx.beginPath();
        this.ctx.lineWidth = LINE_WIDTH;
        this.ctx.strokeStyle = LINE_STYLE;
        this.ctx.rect(
            rectangle.x,
            rectangle.y,
            rectangle.width,
            rectangle.height
        );
        this.ctx.stroke();
    }

    render() {
        return (
            <canvas id="canvasForRectangles" ref="canvasForRectangles" ></canvas>
        );
    }
};

export default CanvasArea;