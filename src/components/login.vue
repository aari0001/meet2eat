<template>
  <div class="flex flex-col items-center w-full h-full">
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 190.65 107.36"
      class="h-32 mt-12"
    >
      <text class="cls-1" transform="translate(0 41.67)">MEET</text>
      <text class="cls-1" transform="translate(125.83 41.67)">EAT</text>
      <text class="cls-2" transform="translate(94.79 42.52)">2</text>
      <path class="cls-3" d="M14.71,89" transform="translate(-2.36 -7)" />
      <path
        class="cls-4"
        d="M45.51,104a123.41,123.41,0,0,1,1-20.73c1.58-12,11.43-18.58,19.59-15.5h0c8.23,3.08,12.84,11.92,11.86,20.4a93.07,93.07,0,0,0,.12,23.46"
        transform="translate(-2.36 -7)"
      />
      <path
        class="cls-3"
        d="M45.51,104a123.41,123.41,0,0,1,1-20.73c1.58-12,11.43-18.58,19.59-15.5h0c8.23,3.08,12.84,11.92,11.86,20.4a93.07,93.07,0,0,0,.12,23.46"
        transform="translate(-2.36 -7)"
      />
      <line class="cls-5" x1="59.52" y1="78.51" x2="59.52" y2="101.18" />
      <path
        class="cls-5"
        d="M190,83.94c-2.73,5-10.55,6.21-17.7,2.71s-11-10.43-8.72-15.64"
        transform="translate(-2.36 -7)"
      />
      <path
        class="cls-5"
        d="M5.37,83.94c2.72,5,10.55,6.21,17.7,2.71s11-10.43,8.71-15.64"
        transform="translate(-2.36 -7)"
      />
      <path
        class="cls-3"
        d="M173,86.28c-1.3,14.21-34.22,25.58-74.66,25.58S25,100.49,23.72,86.28"
        transform="translate(-2.36 -7)"
      />
    </svg>
    <h4 class="text-white">
      meet with friends, eat with friends
    </h4>
    <p class="text-white text-xs w-2/3 text-center pt-4">
      Can't decide where your group wants to eat? Meet2Eat will make that decision for you! Join a room with your friends
      and each member will, swipe to decide!
    </p>
    <form class="w-2/3 pt-16" @submit.prevent="changePage('room')">
      <label
        for="join"
        class="border-2 flex h-full flex-row justify-between border-gray-300 rounded bg-gray-100 flex-1"
      >
        <input
          id="join"
          type="text"
          class="bg-gray-100 px-2 py-1.5 rounded min-w-0"
          placeholder="enter room code"
        />
        <button class="border-l-2 border-gray-300 p-1 bg-gray-300 w-16">
          join
        </button>
      </label>
    </form>
    <form class="w-2/3 pt-16" @submit.prevent="changePage('createRoom')">
      <label
        for="create"
        class="border-2  flex flex-row justify-between border-gray-300 rounded bg-gray-100 flex-1"
      >
        <input
          id="create"
          type="text"
          class="bg-gray-100 px-2 py-1.5 rounded min-w-0"
          placeholder="enter room code"
        />
        <button class="border-l-2 border-gray-300 p-1 bg-gray-300 w-16">
          create
        </button>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    changePage(newPage) {
      this.$store.commit("setPageSelected", newPage);
    }
  }
};
</script>

<style scoped>
.cls-1 {
  font-size: 40.81px;
}
.cls-1,
.cls-4 {
  fill: #b82025;
}
.cls-1,
.cls-2 {
  font-family: Bauhaus93, "Bauhaus 93";
}
.cls-2 {
  font-size: 51.01px;
}
.cls-3,
.cls-5 {
  fill: none;
  stroke: #231f20;
  stroke-width: 5px;
}
.cls-3 {
  stroke-miterlimit: 10;
}
.cls-5 {
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>