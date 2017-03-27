import Vue from 'vue';
import VueRouter from 'vue-router';

import {routes, scrollBehavior} from './service/router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior
});

router.beforeEach((to, from, next) => {

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!localStorage.user) {
			next({
				path: '/login'
			})
		} else {
			next()
		}
	} else {
		next()
	}

	if (to.matched.some(record => record.meta.noneAuth)) {
		if (localStorage.user) {
			next({
				path: '/'
			})
		} else {
			next()
		}
	} else {
		next()
	}

});

export default router;