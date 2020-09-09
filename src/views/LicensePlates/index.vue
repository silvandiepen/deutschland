<template>
	<div class="license-plates">
		<div class="license-plate">
			<div class="plate">
				<div class="plate__euro">D</div>
				<input
					class="plate__license"
					type="search"
					v-model="searchTerm"
					placeholder="Suchen"
				/>
			</div>
		</div>
		<section class="search-plates">
			<div class="content" v-if="searchTerm.length > 0">
				<div class="results" v-if="searchedPlatesCodes.length > 0">
					<h3>Code</h3>
					<CityList :data="searchedPlatesCodes" />
				</div>
				<p class="no-result" v-else-if="searchTerm.length < 4">
					No Places found with code {{ searchTerm }}
				</p>
				<div class="results" v-if="searchedPlatesCity.length > 0">
					<h3>City</h3>
					<CityList :data="searchedPlatesCity" />
				</div>
				<p class="no-result" v-else>
					No Places found with name {{ searchTerm }}
				</p>
			</div>
		</section>
		<section
			class="detail"
			id="map"
			:class="{ 'detail--active': showMap }"
			@click="showMap != showMap"
		>
			<CityMap :location="location"></CityMap>
			<div class="detail__content">
				{{ location }}
			</div>
			<button class="detail__close" @click="showMap = false"></button>
		</section>
		<section class="all-plates">
			<div class="content">
				<h3>All Codes</h3>
				<CityList :data="allPlates" />
			</div>
		</section>
	</div>
</template>

<script>
import PlatesData from '@/assets/license-plates.json';
import CityList from '@/components/CityList.vue';
import CityMap from '@/components/CityMap.vue';

const flatName = (v) =>
	v
		.toLowerCase()
		.replace(/\u00e4/g, 'ae')
		.replace(/\u00c4/g, 'a')
		.replace(/\u00dc/g, 'u')
		.replace(/\u00d6/g, 'o')
		.replace(/ö/g, 'o')
		.replace(/ü/g, 'u');

export default {
	name: 'Home',
	components: {
		CityList,
		CityMap
	},
	data: function() {
		return {
			searchTerm: '',
			allPlates: PlatesData.plates,
			location: '',
			showMap: false
		};
	},
	computed: {
		searchedPlatesCodes() {
			const filtered = this.allPlates.filter(
				(plate) =>
					flatName(plate.code).includes(flatName(this.searchTerm)) &&
					flatName(plate.code).charAt(0) == flatName(this.searchTerm).charAt(0)
			);
			if (filtered.length < this.allPlates.length) return filtered;
			else return [];
		},
		searchedPlatesCity() {
			const filtered = this.allPlates.filter((plate) =>
				flatName(plate.city).includes(flatName(this.searchTerm))
			);
			if (filtered.length < this.allPlates.length) return filtered;
			else return [];
		}
	},
	methods: {
		setCurrentLocation(code) {
			this.showMap = true;
			this.location = this.allPlates.find(
				(plate) => flatName(plate.code) === flatName(code)
			)['city'];
		}
	},
	watch: {
		'$route.params.id': function(id) {
			this.setCurrentLocation(id);
		},
		searchedPlatesCity: function(list) {
			if (
				list.length == 1 ||
				this.allPlates.find((place) => place.city === this.searchTerm)
			) {
				this.location = list[0].city;
			}
		}
	}
};
</script>

<style src="mapbox-gl/dist/mapbox-gl.css"></style>
<style lang="scss">
@font-face {
	font-family: Nummerschild;
	src: url(~@/assets/fonts/GlNummernschildEng-XgWd.woff);
}
.license-plate {
	margin: auto;
	font-size: 4vw;
	width: 12em;
	display: block;
	padding: 1em;
	.plate {
		border-radius: 0.2em;
		background-color: white;
		padding: 1em;
		display: block;
		overflow: hidden;
		box-shadow: 0em 0em 0em 0.1em black inset, 0em 0em 0.05em 0.1em white inset,
			0.2em 0.2em 1em 0 rgba(0, 0, 0, 0.25),
			0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.25) inset;
		position: relative;
		width: 100%;
		&__euro {
			font-size: 0.75em;
			background-color: blue;
			color: white;
			padding: 1.25em 0.35em 0.35em 0.35em;
			mix-blend-mode: multiply;
			position: absolute;
			top: 0;
			left: 0;
			line-height: 1;
		}
		&__license {
			padding: 0em 0.1em;
			border: none;
			appearance: none;
			-webkit-appearance: none;
			background-color: transparent;
			line-height: 0.5;
			top: 0.15em;
			font-size: 2.5em;
			text-transform: uppercase;
			font-family: Nummerschild;
			outline: none;
			padding-left: 0.5em;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}

.detail {
	position: fixed;
	bottom: 2em;
	right: 2em;
	width: 4em;
	height: 4em;
	border-radius: 2em;
	z-index: 10;
	background-color: white;
	overflow: hidden;
	transition: all 0.3s;
	&--active {
		width: 50vw;
		height: 50vh;
		@media screen and (max-width: 960px) {
			width: calc(100vw - 4em);
		}
		.detail__content {
			transform: scale(1);
			.map__container {
				pointer-events: all;
			}
		}
		.detail__close {
			transform: translate(25%, 25%) scale(1);
		}
	}
	&__content {
		position: absolute;
		bottom: 1em;
		left: 1em;
		background-color: white;
		box-shadow: 0 0 0 0.075em black;
		border-left: 0.5em solid blue;
		color: black;
		font-size: 2em;
		padding: 0.125em;
		border-radius: 0.125em;
		z-index: 1;
		transform: scale(0);
		transition: transform 0.3s 0.3s cubic-bezier(0, 1.25, 0.75, 1.25);
		font-family: Nummerschild;
		.map__container {
			pointer-events: none;
		}
	}
	&__close {
		position: absolute;
		left: 0;
		top: 0;
		transform: translate(25%, 25%);
		background-color: black;
		width: 4em;
		height: 4em;
		border-radius: 2em;
		transform: translate(25%, 25%) scale(0);
		transition: transform 0.3s 0.3s cubic-bezier(0, 1.25, 0.75, 1.25);
		border: none;
		&:focus {
			outline: none;
		}
		&::before,
		&::after {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 2em;
			height: 0.125em;
			background-color: white;
			content: '';
			display: block;
		}
		&::before {
			transform: translate(-50%, -50%) rotate(45deg);
		}
		&::after {
			transform: translate(-50%, -50%) rotate(-45deg);
		}
	}
}

.no-result {
	opacity: 0.5;
}
input {
	width: 100%;
	padding: 1em;
	font-size: 1.5em;
}
.all-plates {
	background-color: #222;
	color: white;
}
h3 {
	color: skyblue;
}
</style>
