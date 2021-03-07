<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="text-3xl pt-12 text-white font-medium">You Found a Match!</div>
    <div  class="w-full transition-all transform duration-300" :class="moreInfo ? 'pt-5':'pt-10'">
      <div class="relative  overflow-hidden w-full transition-all duration-300" :class="moreInfo ? 'h-0':'h-80'">
        <transition name="scale">
          <card-template v-if="showCard" class="origin-center left-0 right-0"  >
        <template v-slot:title >
          {{chosenData.name}}
        </template>
        <template v-slot:image>
          <img :src="chosenData.img" alt="photo" />
        </template>
        <template v-slot:address>
          {{chosenData.place.vicinity}}
        </template>
        <template v-slot:rating>
          rating:  <b>{{ chosenData.rating }}/5</b>
        </template>
        <template v-slot:open >
          <div
              :class="
              chosenData.place.opening_hours.open_now
                ? 'text-green-400'
                : 'text-red-400'
            "
          >
            {{
              chosenData.place.opening_hours.open_now
                  ? "open"
                  : "closed"
            }}
          </div>
        </template>
      </card-template>
        </transition>
      </div>
    </div>
    <div :class="moreInfo ? 'pt-0':'pt-10'" class="transition-all duration-300 flex flex-row">
      <button class="bg-white text-lg rounded-full flex flex-row shadow-xl w-32 focus:outline-none" @click="moreInfo = !moreInfo">
        <span class="pl-2 pt-2.5 pb-1.5"  >
        {{moreInfo ? 'less info': 'more info'}}
          </span>
        <span>
  <svg id="burger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49"
       class="stroke-current text-black h-12 px-2 py-3"
       stroke-linecap="round"
       stroke-width="4"
  >
    <circle cx="25" cy="25" r="22" fill="none" />
    <circle r="1" cx="25" cy="15"/>
    <path d=" M25 22 V25 40 Z" stroke-linecap="round"/>
  </svg>
        </span>
      </button>
      <button class="bg-white text-lg rounded-full flex flex-row justify-center shadow-xl w-32 focus:outline-none h-12 ml-5" @click="changePage('login')">
       <span class=" pt-2.5 pb-1.5 text-center"> go again! </span>
      </button>
    </div>
    <transition name="height" >
      <div v-if="moreInfo" class="h-96 bg-white shadow-xl w-72 mt-10 rounded-lg p-2">
        <h1 class="text-2xl text-gray-700">
          {{chosenData.name}}
        </h1>
        <h2 class="text-lg text-gray-800  font-medium pt-3"> tags:</h2>
        <ul class="flex flex-col list-disc list-inside">
          <li v-for="item in chosenData.place.types" :key="item" class="text-gray-800" >
            {{item.replaceAll('_', ' ')}}
          </li>
        </ul>
      </div>
    </transition>

  </div>
</template>

<script>
import CardTemplate from "@/components/misc/cardTemplate";
export default {
name: "chosenRestaurant",
  components: {CardTemplate},
  data() {
    return {
      chosenData: {
        place: {
          business_status: "OPERATIONAL",
          geometry: {
            location: { lat: -37.911784, lng: 145.133304 },
            viewport: {
              south: -37.91313298029151,
              west: 145.1319550197085,
              north: -37.91043501970851,
              east: 145.1346529802915
            }
          },
          icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
          name: "Roll'd Monash",
          opening_hours: { open_now: true },
          photos: [
            {
              height: 2176,
              html_attributions: [
                '<a href="https://maps.google.com/maps/contrib/100781170704439726852">BAHAYA 298E15</a>'
              ],
              width: 4608
            }
          ],
          place_id: "ChIJLXTx8stq1moRwAdi9_ZYQPs",
          plus_code: {
            compound_code: "34QM+78 Clayton VIC, Australia",
            global_code: "4RJ734QM+78"
          },
          rating: 3.2,
          reference: "ChIJLXTx8stq1moRwAdi9_ZYQPs",
          scope: "GOOGLE",
          types: ["restaurant", "food", "point_of_interest", "establishment"],
          user_ratings_total: 27,
          vicinity: "Tenancy G16, Northern Plaza Monash University, Clayton",
          html_attributions: []
        },
        name: "Roll'd Monash",
        location: { lat: -37.911784, lng: 145.133304 },
        rating: 3.2,
        img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLxOJ6Cwlz19lqv30eH9XxlivzVKDrGk1vVjJdXPmwYR_sH7v5R68qADIVUH4LvvQ_1Z-g-0rsy90NFyHr0Roc56rUXa9UOoNknro-8E8RceB77KdcyWG-r5xBVKsc4q6CdChVvKO2N6fuj-0ABMAHTiAaEBlnDcI6tcysmsNv2Y3Ry&3u4608&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=73896"
      },
      moreInfo: false,
      showCard: false,
    }
  },
  methods: {
    changePage(newPage) {
      this.$store.commit("setPageSelected", newPage);
    },
  },


  mounted() {
  this.showCard = true
  },

}
</script>

<style>
*:focus {
  outline: none;
}

.height-enter-active, .height-leave-active {
  transition: all .3s;
  overflow: hidden;
}
.height-enter-from, .height-leave-to  {
  height: 0;
  padding: 0;
}





.scale-enter-active {
  animation: scale-in .5s ;
  transform-origin: center;
  overflow: visible;
}
.scale-leave-active {
  animation: scale-in .5s reverse;
  transform-origin: center;
  overflow: visible;

}
@keyframes scale-in {
  0% {
    transform-origin: center;
    transform: scale(0) ;

  }
  75% {
    transform-origin: center;
    transform: scale(1.2);
  }
  100% {
    transform-origin: center;
    transform: scale(1) ;
  }
}

</style>
