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
                            <Notif-panel :notifications="notifications"
                                         v-else-if="!isLoader && notifications.length !== 0"/>

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

    import {mapMutations} from "vuex";

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
            notifications () {
                return this.$store.state.Notifications.notifications;
            },
            currentWallet: function() {
                return this.$store.state.Wallets.currentWallet;
            },
            transactions () {
                return this.$store.state.Transactions.transactions
            },
            language () {
                return localStorage.getItem('systemLang')
            }
        },
        watch: {
            transactions () {
                this.initNotification()
            }
        },
        methods: {
            ...mapMutations({
                changeWallet: "CHANGE_SELECTED_WALLET",
                toggleNotifBadge: "TOGGLE_NOTIF_BADGE",
                addNewNotification: "ADD_NEW_NOTIFICATION",
                resetNotification: "RESET_NOTIFICATION"
            }),
            imitationLoadPage() {
                this.isLoader = true;
                setTimeout(() => {
                    this.isLoader = false;
                }, 750);
            },
            initNotification () {
                this.resetNotification();
                for (let i = 0; i < this.transactions.length; i++) {
                    this.addNewNotification({
                        status: 'new',
                        isDeleted: false,
                        isSubtitle: false,
                        date: this.transactions[i].timestamp,
                        title: this.language === 'rus' ? this.checkType(this.transactions[i].walletAddress) ? `Вы **отправили** <span class="deleted">-${this.transactions[i].count}</span> ALC на адрес **${this.transactions[i].walletDestination}**` : 
                                `Вы **получили** <span class="accepted">+${this.transactions[i].count}</span> ALC с адреса **${this.transactions[i].walletAddress}**` : 
                                this.checkType(this.transactions[i].walletAddress) ? `You **sent** <span class="deleted">-${this.transactions[i].count}</span> ALC to **${this.transactions[i].walletDestination}** address` : 
                                `You **received** <span class="accepted">+${this.transactions[i].count}</span> ALC from **${this.transactions[i].walletAddress}** address`,
                        // subTitle: 'Balance',
                        // changes: [{
                        //     status: 'old',
                        //     text: `_${this.checkType(this.transactions[i].walletAddress) ? this.transactions[i].balanceInfo.before : this.transactions[i].balanceInfo.after}_ ALC`
                        // }, {
                        //     status: 'updated',
                        //     text: `_${this.checkType(this.transactions[i].walletAddress) ? this.transactions[i].balanceInfo.after : this.transactions[i].balanceInfo.before}_ ALC`
                        // }]
                    })
                }
            },
            checkType(address) {
                return this.currentWallet.address === address ? true : false
            }
        },
        mounted() {
            this.$on("selectWallet", function (index) {
                this.changeWallet(index);
            })
        },
        created() {
            this.toggleNotifBadge(false);
            this.imitationLoadPage();
            this.initNotification();
        }
    };
</script>

<style scoped lang="scss">
    .no-found {
        text-align: center;
        color: #34343e;
        font-size: 14px;
        font-family: MuseoSansCyrl500;
        line-height: calc(100vh - 250px);
    }
</style>
