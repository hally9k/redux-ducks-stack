import ErrorBlock from 'components/shared/error-block.component';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import React, { Component } from 'react';


const columns = [
    {
        id: 0,
        header: 'Name',
        accessor: 'name'
    },
    {
        id: 1,
        header: 'Height',
        accessor: 'height',
        // render: (props) => <span className='height'>{props.value}</span> // eslint-disable-line
    },
    {
        id: 2,
        header: 'Hair Color',
        accessor: 'hair_color'
    },
    {
        id: 3,
        header: 'Skin Color',
        accessor: 'skin_color'
    },
    {
        id: 4,
        header: 'Eye Color',
        accessor: 'eye_color'
    },
    {
        id: 5,
        header: 'Birth Year',
        accessor: 'birth_year'
    },
    {
        id: 6,
        header: 'Gender',
        accessor: 'gender'
    },
    // {
    //     id: 2,
    //     header: 'Mass',
    //     accessor: (d) => d.friend.name // Custom value accessors!
    // },
    // {
    //     id: 3,
    //     header: () => <span>Friend Age</span>,  // eslint-disable-line
    //     accessor: 'friend.age'
    // }
];

class StarWars extends Component {

    componentWillMount() {
        this.props.fetchStarWarsPeople();
    }

    render() {
        const { people, error } = this.props;
        return (
            <div>
                <h1></h1>
                { people &&
                    <ReactTable
                      data={this.props.people}
                      columns={columns}
                      defaultPageSize="5"
                    />
                }
                { error && <ErrorBlock message={error.message} /> }
            </div>
        );
    }
}

StarWars.propTypes = {
    people: PropTypes.array,
    error: PropTypes.object,
    fetchStarWarsPeople: PropTypes.func.isRequired
};

export default StarWars;
