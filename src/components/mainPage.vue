<template>
    <div class="w-screen h-screen bg-red-400">
      <transition name="fade" mode="out-in">
        <login v-if="pageSelected === 'login'"/>
        <select-restaurant v-else-if="pageSelected === 'room'"/>
        <chosen-restaurant v-else-if="pageSelected === 'chosenRestaurant'"/>
      </transition>
    </div>
</template>

<script>

    import Login from "./login";
    import SelectRestaurant from "@/components/selectRestaurant";
    import ChosenRestaurant from "@/components/chosenRestaurant";
    export default {
        name: "mainPage.vue",
        components: {ChosenRestaurant, SelectRestaurant, Login},
        computed: {
            pageSelected() {
                return this.$store.getters.getPageSelected
            }
        }
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
