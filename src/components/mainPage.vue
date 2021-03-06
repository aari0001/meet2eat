<template>
    <div class="w-screen h-screen bg-red-400">
        <login v-if="pageSelected === 'login'"/>
    </div>
</template>

<script>

    import Login from "./login";
    export default {
        name: "mainPage.vue",
        components: {Login},
        computed: {
            pageSelected() {
                return this.$store.getters.getPageSelected
            }
        }
    }
</script>

<style scoped>

</style>