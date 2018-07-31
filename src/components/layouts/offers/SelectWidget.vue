<template>
    <div class="select-widget">
        <div class="item"
             v-for="option in options">
            {{ option.title }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SelectWidget',
        props: {
            options: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>