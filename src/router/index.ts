import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'TempHome',
		component: () =>
			import(
				/* webpackChunkName: "LicensePlates" */ '../views/LicensePlates/index.vue'
			)
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
	},
	{
		path: '/about',
		name: 'About',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/license-plates',
		name: 'LicensePlates',
		component: () =>
			import(
				/* webpackChunkName: "LicensePlates" */ '../views/LicensePlates/index.vue'
			)
	},
	{
		path: '/license-plates/:id',
		name: 'LicensePlatesLocation',
		component: () =>
			import(
				/* webpackChunkName: "LicensePlates" */ '../views/LicensePlates/index.vue'
			)
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
