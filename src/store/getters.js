export const feeds = state => state.feeds

export const user = state => state.user

export const getFeedById  = (state, getters) => (id) => {
	return state.feeds.find(feed => feed.id === id)
}
