<template>
    <div class="w-screen h-screen bg-red-400 flex flex-col" >
      <transition name="fade" mode="out-in">
        <login v-if="pageSelected === 'login'"/>
        <select-restaurant v-else-if="pageSelected === 'room'"/>
        <chosen-restaurant v-else-if="pageSelected === 'chosenRestaurant'"/>
        <create-room v-else-if="pageSelected === 'createRoom'"/>
      </transition>
      <div class="h-16 w-full">

      </div>
    </div>
</template>

<script>

    import Login from "./login";
    import SelectRestaurant from "@/components/selectRestaurant";
    import ChosenRestaurant from "@/components/chosenRestaurant";
    import CreateRoom from "./createRoom";
    export default {
        name: "mainPage.vue",
        components: {CreateRoom, ChosenRestaurant, SelectRestaurant, Login},
        computed: {
            pageSelected() {
                return this.$store.getters.getPageSelected
            }
        },
    }
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease !important;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>
