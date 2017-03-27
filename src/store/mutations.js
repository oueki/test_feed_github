import * as types from './mutation-types'

export default {

	[types.PUT_FEED] (state, feeds) {
		state.feeds = feeds;
	},

	[types.PUT_USER] (state, user) {
		state.user = user;
	}

}
