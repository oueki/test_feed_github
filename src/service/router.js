import Feeds from '../components/Feeds/Feeds.vue';
import Messages from '../components/Feeds/Messages.vue';
import NotFound from '../components/NotFound.vue';
import Login from '../components/Auth/Login.vue';

export const routes = [

	{  path: '/', component: Feeds,  meta: { requiresAuth: true } },
	{  path: '/learn-more/:feedId', name:'readmore', component: Messages,  meta: { requiresAuth: true } },
	{  path: '/login', component: Login, meta: {noneAuth:true} },

	{  path: '*', component: NotFound },

];


export const scrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) {

		return savedPosition

	} else {

		const position = {}
	    if (to.hash) {
			position.selector = to.hash
			return position
	    }

		return { x: 0, y: 0 }
	}
}