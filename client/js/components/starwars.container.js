import { connect } from 'react-redux';
import { fetchPeople } from 'ducks/starwars';
import selectStarWarsPeople from 'selectors/starwars-people';
import StarWars from './starwars.component';

function mapStateToProps(state) {
    return {
        people: selectStarWarsPeople(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStarWarsPeople: () => {
            dispatch(fetchPeople());
        }
    };
}

const VisibleStarWars = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarWars);

export default VisibleStarWars;
