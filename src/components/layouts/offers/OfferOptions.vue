<template>
    <div class="offer-option">
        <div class="offer-option-toggle"
             @click="toggleMenu">
            <img alt="offer toggle menu"
                 :src="getIcon('options-dark')">
        </div>
        <transition name="fade-bottom">
            <div class="offer-option-menu"
                 v-if="openedOptions">
                <div class="offer-option-item">
                    <span>Save</span>
                </div>
                <div class="offer-option-item">
                    <span>Template</span>
                </div>
                <div class="offer-option-item">
                    <span>Watch</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'OffersOptions',
        props: {
            hiddenOfferOptions: {
                type: Boolean,
                required: true
            },
            offerId: {
                type: Number,
                required: true
            },
            openedOptions: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                opened: false
            }
        },
        computed: {
            ...mapGetters(
                [
                    'openedOfferOptions'
                ]
            ),
        },
        methods: {
            toggleMenu: function () {

                this.$store.dispatch('toggleOfferOptions', this.offerId).then().catch();

                // this.opened = !this.opened;
                // this.$parent.$emit('unhideOfferOptions', false);
                // this.$store.dispatch('toggleOfferOptions'
                // ).then(resp => {
                //     this.opened = this.openedOfferOptions;
                // }).catch(err => {
                //     console.log('err');
                // });
            },
            getIcon: function (name) {
                return require(`../../../assets/img/${name}.svg`);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .fade-bottom-enter-active
        transition all .2s ease-out

    .fade-bottom-leave-active
        transition all .2s ease-in

    .fade-bottom-enter, .fade-bottom-leave-to
        transform translateY(30px)
        opacity 0

    .offer-option
        position relative
        width 70px
        height 30px
        display flex
        justify-content center
        align-items center

        .offer-option-toggle
            cursor pointer

        .offer-option-menu
            z-index 30
            position absolute
            bottom -105px
            right -65px
            background-color #ffffff
            border-radius 4px
            box-shadow 0 1px 6px 0 rgba(0, 0, 0, .18)

            .offer-option-item
                cursor pointer
                padding 8px 12px
                transition all .2s ease

                &:hover
                    background-color #ffd24f

                span
                    font-family MuseoSansCyrl500
                    font-size 14px

</style>