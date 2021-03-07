<template>
  <div class="w-full flex flex-col items-center p-2">
    <h1 class="text-4xl text-white text-center py-4">
      Enter your groups location
    </h1>
    <div v-if="errorStr">
      Sorry, but the following error occurred: {{ errorStr }}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>
    <div v-if="location" class="w-80  rounded shadow-xl overflow-hidden">
      <GoogleMap
        api-key="AIzaSyA0aa6r2T2f4mmDFkiZBrDt3BE9xpv_8-s"
        style="width: 100%; height: 500px"
        :center="{ lat: lat, lng: lng }"
        :zoom="15"
      >
        <Marker :options="{ position: { lat: lat, lng: lng } }" />
      </GoogleMap>
    </div>
    <div class="pt-4  text-center ">
      <h2 class="text-white text-center py-1.5">Find your location here</h2>
      <vue-google-autocomplete
        ref="address"
        id="map"
        classname="form-control"
        placeholder="Please type your address"
        v-on:placechanged="getAddressData"
        types=""
        size="38"
        class="px-2 py-1 rounded shadow-xl"
      >
      </vue-google-autocomplete>
    </div>
    <transition name="fade">
      <div
        v-if="lat && lng"
        @click="changePage('room')"
        class="mt-4 bg-white rounded-xl px-4 py-1 text-lg"
      >
        confirm
      </div>
    </transition>
  </div>
</template>

<script>
//https://www.raymondcamden.com/2019/09/01/using-geolocation-with-vuejs

import { GoogleMap, Marker } from "vue3-google-map";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "createRoom",
  components: { GoogleMap, Marker, VueGoogleAutocomplete },
  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null,
      lat: null,
      lng: null,
      address: ""
    };
  },

  methods: {
    changePage(newPage) {
      this.$store.commit("setPageSelected", newPage);
    },


    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     */
    getAddressData(addressData) {
      this.address = addressData;
      this.lat = addressData.latitude;
      this.lng = addressData.longitude;
    },
    resetInput() {
      this.address = "";
      this.$refs.address.clear();
    }
  },

  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }

    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gettingLocation = false;
        this.location = pos;
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        console.log(this.lat);
      },
      err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },

  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
  }
};
</script>