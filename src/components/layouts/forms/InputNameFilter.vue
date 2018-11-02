<template>
    <div class="form-group">
        <label for="name">
            {{ title }}
        </label>
        <input type="text"
               id="name"
               v-model="name"
               @input="emitChangeName(name)">
    </div>
</template>

<script>
    export default {
        name: 'InputNameFilter',
        props: {
            title: {
                type: String,
                required: true
            },
            clear: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            /**
             * watch of the property 'clear', if the property 'clear' is true, it clears the model of the input field
             *
             * @param val
             */
            clear: function (val) {
                if (val) {
                    this.value = '';
                    this.emitChangeName(this.name);
                }
            }
        },
        data() {
            return {
                name: '',
                reset: false
            }
        },
        methods: {
            emitChangeName: function (name) {
                this.$parent.$emit('changeName',
                    {
                        name: name,
                        reset: this.clear
                    }
                );
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .form-group
        display flex
        flex-direction column
        align-items flex-start
        margin-bottom 24px

        label
            margin-bottom 12px
            font-family MuseoSansCyrl500
            font-size 13px
            font-weight bold
            color #34343e

        input
            border-radius 2px
            background-color #f7f7f7
            border solid 1px #979797
            width 100%
            padding 6px 8px
            font-family MuseoSansCyrl500
            font-size 12px
            color #34343e
</style>