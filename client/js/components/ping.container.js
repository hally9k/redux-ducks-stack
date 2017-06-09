import { connect } from 'react-redux';
import { ping } from 'ducks/ping';
import Ping from './ping.component';
import selectPong from 'selectors/pong';

function mapStateToProps(state) {
    return {
        pong: selectPong(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ping: () => {
            dispatch(ping());
        }
    };
}

const VisiblePing = connect(
  mapStateToProps,
  mapDispatchToProps
)(Ping);

export default VisiblePing;
