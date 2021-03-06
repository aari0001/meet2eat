<template>
  <div
    @touchmove="touchmove"
    @touchstart="touchstart"
    @touchend="touchend"
    class="w-full h-full flex flex-col"
  >
    <div class="relative w-full pt-16">
      <transition name="fade" mode="out-in">
        <div
        class="w-72 rounded-lg  p-2 bg-white shadow-lg absolute mx-auto transition-all -translate-x-1/2 transform flex flex-col"
        :style="
          `left: calc(50% + ${currentPos - startPos}px); transition-duration: ${
            touching ? '10ms' : '300ms'
          }`
        "
        :key="currentPlace"
      >
        <h1 class="text-2xl text-gray-700">
          {{ placeData[currentPlace].name }}
        </h1>
        <div class="py-2">
          <img :src="placeData[currentPlace].img" alt="photo" />
        </div>
        <div class="w-full flex flex-row justify-between pb-4">
          <div class="text-gray-500">
            rating: {{ placeData[currentPlace].rating }}/5
          </div>
          <div
            :class="
              placeData[currentPlace].place.opening_hours.open_now
                ? 'text-green-400'
                : 'text-red-400'
            "
          >
            {{
              placeData[currentPlace].place.opening_hours.open_now
                ? "open"
                : "closed"
            }}
          </div>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectRestaurant",
  data() {
    return {
      startPos: 0,
      currentPos: 0,
      swipe: "none",
      touching: false,
      disableTransition:false,
      currentPlace: 0,
      placeData: [
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: {
                lat: -37.8206276,
                lng: 144.9551461
              },
              viewport: {
                south: -37.8219320802915,
                west: 144.9536826197085,
                north: -37.8192341197085,
                east: 144.9563805802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
            name: "Best Western Melbourne City Hotel",
            opening_hours: {
              open_now: true
            },
            photos: [
              {
                height: 683,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/112250048383748281682">Best Western Melbourne City Hotel</a>'
                ],
                width: 1024
              }
            ],
            place_id: "ChIJWXdjjVFd1moRh_LdkkyRy5s",
            plus_code: {
              compound_code: "5XH4+P3 Melbourne VIC, Australia",
              global_code: "4RJ65XH4+P3"
            },
            rating: 4,
            reference: "ChIJWXdjjVFd1moRh_LdkkyRy5s",
            scope: "GOOGLE",
            types: [
              "cafe",
              "lodging",
              "restaurant",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 658,
            vicinity: "16 Spencer Street, Melbourne",
            html_attributions: []
          },
          name: "Best Western Melbourne City Hotel",
          location: {
            lat: -37.8206276,
            lng: 144.9551461
          },
          rating: 4,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJEO3o-UEPzDwMdq1QohTc2NTdQPINeFZ2I_8hjY1iz466Kq_Ldcd0CJF0KSvuOtVBIOjfP_sno3oONr3EsPxlAOSbN4MY2sGSnuOlK3zC4JgWDmfyBSXB9zGarJCT8Ccbaa1MyyUOZCt9UbDNUI7EBUzBWCo9uNGQyGjm9L-m7euJy&3u1024&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=117430"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: {
                lat: -37.8206272,
                lng: 144.9560104
              },
              viewport: {
                south: -37.8220035302915,
                west: 144.9546723697085,
                north: -37.8193055697085,
                east: 144.9573703302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
            name: "Adina Apartment Hotel Melbourne Northbank",
            opening_hours: {
              open_now: true
            },
            photos: [
              {
                height: 2671,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/114976236005166041690">Adina Apartment Hotel Melbourne Northbank</a>'
                ],
                width: 4000
              }
            ],
            place_id: "ChIJBb0EHFJd1moRrXAxsiU3MRE",
            plus_code: {
              compound_code: "5XH4+PC Melbourne VIC, Australia",
              global_code: "4RJ65XH4+PC"
            },
            rating: 4.3,
            reference: "ChIJBb0EHFJd1moRrXAxsiU3MRE",
            scope: "GOOGLE",
            types: [
              "lodging",
              "restaurant",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 445,
            vicinity: "550 Flinders Street, Melbourne",
            html_attributions: []
          },
          name: "Adina Apartment Hotel Melbourne Northbank",
          location: {
            lat: -37.8206272,
            lng: 144.9560104
          },
          rating: 4.3,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIehL_9fNHSK8P9jCn916y1MyPmcLRvMN7vJizYK3Oz5_2iRTGsdAgDzyRoDNjbi0zIPVlI4aR9JB7Umj1Jwx5lQl17AZzsG_kJB6usuSECz_gpiwcAKKYfYA58pAeDErMcJkwMuqnM0BmyOUlQbWGnHJHuO2Z3k2jssWLu6LWg8rH5&3u4000&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=47691"
        }
      ],
      restaurantInfo: {},
    };
  },
  methods: {
    touchstart(e) {
      this.touching = true;
      this.disableTransition = false
      this.startPos = e.changedTouches["0"].screenX;
      this.currentPos = e.changedTouches["0"].screenX;
    },
    touchmove(e) {
      if (this.touching) {
        this.currentPos = e.changedTouches["0"].screenX;

        if (
          e.changedTouches["0"].screenX - this.startPos >
          window.innerWidth / 3
        ) {
          this.swipe = "right";
        } else if (
          e.changedTouches["0"].screenX - this.startPos <
          -window.innerWidth / 3
        ) {
          this.swipe = "left";
        }
      }
    },
    touchend() {
      this.currentPos = 0;
      this.startPos = 0;
      this.touching = false;
    }
  },
  watch: {
    swipe: function(swipe) {
      if (this.swipe !== "none") {
        this.disableTransition = true
        this.touchend();
        this.restaurantInfo[this.placeData[this.currentPlace]] = swipe === 'right'
        this.swipe = "none";
        if (this.currentPlace === this.placeData.length - 1) {
          this.$store.commit('setPageSelected', 'login')
        } else {
          this.currentPlace += 1;
        }

      }
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>