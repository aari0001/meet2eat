<template>
  <div
    @touchmove="touchmove"
    @touchstart="touchstart"
    @touchend="touchend"
    class="w-full h-full flex flex-col items-center"
  >
    <div class="pt-10 text-white text-4xl">Nearby restaurants</div>
    <div
      class=" w-full transition-all duration-300"
      :class="moreInfo ? 'pt-5' : 'pt-10'"
    >
      <div
        class="overflow-hidden  mx-auto rounded-xl  transition-all duration-300 relative"
        :class="moreInfo ? 'h-0' : 'h-96'"
      >
        <transition name="fade" mode="out-in">
          <card-template
            :style="
              `left: calc(50% + ${currentPos -
                startPos}px); transition-duration: ${
                touching ? '10ms' : '300ms'
              }`
            "
            :key="currentPlace"
            class="-translate-x-1/2"
          >
            <template v-slot:title>
              {{ placeData[currentPlace].name }}
            </template>
            <template v-slot:image>
              <img :src="placeData[currentPlace].img" alt="photo" />
            </template>
            <template v-slot:address>
              {{ placeData[currentPlace].place.vicinity }}
            </template>
            <template v-slot:rating>
              rating: <b>{{ placeData[currentPlace].rating }}/5</b>
            </template>
            <template v-slot:open>
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
            </template>
          </card-template>
        </transition>
      </div>
    </div>
    <div
      :class="moreInfo ? 'pt-0 mt-0' : 'pt-10  -mt-16'"
      class="transition-all duration-300"
    >
      <button
        class="bg-white text-lg rounded-full flex flex-row shadow-xl w-38"
        @click="moreInfo = !moreInfo"
      >
        <span class="pl-2 pt-2.5 pb-1.5">
          {{ moreInfo ? "less info" : "more info" }}
        </span>
        <span>
          <svg
            id="burger"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 49 49"
            class="stroke-current text-black h-12 px-2 py-3"
            stroke-linecap="round"
            stroke-width="4"
          >
            <circle cx="25" cy="25" r="22" fill="none" />
            <circle r="1" cx="25" cy="15" />
            <path d=" M25 22 V25 40 Z" stroke-linecap="round" />
          </svg>
        </span>
      </button>
    </div>
    <transition name="height">
      <div
        v-if="moreInfo"
        class="h-96 bg-white shadow-xl w-72 mt-10 rounded-lg p-2"
      >
        <h1 class="text-2xl text-gray-700">
          {{ placeData[currentPlace].name }}
        </h1>
        <h2 class="text-lg text-gray-800  font-medium pt-3">tags:</h2>
        <ul class="flex flex-col list-disc list-inside">
          <li
            v-for="item in placeData[currentPlace].place.types"
            :key="item"
            class="text-gray-800"
          >
            {{ item.replaceAll("_", " ") }}
          </li>
        </ul>
      </div>
    </transition>
    <transition name="fade">
      <div
        class="w-full flex flex-col items-center pt-8 text-white text-lg"
        v-if="!moreInfo"
      >
        <div class="transform ">right to like <span>&#10140; </span></div>
        <div
          class="transform mt-4"
          style="animation-direction: alternate-reverse"
        >
          <span class="transform rotate-180 inline-block"> &#10140;</span> left
          to dislike
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CardTemplate from "@/components/misc/cardTemplate";
export default {
  name: "selectRestaurant",
  components: { CardTemplate },
  data() {
    return {
      startPos: 0,
      currentPos: 0,
      swipe: "none",
      touching: false,
      disableTransition: false,
      currentPlace: 0,
      moreInfo: false,
      placeData: [
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.8999885, lng: 145.1293758 },
              viewport: {
                south: -37.90131313029151,
                west: 145.1280685697085,
                north: -37.89861516970851,
                east: 145.1307665302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
            name: "Notting Hill Hotel (The Nott)",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 2448,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/105235079610473560545">Notting Hill Hotel (The Nott)</a>'
                ],
                width: 2448
              }
            ],
            place_id: "ChIJCX48IbFq1moRWdh8xU0uVcQ",
            plus_code: {
              compound_code: "442H+2Q Notting Hill VIC, Australia",
              global_code: "4RJ7442H+2Q"
            },
            price_level: 2,
            rating: 4.2,
            reference: "ChIJCX48IbFq1moRWdh8xU0uVcQ",
            scope: "GOOGLE",
            types: [
              "meal_delivery",
              "meal_takeaway",
              "bar",
              "liquor_store",
              "restaurant",
              "food",
              "point_of_interest",
              "store",
              "establishment"
            ],
            user_ratings_total: 1608,
            vicinity: "260-262 Ferntree Gully Road, Notting Hill",
            html_attributions: []
          },
          name: "Notting Hill Hotel (The Nott)",
          location: { lat: -37.8999885, lng: 145.1293758 },
          rating: 4.2,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLYq6V_hGuIPx_6BAUo5NuMROSeUD9tLgr-sY4xpuWk4TdBmgqJ4Cdz5uSol8PSAuH4K2coR8Z_G_-e70vq1726mY2QNK1HdxXLG6Ucg3rZkG2UCPXOGfvC8HDe9WzGwQQi4lgKzBwtyPniU-82f6dKEul8839oN0o8wdj6sl2SHZa1&3u2448&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=127571"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9066352, lng: 145.1434936 },
              viewport: {
                south: -37.9079841802915,
                west: 145.1421446197085,
                north: -37.9052862197085,
                east: 145.1448425802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "Miah's Sambalicious",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 2988,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/101605467258450411489">Erkuhs Sabre</a>'
                ],
                width: 5312
              }
            ],
            place_id: "ChIJd4wg7ksV1moRtEqiTSEC5-Y",
            plus_code: {
              compound_code: "34VV+89 Notting Hill VIC, Australia",
              global_code: "4RJ734VV+89"
            },
            price_level: 1,
            rating: 4.1,
            reference: "ChIJd4wg7ksV1moRtEqiTSEC5-Y",
            scope: "GOOGLE",
            types: [
              "restaurant",
              "meal_takeaway",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 134,
            vicinity:
              "Level 1, 662-678 Blackburn Rd (entry from Normanby Rd), Notting Hill",
            html_attributions: []
          },
          name: "Miah's Sambalicious",
          location: { lat: -37.9066352, lng: 145.1434936 },
          rating: 4.1,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLJI0Gpv2K7-n-bwGJj0FWYRolmBjJthxDjzNC1RRrkFzjfqOjUPoPMy6UolMDgmjIBCI8wR8YyHUwpSjJUD_QjctKaXwKFffpXfsGlHYIuhne-O7reZjI8M7v1oE4UtGfjZzbEi-vtHGg7tN0NOnu0Verr7N6eMsi63c54pQRLlcuY&3u5312&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=128509"
        },
        {
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
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9116726, lng: 145.132872 },
              viewport: {
                south: -37.91326233029149,
                west: 145.1314291697085,
                north: -37.91056436970849,
                east: 145.1341271302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "Meeting Point",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 3456,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/108941841443900971929">Ulric</a>'
                ],
                width: 5184
              }
            ],
            place_id: "ChIJi5uL8Mtq1moRLhvYuDbWmcc",
            plus_code: {
              compound_code: "34QM+84 Clayton VIC, Australia",
              global_code: "4RJ734QM+84"
            },
            price_level: 2,
            rating: 4.1,
            reference: "ChIJi5uL8Mtq1moRLhvYuDbWmcc",
            scope: "GOOGLE",
            types: ["restaurant", "food", "point_of_interest", "establishment"],
            user_ratings_total: 48,
            vicinity: "Monash University, Ground, 21 Chancellors Walk, Clayton",
            html_attributions: []
          },
          name: "Meeting Point",
          location: { lat: -37.9116726, lng: 145.132872 },
          rating: 4.1,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJ9oAb9qgUgQVqtkk0F_-qZMC8eweeR2iFVBuhO98-80geWh23gpr4bGed2MwjTJ3ESKqA8Kc0ytkz-LJuR3AXSQaXfBDO3jgBYpcvK6tivRy9omUZxzXkrEoXGNy2BNrmLbKl2Yx5ewmSnIChL07qhmX-r1OM8Kunxw-oum0vI1rU&3u5184&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=129627"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9098756, lng: 145.1323205 },
              viewport: {
                south: -37.9112245802915,
                west: 145.1309715197085,
                north: -37.9085266197085,
                east: 145.1336694802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
            name: "Secret Garden Eatery",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 2976,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/115534512734296840453">James Wang</a>'
                ],
                width: 3968
              }
            ],
            place_id: "ChIJk1F41Mtq1moREgIhKa2Mad0",
            plus_code: {
              compound_code: "34RJ+2W Clayton VIC, Australia",
              global_code: "4RJ734RJ+2W"
            },
            price_level: 2,
            rating: 4.2,
            reference: "ChIJk1F41Mtq1moREgIhKa2Mad0",
            scope: "GOOGLE",
            types: [
              "cafe",
              "restaurant",
              "food",
              "point_of_interest",
              "store",
              "establishment"
            ],
            user_ratings_total: 122,
            vicinity: "Monash University, 13 College Walk, Clayton",
            html_attributions: []
          },
          name: "Secret Garden Eatery",
          location: { lat: -37.9098756, lng: 145.1323205 },
          rating: 4.2,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKRXc8HV3vrMPN0JpL8T4y7Vsru-Yx4cQWe6lOjXpS6-CzxIbMEc5QhfItFvN0ihwXEn3RqrPxg8i484r4tisSzl8ayDFG2MQtp9KiAOi9tA-AWtm1tGBDXZCcse7mJJ2gq9u7ipDfbP6upbY1rFo37OUJs4B3H_J2BHiKLieELwsC3&3u3968&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=42213"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.91290889999999, lng: 145.1326043 },
              viewport: {
                south: -37.91425788029149,
                west: 145.1312553197085,
                north: -37.91155991970849,
                east: 145.1339532802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
            name: "Taste Baguette",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 1080,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/105498050084299911316">Tammy Smith</a>'
                ],
                width: 1920
              }
            ],
            place_id: "ChIJNbRDYCFr1moRSnmWUnhLFxk",
            plus_code: {
              compound_code: "34PM+R2 Clayton VIC, Australia",
              global_code: "4RJ734PM+R2"
            },
            rating: 3.9,
            reference: "ChIJNbRDYCFr1moRSnmWUnhLFxk",
            scope: "GOOGLE",
            types: [
              "cafe",
              "bakery",
              "restaurant",
              "food",
              "point_of_interest",
              "store",
              "establishment"
            ],
            user_ratings_total: 44,
            vicinity:
              "Monash University Clayton Campus, Wellington Road, Clayton",
            html_attributions: []
          },
          name: "Taste Baguette",
          location: { lat: -37.91290889999999, lng: 145.1326043 },
          rating: 3.9,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKE6umIqDFK58bBVazzTv8ZV0Tes-8_KoK0DcjAIIuwjGlNC59M8TOaZt24euwpT-pKWq6BK9OsS22CAVRbbWCOdwn98Lm1t99WY0i-beWMAcrJKhIHeigaWCWJlZZoIGnkbUT9eOVqTYk3iYzsdTLSZ_SVCfvsjwdUWSkf06CUB7lG&3u1920&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=46523"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9075, lng: 145.1411111 },
              viewport: {
                south: -37.90869883029151,
                west: 145.1398143697085,
                north: -37.90600086970851,
                east: 145.1425123302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "MRS Halls Cafe",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 2432,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/103629649765013588419">Rishabh Chakravorty</a>'
                ],
                width: 3286
              }
            ],
            place_id: "ChIJv9hPsEsV1moRXpFmIptz_V4",
            plus_code: {
              compound_code: "34VR+2C Clayton VIC, Australia",
              global_code: "4RJ734VR+2C"
            },
            price_level: 1,
            rating: 4.3,
            reference: "ChIJv9hPsEsV1moRXpFmIptz_V4",
            scope: "GOOGLE",
            types: [
              "restaurant",
              "university",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 28,
            vicinity: "Monash University, 58 College Way, Clayton",
            html_attributions: []
          },
          name: "MRS Halls Cafe",
          location: { lat: -37.9075, lng: 145.1411111 },
          rating: 4.3,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIlpUWa503o7jmbw2vwayQ09eD927Nc1gdopMT_JYaTaAqdUUkGWggOiX-XZ_ZGxnv0h231cWzuhPA_e45p-GR4xlUkb2kXAiaj7yIO7VhDvF5yjJWeNpFkLE5eUXV0P5qvy42_NidsddllPsRgHNkSI1wuRgpc0GLRW2SzKlkfYegp&3u3286&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=81791"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9166611, lng: 145.13964 },
              viewport: {
                south: -37.9178301302915,
                west: 145.1383228697085,
                north: -37.9151321697085,
                east: 145.1410208302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "Redsar® (Wellington Road)",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 1600,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/108648534052190011504">Redsar® (Wellington Road)</a>'
                ],
                width: 1600
              }
            ],
            place_id: "ChIJXRhFHTMV1moRyU1Q8q4h7to",
            plus_code: {
              compound_code: "34MQ+8V Clayton VIC, Australia",
              global_code: "4RJ734MQ+8V"
            },
            price_level: 1,
            rating: 4,
            reference: "ChIJXRhFHTMV1moRyU1Q8q4h7to",
            scope: "GOOGLE",
            types: [
              "meal_takeaway",
              "restaurant",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 587,
            vicinity: "92 Wellington Road, Clayton",
            html_attributions: []
          },
          name: "Redsar® (Wellington Road)",
          location: { lat: -37.9166611, lng: 145.13964 },
          rating: 4,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLYMfD1I0lmzgeOYIy6xBGpA9Nt3bzHc9yDwIxSjwLPyaw8PLrGdJhUgGW3sS86hwgj-Gk6AnaKhKhM-s_MR6MzW3Kw0DTjvGqUDNCmdIk1DrONBA2IrTjT2EQhSn4zBwVay1B8_uhyx1ZmnvxtY7aNsTnGNHCak7IZgd2YtQ4QnKAB&3u1600&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=25932"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.91992929999999, lng: 145.1377489 },
              viewport: {
                south: -37.92136423029149,
                west: 145.1363813197085,
                north: -37.9186662697085,
                east: 145.1390792802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
            name: "Dooley's Irish Bar",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 1960,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/116538027068443583017">Sean LB</a>'
                ],
                width: 4032
              }
            ],
            place_id: "ChIJ3_TF0NJq1moRIVAqEOzM5pA",
            plus_code: {
              compound_code: "34JQ+23 Clayton VIC, Australia",
              global_code: "4RJ734JQ+23"
            },
            rating: 3.9,
            reference: "ChIJ3_TF0NJq1moRIVAqEOzM5pA",
            scope: "GOOGLE",
            types: [
              "bar",
              "restaurant",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 153,
            vicinity: "2077 Dandenong Road, Clayton",
            html_attributions: []
          },
          name: "Dooley's Irish Bar",
          location: { lat: -37.91992929999999, lng: 145.1377489 },
          rating: 3.9,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJacw3wZYs5eKfvGznbKULB64LTVixpFyq0wGYEXpF0XHQPUch0g3ynZ1T-nYXX8Uxwr7IxOPS9GmC8_5WwfliTPrdvFGaZpDa2zrS1v-8NK7KMRStPSoz6iuAmgcBvRTsffRX1J1UddQmzZwphxGlhqZchTJ8l292peZmCS9IJ5ZcG&3u4032&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=28480"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9010968, lng: 145.1380192 },
              viewport: {
                south: -37.90246138029151,
                west: 145.1367869697085,
                north: -37.89976341970851,
                east: 145.1394849302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "Subway",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 3024,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/106416134605003707547">Swapneel Bansal</a>'
                ],
                width: 4032
              }
            ],
            place_id: "ChIJJx8CNk0V1moRjQ8Fq8pPTYA",
            plus_code: {
              compound_code: "34XQ+H6 Notting Hill VIC, Australia",
              global_code: "4RJ734XQ+H6"
            },
            price_level: 1,
            rating: 3.7,
            reference: "ChIJJx8CNk0V1moRjQ8Fq8pPTYA",
            scope: "GOOGLE",
            types: ["restaurant", "food", "point_of_interest", "establishment"],
            user_ratings_total: 169,
            vicinity: "350 Ferntree Gully Road, Notting Hill",
            html_attributions: []
          },
          name: "Subway",
          location: { lat: -37.9010968, lng: 145.1380192 },
          rating: 3.7,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKRw2Hb3-okr7e70cyM-gWgT-lKBKkjMBILlwRFqmoH-pQDdimA0AB3L4MwtDbrnpgwzZtdenk7DxDcxxjOu_JsBrxi8BT_Zlun_YFQk6WjLoHcg2kocNT6KvIl3FJ0iEDjQD-diZZjWjye4xiNZRyeEPEVWYnGnJ2d1iOrJYnEuvlt&3u4032&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=123611"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.913688, lng: 145.1249915 },
              viewport: {
                south: -37.9149710302915,
                west: 145.1237010697085,
                north: -37.9122730697085,
                east: 145.1263990302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "McDonald's Clayton II",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 1080,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/100781170704439726852">BAHAYA 298E15</a>'
                ],
                width: 1920
              }
            ],
            place_id: "ChIJcyLLN8Vq1moRWA4vMjs-O5A",
            plus_code: {
              compound_code: "34PF+GX Clayton VIC, Australia",
              global_code: "4RJ734PF+GX"
            },
            price_level: 1,
            rating: 3.7,
            reference: "ChIJcyLLN8Vq1moRWA4vMjs-O5A",
            scope: "GOOGLE",
            types: [
              "meal_takeaway",
              "cafe",
              "restaurant",
              "food",
              "point_of_interest",
              "store",
              "establishment"
            ],
            user_ratings_total: 2047,
            vicinity: "1736-1740 Dandenong Road, Clayton",
            html_attributions: []
          },
          name: "McDonald's Clayton II",
          location: { lat: -37.913688, lng: 145.1249915 },
          rating: 3.7,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwIn3RQBhsNCpgFnxwoiksKnglpFHdTN1I6bSa02MY_SvAzeFUmVQLicsnXZIu8EVoemcQNptYQfqYGghL4dYPrlq9f4gkLmi71tg7Ic1Katd0R5WEN2Wqj3MpGc-YGY6Sttpa8xxNz6k6bhmgdhbK19zBmS_rpddjzajhZ5q3QN0SMt&3u1920&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=62207"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.91620280000001, lng: 145.1486692 },
              viewport: {
                south: -37.91759778029151,
                west: 145.1473111197085,
                north: -37.91489981970851,
                east: 145.1500090802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "B4 Food And Wine Bar",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 667,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/107279188847926878908">B4 Food And Wine Bar</a>'
                ],
                width: 1000
              }
            ],
            place_id: "ChIJS1cC4jkV1moRgU51hmG3TkY",
            plus_code: {
              compound_code: "34MX+GF Clayton VIC, Australia",
              global_code: "4RJ734MX+GF"
            },
            rating: 4.5,
            reference: "ChIJS1cC4jkV1moRgU51hmG3TkY",
            scope: "GOOGLE",
            types: [
              "restaurant",
              "bar",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 14,
            vicinity: "21/195 Wellington Road, Clayton",
            html_attributions: []
          },
          name: "B4 Food And Wine Bar",
          location: { lat: -37.91620280000001, lng: 145.1486692 },
          rating: 4.5,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLd-uTHbRq0nRtLdYTTmijd14PmVBOqzdHDyQqg4lsjfMQyuo3vMy4bHp2akazijaVNpMQ0V95Bhw3kruVd_sIqFiC-kcHlzcox7lLk1PAkYeGx_bnnW4CiL437gN0f1UK683PsuApAgeEvKooCHfkSKE11efZ0IQa937_ajdk25mBw&3u1000&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=481"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9006515, lng: 145.1347233 },
              viewport: {
                south: -37.9019259302915,
                west: 145.1334140697085,
                north: -37.8992279697085,
                east: 145.1361120302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
            name: "Little Collins Cafe",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 1080,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/101683727075724684856">Charlie</a>'
                ],
                width: 1920
              }
            ],
            place_id: "ChIJyRArT7Jq1moRlyG9fDIMV-4",
            plus_code: {
              compound_code: "34XM+PV Notting Hill VIC, Australia",
              global_code: "4RJ734XM+PV"
            },
            price_level: 2,
            rating: 4.3,
            reference: "ChIJyRArT7Jq1moRlyG9fDIMV-4",
            scope: "GOOGLE",
            types: [
              "cafe",
              "restaurant",
              "food",
              "point_of_interest",
              "store",
              "establishment"
            ],
            user_ratings_total: 184,
            vicinity: "296 Ferntree Gully Road, Notting Hill",
            html_attributions: []
          },
          name: "Little Collins Cafe",
          location: { lat: -37.9006515, lng: 145.1347233 },
          rating: 4.3,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwL2SXO9YW-_vdjXqUFZ9P_LAfOBqlDGp_J4_KumlIOLdK0L6yLqGiac8-CluAnVeFJAV3oSW32ROjNZuh77jJCTDfFqGnCFcHC5urmnG7XoN-guzCw394HFmomC23TfpRLcCrzSdGl-Hs7y_dbLVME2IZ01L0XhREbztGDnJANgPDGn&3u1920&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=123390"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.90639879999999, lng: 145.1491703 },
              viewport: {
                south: -37.9078083802915,
                west: 145.1479133197085,
                north: -37.9051104197085,
                east: 145.1506112802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
            name: "Inchmeal",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 3021,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/104217840160564587560">Inchmeal</a>'
                ],
                width: 4032
              }
            ],
            place_id: "ChIJWYf_hEUV1moReaX9FFxCkik",
            plus_code: {
              compound_code: "34VX+CM Notting Hill VIC, Australia",
              global_code: "4RJ734VX+CM"
            },
            rating: 4.8,
            reference: "ChIJWYf_hEUV1moReaX9FFxCkik",
            scope: "GOOGLE",
            types: [
              "cafe",
              "restaurant",
              "food",
              "point_of_interest",
              "clothing_store",
              "store",
              "establishment"
            ],
            user_ratings_total: 83,
            vicinity: "39 Westerfield Drive, Notting Hill",
            html_attributions: []
          },
          name: "Inchmeal",
          location: { lat: -37.90639879999999, lng: 145.1491703 },
          rating: 4.8,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJ147FgqnnvCd44sIV0bgYZp6bPhYuzZY0F1D1-NiOQujXx_WnA4gcWgRzNs43aFdGiViYohgMjDmYfs0MSxH__AU5nZCNV22ZOa3UbrTOZBJMryHcbRr2xYT5iD3gPaAgp4zFtCd-vM9ZFrqMN7ywa-lQDvQzfU4ILHzKPRZAbFpGx&3u4032&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=8181"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.90058519999999, lng: 145.1291488 },
              viewport: {
                south: -37.9019301802915,
                west: 145.1277674697085,
                north: -37.8992322197085,
                east: 145.1304654302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
            name: "Crooked Letters Cafe",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 1269,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/111795416912987326189">Crooked Letters Cafe</a>'
                ],
                width: 1269
              }
            ],
            place_id: "ChIJMSIVmaxq1moREW90ul1idgA",
            plus_code: {
              compound_code: "34XH+QM Notting Hill VIC, Australia",
              global_code: "4RJ734XH+QM"
            },
            price_level: 1,
            rating: 4.9,
            reference: "ChIJMSIVmaxq1moREW90ul1idgA",
            scope: "GOOGLE",
            types: [
              "cafe",
              "restaurant",
              "food",
              "point_of_interest",
              "store",
              "establishment"
            ],
            user_ratings_total: 93,
            vicinity: "260-262 Ferntree Gully Road, Notting Hill",
            html_attributions: []
          },
          name: "Crooked Letters Cafe",
          location: { lat: -37.90058519999999, lng: 145.1291488 },
          rating: 4.9,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKgskyf6G6XssFafhRqytODS82HlXg8TuVQe-j2ygekkkQgOP_kNGeZs9sMmOaCwRC2xwlMT2RH_cIvIrT6pGD8PlXv7_eEbWQi4zM3SfRLtGrbw2FOINxCyrkBRc6xN7ZP7MgxDi_ARi7EAUfmhJKfKC4ogdtnz9pN3003ttQvYZfa&3u1269&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=21974"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9132094, lng: 145.1217294 },
              viewport: {
                south: -37.91457158029149,
                west: 145.1204938197085,
                north: -37.91187361970849,
                east: 145.1231917802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
            name: "7-Eleven Clayton",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 3456,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/100781170704439726852">BAHAYA 298E15</a>'
                ],
                width: 4608
              }
            ],
            place_id: "ChIJlarWM99q1moRAvNnZEHnp5o",
            plus_code: {
              compound_code: "34PC+PM Clayton VIC, Australia",
              global_code: "4RJ734PC+PM"
            },
            rating: 2.9,
            reference: "ChIJlarWM99q1moRAvNnZEHnp5o",
            scope: "GOOGLE",
            types: [
              "convenience_store",
              "atm",
              "gas_station",
              "bakery",
              "finance",
              "restaurant",
              "food",
              "point_of_interest",
              "store",
              "establishment"
            ],
            user_ratings_total: 41,
            vicinity: "187-191 Clayton Road, Clayton",
            html_attributions: []
          },
          name: "7-Eleven Clayton",
          location: { lat: -37.9132094, lng: 145.1217294 },
          rating: 2.9,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwL-YHnvrOZa4IkdOIn_injDQP_7uQIjlCw6z91bq2D2LLGN9eKYRTkXF5i_eXiYyAhXMhxEsRXzwQ4GgMS380pSNLd64q6iD8wqR5K_HRpqFynFIQ41dbGmd_Obi1guO7nlkOgHHHu9Z4go4NBu3fM5ySPLwdVhY1J_Lmg_764gWsL6&3u4608&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=108089"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9015896, lng: 145.143149 },
              viewport: {
                south: -37.9028212802915,
                west: 145.1418226197085,
                north: -37.90012331970851,
                east: 145.1445205802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "Monash Pizza",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 3024,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/115069905990156053013">Katrina</a>'
                ],
                width: 3024
              }
            ],
            place_id: "ChIJE2wLAE4V1moR3oOSO5ArDcU",
            plus_code: {
              compound_code: "34XV+97 Notting Hill VIC, Australia",
              global_code: "4RJ734XV+97"
            },
            rating: 4.5,
            reference: "ChIJE2wLAE4V1moR3oOSO5ArDcU",
            scope: "GOOGLE",
            types: [
              "meal_delivery",
              "meal_takeaway",
              "restaurant",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 147,
            vicinity: "404 Ferntree Gully Road, Notting Hill",
            html_attributions: []
          },
          name: "Monash Pizza",
          location: { lat: -37.9015896, lng: 145.143149 },
          rating: 4.5,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLoRgEZrxL0xhDqA396g2szROn-ZjUjbWMdEsWojJHQu40V7V-26bpTniYiRjH8_aquxTtFdpSCQPJDLus-ylikZv88A7sqaU1CKKvZeiM9I15aDSexMI8TUO24MyM46B7DfHHu95uy-0-RQMz7uak1lCsF4a6ouEgQoVHzbQkZpmzs&3u3024&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=76678"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.8988578, lng: 145.1248779 },
              viewport: {
                south: -37.9003461802915,
                west: 145.1234652697085,
                north: -37.8976482197085,
                east: 145.1261632302915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "Red Rooster Notting Hill",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 3096,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/102092706710981829416">Sparky T</a>'
                ],
                width: 5504
              }
            ],
            place_id: "ChIJmbtGgk0V1moRb2qkS9vTW9Q",
            plus_code: {
              compound_code: "442F+FX Mount Waverley VIC, Australia",
              global_code: "4RJ7442F+FX"
            },
            price_level: 1,
            rating: 3.5,
            reference: "ChIJmbtGgk0V1moRb2qkS9vTW9Q",
            scope: "GOOGLE",
            types: ["restaurant", "food", "point_of_interest", "establishment"],
            user_ratings_total: 350,
            vicinity: "231/233 Ferntree Gully Road, Mount Waverley",
            html_attributions: []
          },
          name: "Red Rooster Notting Hill",
          location: { lat: -37.8988578, lng: 145.1248779 },
          rating: 3.5,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwL4iMDSQ7Zf4cqyAeHcgO7wX5f8KYJuzKWmvCBbl0wrECCgl2sP5eBkFsMRTw4dbnbbbg5Q10KPOzwp5DX3b6SmH2DoZyL7IsUXBpB7zyZQduYWhbEkzldYho3TN5GnbLTTf3EJRnU-aIY9VAURqKfiftSVgDnPVm7DQX2liX3yFDX1&3u5504&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=103642"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.9015257, lng: 145.1434643 },
              viewport: {
                south: -37.9028070802915,
                west: 145.1421283197085,
                north: -37.9001091197085,
                east: 145.1448262802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
            name: "Yun Yun Chinese Take Away",
            opening_hours: { open_now: false },
            photos: [
              {
                height: 2268,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/111345472053266204241">Andrew Tomlins</a>'
                ],
                width: 4032
              }
            ],
            place_id: "ChIJRTAi_FEV1moROwI4BmWE_TA",
            plus_code: {
              compound_code: "34XV+99 Notting Hill VIC, Australia",
              global_code: "4RJ734XV+99"
            },
            price_level: 1,
            rating: 3.7,
            reference: "ChIJRTAi_FEV1moROwI4BmWE_TA",
            scope: "GOOGLE",
            types: [
              "meal_takeaway",
              "restaurant",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 84,
            vicinity: "410 Ferntree Gully Road, Notting Hill",
            html_attributions: []
          },
          name: "Yun Yun Chinese Take Away",
          location: { lat: -37.9015257, lng: 145.1434643 },
          rating: 3.7,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwLzRkc5kdigs5KXs203jZqHW4qRZou1tVhGmCZUpR90BZv2pl87eLzoRH6COnfeL2skBO9r9B7bJWhC6nzgTnsbGW6xUtdAmPM_okH7cc7NdA4AmQE5eu1PJyPVn8GGWBMS-F3d4UOFSak1aqFBV2XkRSX6jyyqkm3F1WTdHO3uvYCO&3u4032&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=31774"
        },
        {
          place: {
            business_status: "OPERATIONAL",
            geometry: {
              location: { lat: -37.898789, lng: 145.1239812 },
              viewport: {
                south: -37.9001420802915,
                west: 145.1228235197085,
                north: -37.8974441197085,
                east: 145.1255214802915
              }
            },
            icon:
              "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/gas_station-71.png",
            name: "bp Truckstop",
            opening_hours: { open_now: true },
            photos: [
              {
                height: 5504,
                html_attributions: [
                  '<a href="https://maps.google.com/maps/contrib/102092706710981829416">Sparky T</a>'
                ],
                width: 3096
              }
            ],
            place_id: "ChIJe2IIOrpq1moRv4hA_QFLLh4",
            plus_code: {
              compound_code: "442F+FH Mount Waverley VIC, Australia",
              global_code: "4RJ7442F+FH"
            },
            rating: 3.9,
            reference: "ChIJe2IIOrpq1moRv4hA_QFLLh4",
            scope: "GOOGLE",
            types: [
              "gas_station",
              "atm",
              "finance",
              "restaurant",
              "food",
              "point_of_interest",
              "establishment"
            ],
            user_ratings_total: 96,
            vicinity: "Ferntree Gully Road, Stephensons Road, Mount Waverley",
            html_attributions: []
          },
          name: "bp Truckstop",
          location: { lat: -37.898789, lng: 145.1239812 },
          rating: 3.9,
          img:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwInz3upatFvHYAlZIcgKZ05DDaJtd0px4dzABENWqeC68ZodI3Wj0Zk_Z4gIMKarYhMBvUXaHi09ATn_-gnTQvVmHFhEO5YKXFdsBZewlvSnGHftR7oQQP0TvkQqnsZRn4sd4SFA-poLsliZL-dThtFMEG8gJt79EnMSgBPU4Wdxnbb&3u3096&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=65761"
        }
      ],
      restaurantInfo: {}
    };
  },
  methods: {
    touchstart(e) {
      this.touching = true;
      this.disableTransition = false;
      this.startPos = e.changedTouches["0"].screenX;
      this.currentPos = e.changedTouches["0"].screenX;
    },
    touchmove(e) {
      if (this.touching) {
        this.currentPos = e.changedTouches["0"].screenX;

        if (
          e.changedTouches["0"].screenX - this.startPos >
            window.innerWidth / 3 &&
          !this.moreInfo
        ) {
          this.swipe = "right";
        } else if (
          e.changedTouches["0"].screenX - this.startPos <
            -window.innerWidth / 3 &&
          !this.moreInfo
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
        this.disableTransition = true;
        this.touchend();
        this.restaurantInfo[this.placeData[this.currentPlace]] =
          swipe === "right";
        this.swipe = "none";
        if (this.currentPlace === this.placeData.length - 1) {
          this.$store.commit("setPageSelected", "chosenRestaurant");
        } else {
          this.currentPlace += 1;
        }
      }
    }
  }
};
</script>

<style>
*:focus {
  outline: none;
}

.animate-wave {
  animation-name: wave;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes wave {
  0% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
}
</style>