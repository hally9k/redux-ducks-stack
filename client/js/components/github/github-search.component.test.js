import GithubSearch from 'components/github/github-search.component';
import React from 'react';
import { mount, shallow } from 'enzyme';

describe('components', () => {
    describe('GithubSearch', () => {
        it('should render the error message when given an error', () => {
            const props = {
                getGithubUser: jest.fn(),
                user: null,
                error: {
                    message: 'ajax error 404'
                }
            };
            const enzymeWrapper = mount(<GithubSearch {...props} />);

            expect(enzymeWrapper.find('label').text()).toBe('Github User: ');
            expect(enzymeWrapper.find('button').text()).toBe('Get User');
            expect(enzymeWrapper.find('div.error-block').exists()).toBe(true);
            enzymeWrapper.find('button').simulate('click');
            expect(props.getGithubUser).toHaveBeenCalled();
        });

        it('mounts the component', () => {
            const props = {
                getGithubUser: jest.fn(),
                user: null,
                error: {
                    message: 'ajax error 404'
                }
            };
            const enzymeWrapper = shallow(<GithubSearch {...props} />);
            expect(enzymeWrapper).toMatchSnapshot();
        });
    });
});
