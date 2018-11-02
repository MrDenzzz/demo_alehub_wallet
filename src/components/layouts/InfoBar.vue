<template>
    <div class="info-bar" v-if="selectedOffer">
        <div class="info-wrap">
            <div class="project">
                <div class="circle"></div>
                <div class="project-info">
                    <div class="title">{{ selectedOffer.name }}</div>
                    <div class="subtitle">{{ selectedOffer.company }}</div>
                </div>
            </div>
            <div class="info">
                <div class="title">
                    Global limit
                </div>
                <div class="subtitle">
                    {{ selectedOffer.price }}
                </div>
            </div>
            <div class="info">
                <div class="title">
                    Contract period
                </div>
                <div class="subtitle">
                    {{ parseDate(selectedOffer.date.from) }} - {{ parseDate(selectedOffer.date.to) }}
                </div>
            </div>
            <div class="info">
                <div class="title">
                    Status
                </div>
                <div class="subtitle">
                    {{ parseStatus(selectedOffer.conditionId) }}
                </div>
            </div>
        </div>
        <button class="buttons btn-yellow" 
                v-if="!checkApplyed"
                @click="apply">
            Apply
        </button>
        <div class="options" @click="showMenu = !showMenu">
            <img :src="getIcon('menu')" alt="">
        </div>
        <div class="dropdown-list" v-if="showMenu">
            <div class="dropdown-item">Add document</div>
            <div class="dropdown-item">Add contractor</div>
                <div class="dropdown-item delete">Edit contract</div>
                <div class="dropdown-item delete">Make a copy</div>
        </div>
    </div>
</template>

<script>
import Moment from 'moment';
import {mapActions} from 'vuex';

export default {
    name: 'InfoBar',
    data() {
        return {
            showMenu: false,
            project: {
                name: 'Alehub',
                company: 'Effective Energy',
                limit: '53388',
                startDate: '10 May, 2018',
                finalDate: '23 Dec, 2019',
                status: 'On track'
            }
        }
    },
    props: {
        offers: {
            type: Array
        },
        conditions: {
            type: Array
        }
    },
    computed: {
        selectedTheme() {
            return this.$store.state.Themes.theme;
        },
        selectedOffer() {
            return this.offers.find(item => {
                return item.id === Number(this.$route.params.id);
            });
        },
        checkApplyed() {
            if (this.selectedOffer.contractors.findIndex(item => {
                return item.contractorId === 4;
            }) !== -1)
                return true;

            return false;
        }
    },
    methods: {
        ...mapActions([
            'applyOffer'
        ]),
        getIcon: function (name) {
            return this.selectedTheme === 'dark' ? require(`../../../static/img/${name}_dark.svg`) : require(`../../../static/img/${name}.svg`);
        },
        parseDate: function (date) {
            return Moment(date).format('D MMM, YYYY');
        },
        parseStatus: function (id) {
            return this.conditions.find(item => {
                return item.id === id;
            }).title;
        },
        apply: function () {
            this.applyOffer(this.$route.params.id);
        }
    }
}
</script>


<style lang="stylus" scoped>
    .buttons
        margin-bottom 0
        height 38px
    .info-bar
        padding 83px 32px 19px
        background-color #ececec
        display flex
        justify-content space-between
        align-items center
        position relative

        @media(max-width 520px)
            padding 75px 32px 12px

        .options
            padding 4px 12px
            cursor pointer

            @media(max-width 1024px)
                display unset !important

        .info-wrap
            display flex
            align-items center
            justify-content space-between
            width 50%

            @media(max-width 1440px)
                width 60%

            @media(max-width 1100px)
                width 70%

            @media(max-width 960px)
                width 80%

            @media(max-width 768px)
                width 90%

            .info
                @media(max-width 520px)
                    display none

            .title
                font-family MuseoSansCyrl500
                opacity 0.5
                font-size 12px
                line-height 1.5
                color #34343e
                white-space nowrap

                @media(max-width 660px)
                    font-size 10px

            .subtitle
                font-family MuseoSansCyrl500
                font-size 19px
                line-height 1.29
                color #34343e
                white-space nowrap
                text-transform capitalize

                @media(max-width 960px)
                    font-size 16px

                @media(max-width 660px)
                    font-size 12px

        .project
            display flex
            align-items center

            .circle
                margin-right 12px

                @media(max-width 660px)
                    width 36px
                    height 36px

            .project-info
                .title
                    font-family MuseoSansCyrl500
                    font-size 17px
                    line-height 1.29
                    color #34343e
                    opacity 1
                    white-space nowrap

                    @media(max-width 660px)
                        font-size 12px

                .subtitle
                    font-family MuseoSansCyrl500
                    font-size 12px
                    line-height 1.5
                    color #34343e
                    opacity 0.5
                    white-space nowrap

                    @media(max-width 660px)
                        font-size 10px

    .circle
        width 48px
        height 48px
        background-image linear-gradient(to right, #525252, #222222)
        border-radius 50%

    .dropdown-list
        border-radius 2px
        background-color #ffffff
        box-shadow 0 0 32px 0 rgba(0, 0, 0, 0.12), 0 4px 16px 0 rgba(0, 0, 0, 0.24)
        position absolute
        display flex
        flex-direction column
        justify-content space-between
        width 148px
        min-width 148px
        height 126px
        top 127px
        padding 7px 0
        left unset
        right 26px

        .dropdown-item
            font-family MuseoSansCyrl500
            font-size 12px
            color #34343e
            padding 7px 24px

            &:hover
                background-color #ededed

    // Dark Theme
    .dark
        .info-bar
            background-color #3f435e

            .info-wrap
                .title
                    color #fcfcfc

                .subtitle
                    color #fcfcfc
        
        .dropdown-list
            background-color #4a4e65

            .dropdown-item
                color #fcfcfc
                
                &:hover
                    background-color #3f435e
</style>
