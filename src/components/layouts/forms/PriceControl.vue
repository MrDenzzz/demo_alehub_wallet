<template>
    <div class="control" @click="makeFocus">
        <div class="wrap-input">
            <label :for="inputId">{{ labelTitle }}</label>
            <input type="number"
                   class="input-control"
                   v-model="price"
                   :id="inputId"
                   :placeholder="placeholder"
                   @keydown.enter="endOfInput"
                   @blur="addPlaceholder"
                   @focus="removePlaceholder"
                   @input="sendData"
            >
        </div>
    </div>
</template>

<script>
    export default {
        name: 'price-control',
        props: {
            labelTitle: String,
            inputId: String,
            placeholder: String,
            inputValue: [String, Number]
        },
        data() {
            return {
                price: this.inputValue
            }
        },
        methods: {
            makeFocus: function () {
                document.getElementById(this.inputId).focus();
            },
            removePlaceholder: function () {
                document.getElementById(this.inputId).placeholder = "";
            },
            addPlaceholder: function () {
                document.getElementById(this.inputId).placeholder = this.placeholder;
            },
            endOfInput: function () {
                if (this.value.length === 0) {
                    this.addPlaceholder();
                }
                document.getElementById(this.inputId).blur();
            },
            sendData: function () {
                this.$parent.$emit('receivePriceOffer', this.price);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    // input[type=number]::-webkit-inner-spin-button,
    // input[type=number]::-webkit-outer-spin-button
    //     -webkit-appearance none
    //     -moz-appearance none
    //     appearance none
    //     margin 0

    // .control
    //     .wrap-input
    //         input
    //             font-family MuseoSansCyrl500
    //             width 100%
    //             background inherit
    //             border none
    //             outline none
    //             margin-top 18px
    //             font-size 14px
    //             font-weight 500
    //             line-height 1.29
    //             text-align left
    //             color #34343e
    //             position relative
    //             z-index 1
    //             display block

    //         input:focus
    //             color #34343e
    //             opacity 1

    //         input::-webkit-input-placeholder
    //              opacity 1
    //              line-height 1.29
    //              font-size 14px
</style>