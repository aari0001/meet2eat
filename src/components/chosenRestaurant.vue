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
    <div :class="moreInfo ? 'pt-0':'pt-10'" class="transition-all duration-300">
      <button class="bg-red-50 text-lg rounded-full flex flex-row shadow-xl w-38" @click="moreInfo = !moreInfo">
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
      chosenData:         {
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
      moreInfo: false,
      showCard: false,
    }
  },


  mounted() {
  this.showCard = true
  }
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
