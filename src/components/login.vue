<template>
    <div class="flex flex-col items-center w-full h-full">
        <h1 class="text-5xl pt-12" >
            meet2eat
        </h1>
        <h4>
            meet friends, eat friends
        </h4>
        <form class="w-2/3 pt-16" @submit.prevent="changePage('room')">
            <label for="join" class="border-2 flex h-full flex-row border-gray-300 rounded bg-gray-100 flex-1">
                <input id="join" type="text" class="bg-gray-100 px-2 py-1.5 rounded min-w-0" placeholder="enter room code">
                <button class="border-l-2 border-gray-300 p-1 bg-gray-300 w-16"> join</button>
            </label>
        </form>
        <form class="w-2/3 pt-16" @submit.prevent="changePage('createRoom')">
            <label for="create" class="border-2  flex flex-row border-gray-300 rounded bg-gray-100 flex-1">
                <input id="create" type="text" class="bg-gray-100 px-2 py-1.5 rounded min-w-0" placeholder="enter room code">
                <button class="border-l-2 border-gray-300 p-1 bg-gray-300 w-16"> create</button>
            </label>
        </form>
    </div>
</template>

<script>
    export default {
        name: "login",
        methods: {
            changePage(newPage) {
                this.$store.commit('setPageSelected', newPage)
            }
        }
    }
</script>

<style scoped>
</style>