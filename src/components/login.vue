<template>
    <div class="grid grid-cols-4 gap-4 grid-rows-6 h-full w-full">
        <h1 class="text-4xl col-start-2 col-span-2 mx-auto row-start-2" >
            meet2eat
        </h1>
        <div class="row-start-3 col-span-2 col-start-2 h-full">
            <label for="join" class="border-2 flex flex-row border-gray-300 rounded bg-gray-100">
                <input id="join" type="text" class="bg-gray-100 px-2 py-1 rounded" placeholder="enter room code">
                <button class="border-l-2 border-gray-300 p-1 bg-gray-300"> join</button>
            </label>
        </div>
        <div class="row-start-5 col-span-2 col-start-2 h-full">
            <label for="create" class="border-2 flex flex-row border-gray-300 rounded bg-gray-100">
                <input id="create" type="text" class="bg-gray-100 px-2 py-1 rounded" placeholder="enter room code">
                <button class="border-l-2 border-gray-300 p-1 bg-gray-300"> create</button>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>

</style>