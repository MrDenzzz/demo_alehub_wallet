<template>
    <div class="wallet">
        <navbar
            :title="$t('pages.notifications.navbarTitle')"
            :isNavigate="true"
            :isBalance="false"
            :isHide="true"/>

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <spinner v-if="dataProcessing"/>
                            <notif-panel v-else-if="!dataProcessing && notifications.length !== 0"
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
    import Navbar from './layouts/Navbar';
    import NotifPanel from './layouts/NotifPanel';
    import Spinner from './layouts/Spinner';

    import {mapGetters} from 'vuex';

    export default {
        name: 'Notifications',
        components: {
            Navbar,
            NotifPanel,
            Spinner
        },
        data() {
            return {
                dataProcessing: false
            }
        },
        computed: {
            ...mapGetters([
                'notifications'
            ]),
        },
        methods: {
            getCurrentNotifications: function () {
                this.dataProcessing = true;

                this.$store.dispatch('getNotifications'
                ).then(() => {
                    this.dataProcessing = false;
                    console.log('Success getting notifications');
                }).catch(() => {
                    console.log('Error getting notifications');
                });
            },
            changeToggleNotificationBadge: function (val) {
                this.$store.dispatch('toggleNotificationBadge',
                    val
                ).then(() => {
                    console.log('Success toggle notifications badge');
                }).catch(() => {
                    console.log('Error toggle notifications badge');
                });
            }
        },
        created() {
            this.changeToggleNotificationBadge(false);
            this.getCurrentNotifications();
        },
        mounted() {

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
