<template>
  <div @touchmove="touchmove" @touchstart="touchstart" class="w-full h-full flex flex-col">
    <div class="relative w-full">
      <div class="w-64 h-64 bg-white shadow-lg absolute mx-auto transition-all " style="transition-duration: 10ms" :style="`left: ${currentPos - startPos}px`">

      </div>
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
      swipe:false,
    }

  },
  methods: {
    touchstart(e) {
      this.startPos = e.changedTouches['0'].screenX
      this.currentPos = e.changedTouches['0'].screenX
    },
    touchmove(e) {
      this.currentPos = e.changedTouches['0'].screenX
      console.log(e.changedTouches['0'].screenX - this.startPos, window.innerWidth/2)
      if (e.changedTouches['0'].screenX - this.startPos > window.innerWidth/2) {
        this.swipe = true
      }
    }
  },
}
</script>

<style scoped>

</style>