import Vue from 'vue';

import App from './App.vue'
import router from './routes';
import store from './store';

import moment from 'moment';



Vue.filter('diffdate', (value) => {
	return moment(value).toNow(true) + ' ago';
});


new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
