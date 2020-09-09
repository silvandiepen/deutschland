<template>
	<div id="app">
		<div id="nav">
			<router-link to="/Home">Home</router-link>
			<router-link to="/about">About</router-link>
			<router-link to="/license-plates">License Plates</router-link>
		</div>
		<router-view />
		<button class="button--update" v-if="updateExists" @click="refreshApp">
			New version available! Click to update
		</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			refreshing: false,
			registration: null,
			updateExists: false
		};
	},
	created() {
		document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
		navigator.serviceWorker.addEventListener('controllerchange', () => {
			if (this.refreshing) return;
			this.refreshing = true;
			window.location.reload();
		});
	},
	methods: {
		showRefreshUI(e) {
			this.registration = e.detail;
			this.updateExists = true;
		},
		refreshApp() {
			this.updateExists = false;
			if (!this.registration || !this.registration.waiting) {
				return;
			}
			this.registration.waiting.postMessage('skipWaiting');
		}
	}
};
</script>

<style lang="scss">
html,
body {
	margin: 0;
	padding: 0;
}
#app {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
		'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;
}

#nav {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2em;
	a {
		display: block;
		padding: 1em;
		color: inherit;
		text-decoration: none;
	}
}
ul,
li {
	margin: 0;
	padding: 0;
}
.content {
	padding: 2rem;
	max-width: 720px;
	margin: auto;
}
* {
	box-sizing: border-box;
}
.button--update {
	position: fixed;
	bottom: 2em;
	width: auto;
	max-width: 100vw;
	border: none;
	font-size: 1em;
	left: 50%;
	transform: translateX(-50%);
	background-color: #111;
	padding: 1em;
	color: white;
}
</style>
