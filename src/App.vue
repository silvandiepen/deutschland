<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
			<router-link to="/license-plates">License Plates</router-link>
		</div>
		<router-view />
	</div>
</template>

<style lang="scss">
html,
body {
	margin: 0;
	padding: 0;
}
#app {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
		"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
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
.content {
	padding: 2rem;
}
</style>
