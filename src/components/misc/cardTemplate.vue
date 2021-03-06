<template>
  <div
      class="w-72 h-72 rounded-lg  p-2 bg-white shadow-lg absolute mx-auto transition-all -translate-x-1/2 transform flex flex-col"

  >
    <h1 class="text-2xl text-gray-700">
      <slot name="title">

      </slot>
    </h1>
    <div class="py-2">
      <slot name="image">

      </slot>
    </div>
    <div class="w-full flex flex-row justify-between pb-4">
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
