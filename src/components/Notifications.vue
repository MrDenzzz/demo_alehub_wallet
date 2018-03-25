<template>
    <div class="wallet">

        <Navbar
            :title="$t('pages.notifications.navbarTitle')"
            :isNavigate="true"
            :isBalance="false"
            :isHide="true"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <Spinner v-if="isLoader"/>
                            <Notif-panel
                                    v-else-if="!isLoader && notifications.length !== 0"
                                    :notifications="notifications"/>

                            <p v-else class="no-found">{{ $t('pages.notifications.notFound') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Navbar from "./layouts/Navbar";
    import NotifPanel from "./layouts/NotifPanel";
    import Spinner from './layouts/Spinner';

    import sha256 from 'sha256';

    import {mapMutations} from "vuex";
    import {mapGetters} from "vuex";

    export default {
        name: "Notifications",
        components: {
            Navbar,
            NotifPanel,
            Spinner
        },
        data() {
            return {
                isLoader: false
            }
        },
        computed: {
            ...mapGetters([
                'notifications'
            ]),
        },
        methods: {
            ...mapMutations({
                toggleNotifBadge: "TOGGLE_NOTIF_BADGE"
            }),
            getTransactions: function () {
                this.isLoader = true;

                this.$store.dispatch('getNotifications'
                ).then(() => {
                    this.isLoader = false;
                    console.log('Success getting notifications');
                }).catch(() => {
                    console.log('Error getting notifications');
                });
            }
        },
        mounted() {

        },
        created() {
            this.toggleNotifBadge(false);
            this.getTransactions();
        }
    };
</script>

<style lang="stylus" scoped>
    .no-found
        text-align center
        color #34343e
        font-size 14px
        font-family MuseoSansCyrl500
        line-height calc(100vh - 250px)

    .main
        .content
            padding-left 0

    .col-12
        display flex
        justify-content center
        align-items center

</style>
