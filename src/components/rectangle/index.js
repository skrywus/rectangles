import React from 'react';
import {addRectangleRequest, clearStoreRequest} from '../../state/actions';
import {connect} from 'react-redux';
import {getRectangleNumber, getRectangleTotalWidth} from '../../state/selectors';
import {LINE_STYLE, BG_STYLE} from '../../services/config';
import {drawRectangle} from '../../services/utils';

class AddRectangle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    showMenu() {
        if (!this.state.showMenu) {
            this.setState({showMenu: true});
        } else {
            this.setState({showMenu: false});
        }
    };

    redrawRectangles(c, style) {
        const {rectangles} = this.props;

        rectangles.data.forEach(rect => {
            drawRectangle(c, rect, style)
        })
    }

    createNewRectangle(event) {
        const {addRectangleRequest, counter, canvas} = this.props;
        if(counter >= 5) {
            alert('You can create up to 5 rectangles.');
            return false;
        }

        this.setState({showMenu: false});

        const c = canvas.refs.canvasForRectangles;
        const newRectangleParams = {
            x: event.target.x.value,
            y: event.target.y.value,
            width: event.target.width.value,
            height: event.target.height.value
        };

        drawRectangle(c, newRectangleParams);
        addRectangleRequest(newRectangleParams);

        event.preventDefault();
    }

    checkWidthSum(event) {
        const {totalWidth} = this.props;
        const newRectangleWidth = parseInt(event.target.value, 0);

        if( totalWidth+newRectangleWidth > window.innerWidth) {
            event.persist();
            setTimeout(() => {
                alert('Width of all rectangles can\'t be larger then window width. \nPlease set smaller width than \b' + (window.innerWidth-totalWidth) + '\b');
                event.target.value = '';
            }, 5);
            event.preventDefault();
        }
    }

    clearCanvas() {
        const {clearStoreRequest} = this.props;
        clearStoreRequest();
    }

    printPage() {
        const {canvas} = this.props;
        const c = canvas.refs.canvasForRectangles;
        let destCtx = c.getContext('2d');
        destCtx.fillStyle = LINE_STYLE;
        destCtx.fillRect(0,0,c.width,c.height);

        this.redrawRectangles(c, {style: BG_STYLE});

        const printPage = window.open(document.URL, '_blank');
        const img = c.toDataURL("image/png");
        printPage.document.write('<img src="'+img+'"/>');
        setTimeout(() => {
            printPage.document.close(); //this seems to be the thing doing the trick
            printPage.focus();
            printPage.print();
            printPage.close();
        }, 5);

        destCtx.clearRect(0, 0, c.width, c.height);
        this.redrawRectangles(c, {style: LINE_STYLE});
    }

    render() {
        const {counter, totalWidth} = this.props;
        return (
            <div className="menu">
                {counter < 5 && totalWidth < window.innerWidth &&
                <button className="btn btn-primary" onClick={() => this.showMenu()}>{this.state.showMenu ? '⇽' : '⇾'} New rectangle</button>}&nbsp;
                <button className="btn btn-primary" onClick={() => this.clearCanvas()}>Clear all</button>&nbsp;
                <button className="btn btn-primary" onClick={() => this.printPage()}>Print!</button>
                {this.state.showMenu && <div className="menuContent">
                    <form onSubmit={(event) => this.createNewRectangle(event, false)}>
                        <label>
                            Width:<input name="width" onChange={(event) => this.checkWidthSum(event)} type="number" min={1} required={true} placeholder={1}/>
                        </label>
                        <label>
                            Height:<input name="height" type="number" min={1} required={true} placeholder={1}/>
                        </label>
                        <label>
                            PositionX:<input name="x" type="number" min={0} required={true} placeholder={0} max={window.innerWidth}/>
                        </label>
                        <label>
                            PositionY:<input name="y" type="number" min={0} required={true} placeholder={0} max={window.innerHeight}/>
                        </label>
                        <input className="btn btn-success" type="submit" value="Create"/>
                    </form>
                </div>}
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    counter: getRectangleNumber(state),
    totalWidth: getRectangleTotalWidth(state)
});

const mapDispatchToProps = {
    addRectangleRequest,
    clearStoreRequest
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRectangle);