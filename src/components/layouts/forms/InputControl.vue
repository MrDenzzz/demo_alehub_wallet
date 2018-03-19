<template>
    <div class="control" @click="makeFocus">
        <div class="wrap-input">
            <label :for="inputId">{{ labelValue }}</label>
            <input
                    class="input-control"
                    v-model="value"
                    :type="inputType"
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
        name: 'inputControl',
        props: {
            labelValue: {
                type: String,
                required: true
            },
            inputId: {
                type: String,
                default: 'input-control'
            },
            inputValue: {
                type: String,
                default: ''
            },
            inputType: {
                type: String,
                default: 'text'
            },
            placeholder: String
        },
        data() {
            return {
                value: this.inputValue,
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
                this.$parent.$emit('receiveTitleOffer', this.value);

                this.$parent.$emit('receiveFullName', this.value);
            }
        },
        mounted() {
            this.$parent.$emit('receiveTitleOffer1', this.value);
        }
    }
</script>

<style lang="stylus" scoped>
    .control
        .wrap-input
            input
                font-family MuseoSansCyrl500
                width 100%
                background inherit
                border none
                outline none
                margin-top 18px
                font-size 14px
                font-weight 500
                line-height 1.29
                text-align left
                color #34343e
                position relative
                z-index 1
                display block

            input:focus
                color #34343e
                opacity 1

            input::-webkit-input-placeholder
                opacity 1
                line-height 1.29
                font-size 14px
</style>
