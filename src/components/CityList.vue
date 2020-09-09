<template>
	<ul class="city-list">
		<li
			v-for="(plate, idx) in data"
			:key="idx"
			:class="[plate.code.length == 1 ? 'short' : 'long']"
		>
			<router-link :to="`/license-plates/${plate.code.toLowerCase()}#map`">
				<span>{{ plate.code }}</span>
				<span>{{ plate.city }}</span>
			</router-link>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: () => []
		},
		searchType: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss">
.city-list {
	li {
		list-style-type: none;
		padding: 0;
		margin: 0;
		a {
			color: inherit;
			display: flex;
			text-decoration: none;
			&:hover {
				color: skyblue;
			}
		}
		margin-top: 1em;
		& + li.short {
			margin-top: 1.5em;
		}
		&.short {
			font-size: 1.25em;
		}

		span:first-child {
			display: block;
			font-family: Nummerschild;
			font-size: 1.5em;
			width: 4rem;
		}
		span:last-child {
			opacity: 0.75;
		}
	}
}
</style>
