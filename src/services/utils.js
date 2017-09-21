import {LINE_STYLE, LINE_WIDTH} from './config';

export const drawRectangle = (myCanvas, rect, data = {}) => {
    const ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = data.width || LINE_WIDTH;
    ctx.strokeStyle = data.style || LINE_STYLE;
    ctx.rect(
        rect.x,
        rect.y,
        rect.width,
        rect.height
    );
    ctx.stroke();
};