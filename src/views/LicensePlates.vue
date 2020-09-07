<template>
	<div class="license-plates">
		<section class="search-plates">
			<label>
				<input
					type="search"
					v-model="searchTerm"
					placeholder="Search code or city"
				/>
			</label>
			<div v-if="searchTerm.length > 0">
				<div class="results" v-if="searchedPlatesCodes.length > 0">
					<h3>Code</h3>
					<CityList :data="searchedPlatesCodes" />
				</div>
				<p class="no-result" v-else>
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
		<section class="all-plates">
			<h3>All Codes</h3>
			<CityList :data="allPlates" />
		</section>
	</div>
</template>

<script>
import PlatesData from "@/assets/license-plates.json";
import CityList from "../components/CityList.vue";
// @ is an alias to /src

export default {
	name: "Home",
	components: {
		CityList,
	},
	data: function() {
		return {
			searchTerm: "",
			allPlates: PlatesData.plates,
		};
	},
	computed: {
		searchedPlatesCodes() {
			const filtered = this.allPlates.filter(
				(plate) =>
					plate.code.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
					plate.code.toLowerCase().charAt(0) ==
						this.searchTerm.toLowerCase().charAt(0)
			);
			console.log(filtered);
			if (filtered.length < this.allPlates.length) return filtered;
			else return [];
		},
		searchedPlatesCity() {
			const filtered = this.allPlates.filter((plate) =>
				plate.city.toLowerCase().includes(this.searchTerm.toLowerCase())
			);
			console.log(filtered);
			if (filtered.length < this.allPlates.length) return filtered;
			else return [];
		},
	},
};
</script>

<style lang="scss">
section {
	padding: 4vw;
	border-bottom: 2px solid black;
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
