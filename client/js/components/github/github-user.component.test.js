import GithubUser from 'components/github/github-user.component';
import React from 'react';
import { mount, shallow } from 'enzyme';

const props = {
    user: {
        avatar: 'https://myimage.com',
        username: 'hally9k',
        id: '123456'
    }
};

describe('components', () => {
    describe('GithubSearch', () => {
        it('should render the user when given a valid user object', () => {
            const enzymeWrapper = mount(<GithubUser {...props} />);

            expect(enzymeWrapper.find('div.github-user img').prop('src')).toBe('https://myimage.com');
            expect(enzymeWrapper.find('div.github-user h2').text()).toBe('hally9k');
            expect(enzymeWrapper.find('div.github-user h4').text()).toBe('ID: 123456');
        });

        it('mounts the component', () => {
            const enzymeWrapper = shallow(<GithubUser {...props} />);
            expect(enzymeWrapper).toMatchSnapshot();
        });
    });
});
