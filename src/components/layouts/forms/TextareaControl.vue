<template>
    <div class="control" @click="makeFocus">
        <div class="wrap-input">
            <label :for="textareaId">{{ labelValue }}</label>
            <textarea
                    :id="textareaId"
                    :placeholder="placeholder"
                    @input="autosize()"
                    @blur="endOfInput()"
                    @focus="removePlaceholder()"
                    class="textarea"
                    ref="textarea"
                    v-model="value"
                    name=""
                    rows="1">
            </textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'textareaControl',
        props: {
            labelValue: String,
            textareaId: String,
            placeholder: String,
            inputValue: String
        },
        data() {
            return {
                value: ''//this.inputValue FIX_THIS
            }
        },
        methods: {
            makeFocus: function () {
                document.getElementById(this.textareaId).focus();
            },
            removePlaceholder: function () {
                document.getElementById(this.textareaId).placeholder = "";
            },
            addPlaceholder: function () {
                document.getElementById(this.textareaId).placeholder = this.placeholder;
            },
            endOfInput: function () {
                if (this.value.length === 0) {
                    this.addPlaceholder();
                }
                document.getElementById(this.textareaId).blur();

                //добавить $emit сюда?
            },
            autosize: function () {
                let el = this.$refs.textarea;
                setTimeout(function () {
                    el.style.cssText = 'height:auto; padding:0';
                    el.style.cssText = '-moz-box-sizing:content-box';
                    el.style.cssText = 'height:' + el.scrollHeight + 'px';
                }, 40);

                this.$parent.$emit('receiveDescriptionOffer', this.value);

                this.$parent.$emit('getConfirmationUserCode', this.value);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    // .control
    //     .wrap-input

    //         textarea
    //             font-family MuseoSansCyrl500
    //             width 100%
    //             background inherit
    //             border none
    //             outline none
    //             /*margin-top 18px*/
    //             font-size 14px
    //             font-weight 500
    //             line-height 1.29
    //             text-align left
    //             color #34343e
    //             opacity 0.5
    //             position relative
    //             z-index 1
    //             resize none
    //             overflow hidden

    //         textarea:focus
    //             color #34343e
    //             opacity 1

    //         textarea::-webkit-input-placeholder
    //             opacity 1
    //             line-height 1.29
    //             font-size 14px

    //      @media (max-width: 425px)
    //         & .wrap-input
    //             & textarea
    //                 height 60px
</style>