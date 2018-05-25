<template>
    <label class="switch-control">
        <input type="checkbox"
               :checked="changeTwoAuthStatus">
        <span class="slider"></span>
    </label>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'switchControl',
        data() {
            return {
                value: this.checked
            }
        },
        computed: {
            ...mapGetters([
                'userTwoAuth', //remove

                'changeTwoAuthStatus'
            ]),
        }
    }
</script>