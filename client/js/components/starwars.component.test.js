import { mount } from 'enzyme';
import React from 'react';
import StarWars from 'components/starwars.component';

function setup(testKey) {
    const props = {
        people: {
            fetchStarWarsPeople: jest.fn(),
            people: [],
            error: null
        },
        error: {
            fetchStarWarsPeople: jest.fn(),
            people: null,
            error: {
                message: 'ajax error 404'
            }
        }
    }[testKey];

    const enzymeWrapper = mount(<StarWars {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('components', () => {
    describe('StarWars', () => {
        it('should render the table of StarWars people', () => {
            const { enzymeWrapper, props } = setup('people');
            expect(enzymeWrapper.find('.ReactTable').exists()).toBe(true);
            expect(enzymeWrapper.find('div.error-block').exists()).toBe(false);
            expect(props.fetchStarWarsPeople).toHaveBeenCalled();
        });
        it('should not render the table of StarWars people when in an error state', () => {
            const { enzymeWrapper, props } = setup('error');
            expect(enzymeWrapper.find('.ReactTable').exists()).toBe(false);
            expect(enzymeWrapper.find('div.error-block').exists()).toBe(true);
            expect(props.fetchStarWarsPeople).toHaveBeenCalled();
        });
    });
});
