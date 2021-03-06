<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="pt-16">
      <div class="relative h-72">
      <card-template style="left: 50%" >
        <template v-slot:title >
          Insert Title
        </template>
        <template v-slot:image>
          <img src="https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJEO3o-UEPzDwMdq1QohTc2NTdQPINeFZ2I_8hjY1iz466Kq_Ldcd0CJF0KSvuOtVBIOjfP_sno3oONr3EsPxlAOSbN4MY2sGSnuOlK3zC4JgWDmfyBSXB9zGarJCT8Ccbaa1MyyUOZCt9UbDNUI7EBUzBWCo9uNGQyGjm9L-m7euJy&3u1024&5m1&2e1&callback=none&key=AIzaSyD30U8t-5g3vo-U2bW3ZO7VANO24rOHqCQ&token=117430" alt="photo" />
        </template>
        <template v-slot:rating>
          Rating
        </template>
        <template v-slot:open >
          open
        </template>
      </card-template>
      </div>
    </div>
    <div class="pt-10">
      <button class="bg-red-50 text-lg rounded-full flex flex-row shadow-xl">
        <span class="pl-3 py-2 "  >
        more info
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
  </div>
</template>

<script>
import CardTemplate from "@/components/misc/cardTemplate";
export default {
name: "chosenRestaurant",
  components: {CardTemplate}
}
</script>

<style scoped>

</style>
