<template>
    <div class="control" id="control" @click="makeFocusDatepicker">
        <div class="wrap-input">
            <label>{{ $t('pages.newOffer.fields.deadline.label') }}</label>
            <div class="row-flex-start">
                <datepicker
                        id="datepicker"
                        v-model="date"
                        language="en"
                        :placeholder="placeholderDate"
                />
                <the-mask
                        mask="##:##"
                        :placeholder="placeholderTime"
                        v-model="time"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import path from 'path';

    export default {
        name: 'datepicker-control',
        props: {
            placeholderDate: {
                type: String,
                required: true
            },
            placeholderTime: {
                type: String,
                required: true
            },
            inputValue: [String, Array, Number],
            isCreate: Boolean
        },
        components: {
            Datepicker
        },
        data() {
            return {
                date: null,
                time: null
            }
        },
        watch: {
            date: function (val) {
                this.$parent.$emit('receiveDateOffer', val.getTime());
            },
            time: function (val) {
                this.$parent.$emit('receiveTimeOffer', val.substring(0, 2) * 60 * 60 * 1000 + val.substring(2, 4) * 60 * 1000);
            }
        },
        methods: {
            makeFocusTime: function () {
                // document.getElementById('datepicker').click();
            },
            makeFocusDatepicker: function () {
                // document.getElementsByClassName('vdp-datepicker__calendar')[0].style.display = 'block';
            },

            initialDateFromProps: function () {
                let date = new Date(this.inputValue);
                this.date = new Date(this.inputValue - (date.getHours() * 60 * 60 * 1000 + date.getMinutes() * 60 * 1000));
            },
            initialTimeFromProps: function () {
                let time = new Date(this.inputValue);
                if (time.getMinutes() === 0)
                    this.time = time.getHours().toString() + "00";
                else
                    this.time = time.getHours().toString() + time.getMinutes().toString();
            }
        },
        mounted() {
            let imgNext = document.createElement('img');
            imgNext.src = path.join(__dirname, '../../../static/img/arrow-right.svg');
            imgNext.classList.add('arrow');
            document.getElementsByClassName('next')[0].innerHTML = '';
            document.getElementsByClassName('next')[0].appendChild(imgNext);

            let imgPrev = document.createElement('img');
            imgPrev.src = path.join(__dirname, '../../../static/img/arrow-left.svg');
            imgPrev.classList.add('arrow');
            document.getElementsByClassName('prev')[0].innerHTML = '';
            document.getElementsByClassName('prev')[0].appendChild(imgPrev);

            if (!this.isCreate) {
                this.initialTimeFromProps();
                this.initialDateFromProps();
            }
        }
    }
</script>

<style lang="stylus">
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button
        -webkit-appearance none
        -moz-appearance none
        appearance none
        margin 0


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


    .row-flex-start
        display flex
        justify-content start

    #datepicker
        cursor pointer

    #datepicker::-webkit-input-placeholder
        opacity 1
        line-height 1.29
        font-size 14px

    .vdp-datepicker__calendar
        background-color #f7f7f7
        box-shadow 0 5px 20px 0 rgba(0, 0, 0, 0.12)
        border 0 !important
        padding 7px

        header
            .next, .prev
                display flex
                justify-content center
                align-items center
                height 40px

                .arrow
                    width 7.5px

            .next:after, .prev:after
                content initial !important

        .day-header
            font-family MuseoSansCyrl500 !important
            color #0d1717 !important
            font-size 12px !important

        .day:hover, .month:hover, .year:hover
            background-color #f0f0f0 !important
            border 1px solid #f0f0f0 !important

        .selected
            background-color #f0f0f0 !important
    @media (max-width: 425px)
        .form
            & .control
                & .wrap-input
                    padding-left 0
</style>
