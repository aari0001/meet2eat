<template>
    <div class="width-full">
        <div v-if="errorStr">
            Sorry, but the following error
            occurred: {{errorStr}}
        </div>

        <div v-if="gettingLocation">
            <i>Getting your location...</i>
        </div>
        <div v-if="location">
            <GoogleMap
                    api-key="AIzaSyA0aa6r2T2f4mmDFkiZBrDt3BE9xpv_8-s"
                    style="width: 100%; height: 500px"
                    :center="{ lat: lat, lng: lng}"
                    :zoom="15"
            >
                <Marker :options="{ position: { lat: lat, lng: lng} }" />
            </GoogleMap>
        </div>
      <div class="p-2 container text-center">
        <h2 class="text-white text-center">Input your groups location</h2>
        <vue-google-autocomplete
            ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            types=""
            size="40"

        >
        </vue-google-autocomplete>
      </div>


    </div>

</template>

<script>
    //https://www.raymondcamden.com/2019/09/01/using-geolocation-with-vuejs

    import { GoogleMap, Marker } from 'vue3-google-map'
    import VueGoogleAutocomplete   from 'vue-google-autocomplete'

    export default {
        name: "createRoom",
        components: { GoogleMap, Marker, VueGoogleAutocomplete},
        data () {
            return {
                location: null,
                gettingLocation: false,
                errorStr: null,
                lat: null,
                lng: null,
                address: ''
            }
        },
        mounted() {
            // To demonstrate functionality of exposed component functions
            // Here we make focus on the user input
            this.$refs.address.focus();
        },

        methods: {
            /**
             * When the location found
             * @param {Object} addressData Data of the found location
             */
            getAddressData(addressData) {
                this.address = addressData;
                this.lat = addressData.latitude;
                this.lng = addressData.longitude;
            },
            resetInput(){
                this.address = '';
                this.$refs.address.clear();
            }
        },

        created() {
            //do we support geolocation
            if(!("geolocation" in navigator)) {
                this.errorStr = 'Geolocation is not available.';
                return;
            }

            this.gettingLocation = true;
            // get position
            navigator.geolocation.getCurrentPosition(pos => {
                this.gettingLocation = false;
                this.location = pos;
                this.lat = pos.coords.latitude;
                this.lng = pos.coords.longitude;
                console.log(this.lat);
            }, err => {
                this.gettingLocation = false;
                this.errorStr = err.message;
            })
        },


    }
</script>