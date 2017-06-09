import ErrorBlock from 'components/shared/error-block.component';
import React from 'react';
import { shallow } from 'enzyme';

function setup() {
    const props = {
        message: 'ajax error 404'
    };

    const enzymeWrapper = shallow(<ErrorBlock {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('components', () => {
    describe('ErrorBlock', () => {
        it('should render error when given a an error', () => {
            const { enzymeWrapper } = setup('error');
            expect(enzymeWrapper.find('div.error-block h1').text()).toBe('😢');
            expect(enzymeWrapper.find('div.error-block h2').text()).toBe(
                'ajax error 404'
            );
        });
    });
});
// 😊
