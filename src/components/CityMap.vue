<template>
	<div class="map__container">
		<MglMap
			class="map__wrapper"
			:center="currentLocation"
			:accessToken="accessToken"
			:mapStyle="mapStyle"
			:zoom="zoom"
			:controls="true"
		>
			<MglAttributionControl />
			<MglNavigationControl position="top-right" />
			<MglGeolocateControl position="top-right" />

			<MglScaleControl />
		</MglMap>
	</div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import {
	MglMap,
	MglNavigationControl,
	MglGeolocateControl,
	MglAttributionControl,
	MglScaleControl
} from 'vue-mapbox';

export default {
	name: 'App',
	data() {
		return {
			accessToken:
				'pk.eyJ1Ijoic2lsdmFuZGllcGVuIiwiYSI6ImNpdTQyeWltazAwMWIydXMxMjB3YzdicWYifQ.cbotkDjwZqhw6BgnqLHsmA',
			mapStyle: 'mapbox://styles/silvandiepen/ckesiy0zd74nd19k9yltkan47',
			currentLocation: [51.1577168, 8.2066924],
			zoom: 5
		};
	},
	props: {
		location: { type: String, default: 'Germany' }
	},
	components: {
		MglMap,
		MglNavigationControl,
		MglGeolocateControl,
		MglAttributionControl,
		MglScaleControl
	},
	methods: {
		async geocode(mapboxAccessToken, query) {
			try {
				const res = await fetch(
					'https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/' +
						encodeURIComponent(query) +
						'.json?access_token=' +
						mapboxAccessToken
				);
				const data = await res.json();
				this.currentLocation = data.features[0]
					? data.features[0].center
					: [0, 0];
			} catch (err) {
				console.log(err);
			}
		}
	},
	created() {
		this.mapbox = Mapbox;
	},
	mounted() {
		setTimeout(() => {
			this.geocode(this.accessToken, 'germany');
		}, 1000);
	},
	watch: {
		location: function(val) {
			this.geocode(this.accessToken, val);
			this.zoom = 10;
		}
	}
};
</script>
<style lang="scss">
.map {
	&__container {
		padding: 4vw;
		color: red;
	}
	&__wrapper {
		min-height: 50vh;
		width: 100%;
		border-radius: 1em;
		overflow: hidden;
	}
}
</style>
