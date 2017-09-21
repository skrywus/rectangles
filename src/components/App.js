import React from 'react';
import {connect} from 'react-redux';
import CanvasArea from '../components/canvas';
import AddRectangle from '../components/rectangle';
import {getRectangles} from '../state/selectors';

class App extends React.Component {

    render() {
        const {rectangles} = this.props;
        return (
            <div>
                <AddRectangle canvas={this.canvas} rectangles={rectangles}/>
                <CanvasArea ref={(ref) => this.canvas = ref} rectangles={rectangles}/>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    rectangles: getRectangles(state)
});

export default connect(mapStateToProps, null)(App);