<template>
    <label class="switch-control">
        <input @click="changeChecker()" type="checkbox" :checked="value">
        <span class="slider"></span>
    </label>
</template>

<script>
    export default {
        name: 'switchControl',
        props: {
            checked: Boolean,
            id: String
        },
        data() {
            return {
                value: this.checked
            }
        },
        methods: {
            changeChecker: function () {
                this.value = !this.value;
                this.$parent.$emit('changeChecker', this.id, this.value);
            }
        }
    }
</script>