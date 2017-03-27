import * as types from './mutation-types'
import router from '../routes';

export const initFeeds  = ({commit}, payload) => {
	commit(types.PUT_FEED, payload);
};

export const logout  = ({commit}) => {

	localStorage.removeItem('user');

	commit(types.PUT_USER, null);
	commit(types.PUT_FEED, []);

	router.push({'path': '/login'})
};


export const initAuth  = ({commit}, payload) => {

	const URL = `https://api.github.com/user?access_token=${payload}`;

	fetch(URL)
	.then(response => response.json())
	.then(feed =>  {

		const user = {};
		user.login = feed.login;
		user.avatar_url = feed.avatar_url;
		user.token = payload;

		localStorage.setItem('user', JSON.stringify(user));
		commit(types.PUT_USER, user);

		const FEED_URL = `https://api.github.com/users/${user.login}/events?access_token=${user.token}`;
		fetch(FEED_URL)
		.then(response => response.json())
		.then(feed => {
			commit(types.PUT_FEED, feed);
		});

		router.push({'path': '/'})
	});

};

export const loadUser  = ({commit}, payload) => {
	commit(types.PUT_USER, payload);
};