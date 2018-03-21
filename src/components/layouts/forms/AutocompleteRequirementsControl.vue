<template>
    <div class="control" @click="makeFocus">
        <div class="wrap-input">
            <label>{{ labelValue }}</label>
            <div class="row" style="margin-top: 18px;">
                <div class="col-12 row-flex-start">
                    <div class="adding-opt" v-for="item in addingOptions">
                        <span class="adding-item">{{ item }}</span>
                        <img class="close-adding" src="../../../assets/img/remove-tag-ic.svg" alt="" :value="item"
                             @click="removeFromReqs($event, item)">

                    </div>
                    <input
                            type="text"
                            class="autocomplete-input"
                            :id="autocompleteId"
                            :placeholder="placeholder"
                            @input="searchJuxtapose"
                            @keydown.enter="addOptIntoResult"
                            @keydown.38="moveUpSelect"
                            @keydown.40="moveDownSelect"
                            @focus="removePlaceholder"
                            @blur="addPlaceholder"
                    >
                </div>

                <div class="col-12" id="1">
                    <ul id="autocomplete-select" class="auto-select" style="position: absolute;">
                        <li class="options" ref="index" :value="item.label" v-for="(item, index) in tempOptions"
                            @click="addToReqs(item.label)">
                            {{ item.label }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'autocomplete-requirements-control',
        props: {
            labelValue: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                required: true
            },
            autocompleteId: {
                type: String,
                required: true
            },
            inputValue: [String, Array]
        },
        data() {
            return {
                classes: {
                    selectOption: 'select-opt'
                },
                offsetSelect: 22,
                options: [
                    {
                        id: 0,
                        label: 'Moscow',
                        value: 'Moscow'
                    },
                    {
                        id: 1,
                        label: 'Saint-Petersburg',
                        value: 'Saint-Petersburg'
                    },
                    {
                        id: 2,
                        label: 'Novosibirsk',
                        value: 'Novosibirsk'
                    },
                    {
                        id: 3,
                        label: 'Tolyati',
                        value: 'Tolyati'
                    },
                    {
                        id: 4,
                        label: 'Murmansk',
                        value: 'Murmansk'
                    },
                    {
                        id: 5,
                        label: 'Murom',
                        value: 'Murom'
                    },
                    {
                        id: 6,
                        label: 'Montana',
                        value: 'Montana'
                    },
                    {
                        id: 7,
                        label: 'Samara',
                        value: 'Samara'
                    },
                    {
                        id: 8,
                        label: 'Novokuznetsk',
                        value: 'Novokuznetsk'
                    },
                    {
                        id: 9,
                        label: 'Tolyala',
                        value: 'Tolyala'
                    },
                    {
                        id: 10,
                        label: 'Kaliningrad',
                        value: 'Kaliningrad'
                    },
                    {
                        id: 11,
                        label: 'Murium',
                        value: 'Murium'
                    }

                ],
                tempOptions: [],
                addingOptions: []
            }
        },
        computed: {
            currentSelectOption: function () {
                return document.getElementsByClassName(this.classes.selectOption)[0];
            },
            nextSelectOption: function () {
                return this.currentSelectOption.nextSibling;
            },
            previousSelectOption: function () {
                return this.currentSelectOption.previousSibling;
            }
        },
        methods: {
            removePlaceholder: function () {
                document.getElementById(this.autocompleteId).placeholder = "";
            },
            addPlaceholder: function () {
                document.getElementById(this.autocompleteId).placeholder = this.placeholder;
            },
            searchJuxtapose: function () {
                let a = document.getElementById(this.autocompleteId).value.toLowerCase();
                let resultOptions = [];
                var _this = this;

                for (let i = 0; i < this.options.length; i++) {
                    if (a === this.options[i].label.toLowerCase().substring(0, a.length) && a.length > 1 &&
                        !this.addingOptions.find(function (el) {
                            return el === _this.options[i].label;
                        })) {
                        resultOptions.push(this.options[i]);
                    }
                }

                this.tempOptions = resultOptions;

                setTimeout(function () {
                    let arrOpt = document.getElementsByClassName('options');
                    for (let i = 0; i < _this.tempOptions.length; i++) {
                        // document.getElementsByClassName('options')[i].innerHTML = ' ' + document.getElementsByClassName('options')[i].
                        // innerHTML.replace(new RegExp('[^a-zа-яё]' + a + '[^a-zа-яё]', 'gim'), '<span style="color: red;" class="qwe">' + ' ' + a + ' ' + '</span>');
                        document.getElementsByClassName('options')[i].innerHTML = ' ' + '<span style="color: #a87104;">' + a + '</span>' + _this.tempOptions[i].label.replace(
                            _this.tempOptions[i].label.substring(0, a.length), '');
                    }

                    let listOpt = document.getElementsByClassName('options');
                    if (listOpt.length !== 0) {
                        listOpt[0].classList.add('select-opt');
                    }

                }, 40);

            },
            addToReqs: function (val) {
                let autoInput = document.getElementById(this.autocompleteId);
                var _this = this;
                if (!this.addingOptions.includes(val)) {
                    this.addingOptions.push(val);
                    this.$parent.$emit('receiveRequirementsOffer', this.addingOptions);
                    this.tempOptions = [];
                    autoInput.value = '';
                    autoInput.focus();
                    setTimeout(function () {
                        _this.moveTo();
                    }, 50);
                }
            },
            removeFromReqs: function (e, val) {
                let autoInput = document.getElementById(this.autocompleteId);
                var _this = this;

                let reqWidth = e.srcElement.parentElement.offsetWidth;
                let reqMargin = parseInt(window.getComputedStyle(e.srcElement.parentElement, null).getPropertyValue('margin-right'));

                this.addingOptions.splice(this.addingOptions.findIndex(function (el) {
                    return el === val;
                }), 1);
                this.$parent.$emit('receiveRequirementsOffer', this.addingOptions);

                this.tempOptions = [];
                autoInput.value = '';
                autoInput.focus();
                setTimeout(function () {
                    _this.moveBack(reqWidth, reqMargin);
                }, 55);
            },
            addOptIntoResult: function () {
                let searchItem = document.getElementsByClassName('select-opt')[0];
                let autoInput = document.getElementById(this.autocompleteId);
                var _this = this;
                if (searchItem) {
                    this.addingOptions.push(this.tempOptions.find(function (el) {
                        return el.label.toLowerCase() === searchItem.innerText.toLowerCase();
                    }).label);

                    this.$parent.$emit('receiveRequirementsOffer', this.addingOptions);

                    this.tempOptions = [];
                    autoInput.value = '';
                    autoInput.focus();
                    setTimeout(function () {
                        _this.moveTo();
                    }, 50);
                }
            },
            moveUpSelect: function () {
                let currentOpt = document.getElementsByClassName(this.classes.selectOption)[0];
                if (currentOpt.previousSibling) {
                    currentOpt.previousSibling.classList.add(this.classes.selectOption);
                    currentOpt.classList.remove(this.classes.selectOption);
                }
            },
            moveDownSelect: function () {
                let currentOpt = document.getElementsByClassName(this.classes.selectOption)[0];
                if (currentOpt.nextSibling) {
                    currentOpt.nextSibling.classList.add(this.classes.selectOption);
                    currentOpt.classList.remove(this.classes.selectOption);
                }
            },
            moveTo: function () {
                let req = document.getElementsByClassName('adding-opt')[document.getElementsByClassName('adding-opt').length - 1];

                this.offsetSelect += req.offsetWidth + parseInt(window.getComputedStyle(req, null).getPropertyValue('margin-right'));

                // let a = this.offsetSelect + parseInt(window.getComputedStyle(
                //     document.getElementsByClassName('wrap-input')[0], null).getPropertyValue('padding-left'));

                document.getElementById('autocomplete-select').style.left = this.offsetSelect + 'px';
            },
            moveBack: function (reqWidth, reqMargin) {

                this.offsetSelect -= (reqWidth + reqMargin);

                document.getElementById('autocomplete-select').style.left = this.offsetSelect + 'px';
            },
            makeFocus: function () {
                document.getElementById(this.autocompleteId).focus();
            }
        },
        created() {
            if (this.inputValue.length !== 0) {
                this.tmp = this.inputValue.slice();
                for (let i = 0; i < this.inputValue.length; i++) {
                    this.addingOptions.push(this.inputValue[i]);
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

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

    input:focus
        color #34343e
        opacity 1 !important

    input::-webkit-input-placeholder
        opacity 1
        line-height 1.29
        font-size 14px

    input.autocomplete-input
        margin-top 0 !important

    .adding-item
        white-space pre
        margin-right 6px

    .qwe
        color red !important

    .select-opt
        background-color #f0f0f0 !important

    .row-flex-start
        display flex
        justify-content start

    .adding-opt
        background-color rgba(13, 23, 23, 0.08)
        padding 0 6px 0 6px
        font-size 14px
        line-height 1.29
        display flex
        margin-right 12px
        justify-content center
        align-items center

    .close-adding
        width 10px
        height 10px

    .d-none
        display none

    .d-block
        d-block

    .auto-select
        width 280px
        list-style none
        box-shadow 0 5px 20px 0 rgba(0, 0, 0, 0.12)
        padding 0
        border-radius 2px
        background-color #f7f7f7
        z-index 1000
        max-height 188px
        overflow auto

        li
            padding 9px 0 9px 18px
            background-color transparent
        li:hover
            background-color #f0f0f0

    @media (max-width: 425px)
        .form
            & .control
                & .wrap-input
                    padding-left 0
</style>