<template>
    <div class="wallet">
        <navbar :title="$t('pages.summary.navbarTitle')"
                :isNavigate="true"
                :isBalance="true"
                :rightMenu="rightMenu"
                :isProfile="true"/>

        <section class="main">
            <div class="profile-content">
               <div class="row">
                    <div class="col-3">
                        <div class="first-info">
                            <img :src="'https://ale-demo-4550.nodechef.com/'+ userAvatar" alt="" class="avatar">
                            <span class="user-name">{{ userName }}</span>
                        </div>
                        <div class="second-info">
                            <div class="item">
                                <div class="item-name">Закончил проектов</div>
                                <div class="item-data">15</div>
                            </div>
                            <div class="item">
                                <div class="item-name">Статус</div>
                                <div class="item-data">Выполняет задание</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-9">
                        
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from './layouts/Navbar';

    import Moment from 'moment';

    import sha256 from 'sha256';

    import {mapGetters} from "vuex";

    export default {
        name: 'Summary',
        components: {
            Navbar
        },
        data() {
            return {
                rightMenu: {
                    horizontal: false,
                    list: [
                        {
                            type: "link",
                            name: this.$t('pages.summary.rightMenu.summary'),
                            link: "/"
                        },
                        {
                            type: "link",
                            name: this.$t('pages.summary.rightMenu.walletSettings'),
                            link: "/wallet/settings"
                        },
                        {
                            type: "link",
                            name: this.$t('pages.summary.rightMenu.myOffers'),
                            link: "/offers/my"
                        }
                    ]
                }
            }
        },
        computed: {
            ...mapGetters(
                [
                    'userAvatar',
                    'userName'
                ]
            ),

            selectedTheme: function () {
                return this.$store.state.Themes.theme;
            }
        },
        methods: {

        },
        created() {

        },
        mounted() {
            
        }
    }
</script>

<style lang="stylus" scoped>
    .wrap-spinner
        margin-top 33vh

        img
            margin-top 0

    .profile-content
        padding 24px 24px 0 24px
        width 100%

        .row
            display flex

            .col-3
                width 350px
                display flex
                align-items center
                justify-content center
                flex-direction column

                .first-info
                    display flex
                    align-items center
                    justify-content center
                    flex-direction column
                    background-color #f0f0f0
                    padding 32px
                    width 100%

                    .avatar
                        width 250px
                        height 250px
                        border-radius 50%
                        object-fit cover

                    .user-name
                        font-family MuseoSansCyrl500
                        font-size 22px
                        line-height 1.33
                        color #34343e
                        margin-top 28px

                .second-info
                    display flex
                    align-items left
                    justify-content center
                    flex-direction column
                    background-color #f0f0f0
                    padding 22px 32px 32px
                    width 100%
                    margin-top 20px

                    .item
                        display flex
                        justify-content space-between
                        &:not(first-child)
                            margin-top 10px

                        .item-name
                            font-family MuseoSansCyrl300
                            color #34343e

                        .item-data
                            font-family MuseoSansCyrl500
                            color #34343e

</style>
