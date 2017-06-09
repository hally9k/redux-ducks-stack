import { createSelector } from 'reselect';
import getGithubAvatars from './avatars';
import getGithubUsernames from './usernames';

const githubUserSelector = createSelector(
    [getGithubUsernames, getGithubAvatars],
    (usernames, avatars) => {
        return usernames
            .keySeq()
            .toArray()
            .reduce((users, id) => {
                const username = usernames.get(id);
                const avatar = avatars.get(id);
                users.push({ username, avatar, id });
                return users;
            }, []);
    }
);

export default githubUserSelector;
