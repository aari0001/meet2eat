<template>
  <div
      class="w-72 h-80 rounded-lg  p-2 bg-white shadow-lg absolute mx-auto transition-all  transform flex flex-col"

  >
    <h1 class="text-2xl text-gray-700 text-center">
      <slot name="title">

      </slot>
    </h1>
    <div class="pt-2 h-52 flex items-center overflow-hidden">
      <slot name="image">

      </slot>
    </div>
    <div class="text-gray-500 pb-1">
      <slot name="address">

      </slot>
    </div>
    <div class="w-full flex flex-row justify-between pb-2">
      <div class="text-gray-500">
        <slot name="rating"> </slot>
      </div>
      <slot name="open"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardTemplate"
}
</script>

<style scoped>

</style>
