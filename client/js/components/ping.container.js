import { connect } from 'react-redux';
import { ping } from 'ducks/ping';
import Ping from './ping.component';
import selectPong from 'selectors/pong';

const mapStateToProps = (state) => ({
    pong: selectPong(state)
});

const mapDispatchToProps = (dispatch) => ({
    ping: () => {
        dispatch(ping());
    }
});

const VisiblePing = connect(
  mapStateToProps,
  mapDispatchToProps
)(Ping);

export default VisiblePing;
