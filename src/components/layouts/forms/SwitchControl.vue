<template>
    <label class="switch-control">
        <!--{{ flag }}-->
        <input
                type="checkbox"
                @click="changeChecker()"
                :checked="value">
        <span class="slider"></span>
    </label>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'switchControl',
        props: {
            checked: {
                type: Boolean
            },
            flag: {
                type: [Boolean, String]
            },
            id: {
                type: String
            }
        },
        watch: {
            'flag': function (val) {
                this.receiveCaret();
            }
        },
        data() {
            return {
                value: this.checked
            }
        },
        computed: {
            ...mapGetters([
                'userTwoAuth'
            ]),
        },
        methods: {
            changeChecker: function () {
                this.value = !this.value;
                this.$parent.$emit('changeChecker', this.value);
            },
            //shitcode. rewrite.
            receiveCaret: function () {
                if (this.userTwoAuth !== this.value) {
                    this.value = !this.value;
                    // this.$parent.$emit('changeChecker', this.value);
                }
            }
            // checkUserAuth: function () {
            //     if (this.userTwoAuth != this.value) {
            //
            //     }
            // }
        }
    }
</script>