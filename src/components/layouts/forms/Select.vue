<template>
    <div :class="{'select-offer': typeSelect === 'offer', 'select-curency': typeSelect === 'curency'}" class="select">
        <span class="value" :class="{'value-offer': typeSelect === 'offer', 'value-offer-sort': sortBy}"
              @click="changeOption">{{ currentOption }}</span>
        <div class="list list-select" :class="{'list-offer': typeSelect === 'offer', 'list-offer-sort': sortBy, 'list-count-offers': countOffers}"
             v-show="isOpenOptions">
            <ul>
                <li
                    v-for="(option, index) in allOptions"
                    :key="index"
                    :class="{ 'selected': option === currentOption, 'li-offer': typeSelect === 'offer',
                    'selected-offer':  typeSelect === 'offer' && option === currentOption}"
                    @click="newSelect(option)"
                >
                    {{ option }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Select",
        props: {
            current: {
                type: String,
                required: true
            },
            allOptions: {
                type: Array,
                required: true
            },
            typeSelect: String,
            sortBy: [String, Boolean],
            countOffers: [String, Number],
            id: String
        },
        data() {
            return {
                currentOption: this.current,
                isOpenOptions: false,
                target: ''
            };
        },
        methods: {
            changeOption: function (e) {
                e.target.nextElementSibling.style.display = 'block';
                this.target = e.target;
            },
            newSelect: function (option) {
                this.currentOption = option;
                this.target.nextElementSibling.style.display = 'none';
                this.$parent.$emit('onselect', option, this.id);
            },
            hideSelectList: function (e) {
                let t = e.target;
                if (t.className.indexOf('value') === -1 && t.className.indexOf('selected') === -1) {
                    let lists = document.getElementsByClassName('list-select');
                    for (let i = 0; i < lists.length; i++) {
                        lists[i].style.display = 'none';
                    }
                }
            }
        },
        created() {
            let self = this;
            setTimeout(() => {
                window.onclick = function(e) {
                    self.hideSelectList(e);
                };
                window.onkeyup = function(e) {
                    if (e.keyCode !== 27) return false;
                    self.hideSelectList(e);
                }
            }, 40);
        }
    };
</script>

<style scoped lang="scss">
    $l-r-padding: 18px;
    $t-b-padding: 9px;

    .select {
        position: relative;
        outline: none;
        margin-top: 16px;
        margin-right: 18px;

        & .value {
            opacity: 0.5;
            display: block;
            position: relative;
            font-family: MuseoSansCyrl500;
            font-size: 14px;
            color: #1f202a;
            cursor: pointer;
            overflow-x: hidden;
            white-space: nowrap;
            &::before {
                content: "";
                position: absolute;
                background: url(../../../assets/img/arrow_down.svg);
                background-size: cover;
                width: 11.5px;
                height: 7px;
                top: 8px;
                right: 0px;
                z-index: 1;
                color: #bbbbbb;
                line-height: 40px;
                font-size: 14px;
            }
        }

        & .list {
            position: absolute;
            top: 0;
            width: 100%;
            height: auto;
            background: #fff;
            opacity: 1;
            outline: none;
            box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.12);
            overflow: hidden;
            transition: opacity 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);
            z-index: 2;

            & ul {
                display: block;
                margin: 0;
                padding: 0;
                background-color: #f7f7f7;

                & li {
                    display: block;
                    list-style: none;
                    font-family: MuseoSansCyrl500;
                    font-size: 14px;
                    color: #1f202a;
                    padding: $t-b-padding $l-r-padding;
                    cursor: pointer;
                    position: relative;
                }

                &.selected {
                    &::before {
                        content: "";
                        position: absolute;
                        background: url(../../../assets/img/selected-ic.svg);
                        background-size: cover;
                        width: 11.5px;
                        height: 7px;
                        top: 17px;
                        right: 18px;
                        z-index: 1;
                        color: #000;
                        line-height: 40px;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    $width-value-offer: 17px;

    .select-offer {
        padding: 0 $l-r-padding;
        margin: 0;

        & .value-offer {
            opacity: 1;
            width: $width-value-offer;
            &::before {
                content: none !important;
            }
        }

        & .list-offer {
            width: calc(100%);
            top: -9px;
            left: 0;
            & ul {
                & li {
                    padding: $t-b-padding $l-r-padding;
                }
                & .selected-offer {
                    background-color: #f0f0f0;
                    &::before {
                        content: none !important;
                    }
                }
            }
        }
    }

    .list-offer-sort {
        width: 151px + 2 * $l-r-padding !important;
    }

    .value-offer-sort {
        width: 100% !important;
    }

    .list-offer-sort {
        width: 190px;
    }

    .select.select-curency {
        margin: 0;
        padding-left: 4px;
        width: 45px;
        opacity: 1;

        & .value {
            opacity: 1;
            color: #34343e;
            font-family: MuseoSansCyrl300;
        }

        & :before {
            top: 6px;
            background: url(../../../../static/img/curency-expand-arrow.svg);
            background-size: cover;
            width: 9px;
            height: 5px;
        }

        & .list.list-select {
            width: 90px;

            & ul {
                & li {
                    &::before {
                        top: 14px;
                    }
                }
            }
        }
    }
</style>
