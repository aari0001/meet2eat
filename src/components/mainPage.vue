<template>
    <div class="w-screen h-screen bg-red-400">
        <login v-if="pageSelected === 'login'"/>
        <select-restaurant v-if="pageSelected === 'room'"/>
    </div>
</template>

<script>

    import Login from "./login";
    import SelectRestaurant from "@/components/selectRestaurant";
    export default {
        name: "mainPage.vue",
        components: {SelectRestaurant, Login},
        computed: {
            pageSelected() {
                return this.$store.getters.getPageSelected
            }
        }
    }
</script>

<style scoped>

</style>