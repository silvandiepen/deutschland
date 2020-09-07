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
    <section class="all-plates">
      <div class="content">
        <h3>All Codes</h3>
        <CityList :data="allPlates" />
      </div>
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
    CityList
  },
  data: function() {
    return {
      searchTerm: "",
      allPlates: PlatesData.plates
    };
  },
  computed: {
    searchedPlatesCodes() {
      const filtered = this.allPlates.filter(
        plate =>
          plate.code.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
          plate.code.toLowerCase().charAt(0) ==
            this.searchTerm.toLowerCase().charAt(0)
      );
      console.log(filtered);
      if (filtered.length < this.allPlates.length) return filtered;
      else return [];
    },
    searchedPlatesCity() {
      const filtered = this.allPlates.filter(plate =>
        plate.city.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(filtered);
      if (filtered.length < this.allPlates.length) return filtered;
      else return [];
    }
  }
};
</script>

<style lang="scss">
section {
  padding: 4vw;
  border-bottom: 2px solid black;
}
@font-face {
  font-family: Nummerschild;
  src: url(../assets/fonts/GlNummernschildEng-XgWd.woff);
}
.license-plate {
  margin: auto;
  max-width: 720px;
  font-size: 4vw;
  padding: 2em;
  .plate {
    border-radius: 0.2em;

    background-color: white;
    display: flex;
    overflow: hidden;
    box-shadow: 0em 0em 0em 0.1em black inset, 0em 0em 0.05em 0.1em white inset,
      0.2em 0.2em 1em 0 rgba(0, 0, 0, 0.25),
      0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.25) inset;
    // border: 0.125em solid black;
    position: relative;
    height: 3em;
    width: 100%;
    &__euro {
      font-size: 0.75em;
      background-color: blue;
      color: white;
      padding: 1.75em 0.35em 0.35em 0.35em;
      mix-blend-mode: multiply;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 2;
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
