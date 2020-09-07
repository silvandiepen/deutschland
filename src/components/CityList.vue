<template>
	<ul class="city-list">
		<li
			v-for="(plate, idx) in data"
			:key="idx"
			:class="[plate.code.length == 1 ? 'short' : 'long']"
		>
			<span>{{ plate.code }}</span>
			<span>{{ plate.city }}</span>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		searchType: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss">
.city-list {
	li {
		display: flex;
		margin-top: 1em;
		& + li.short {
			margin-top: 1.5em;
		}
		&.short {
			font-size: 1.25em;
		}

		span:first-child {
			display: block;
			width: 4rem;
			font-weight: bold;
		}
	}
}
</style>
