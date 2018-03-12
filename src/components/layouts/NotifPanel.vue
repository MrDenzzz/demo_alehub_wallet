<template>
    <div class="notifications-panel">
        <div v-for="(notification, notificationIndex) in notifications" :key="notificationIndex">
            <Panel-heading :title="parseDate(notification.date)" :isTop="true" v-if="check(notificationIndex)"/>

            <div class="notif-panel">
                <div class="panel-heading">
                    <h3 class="title" v-html="parseMarkDown(notification.title)"></h3>
                    <h3 class="datetime">{{ parseDate(notification.date) }} {{ $t('pages.notifications.in') }} <span class="bold">{{ parseTime(notification.date) }}</span>
                    </h3>
                </div>
                <h4 class="subtitle" v-if="notification.isSubtitle">{{ notification.subTitle }}:</h4>
                <div class="changed-line" v-for="change in notification.changes" v-if="notification.changes.length"
                     :class="{ 'line-update': change.status == 'updated' }">
                    <span class="icon" v-if="change.status == 'old'">–</span>
                    <span class="icon" v-if="change.status == 'updated'">+</span>
                    <span class="message" v-html="parseMarkDown(change.text)"></span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import PanelHeading from './PanelHeading';
    import Moment from 'moment';

    let md = require("node-markdown").Markdown;

    export default {
        name: 'notifPanel',
        props: {
            notifications: {
                type: [Array, Object],
                required: true
            }
        },
        components: {
            PanelHeading
        },
        methods: {
            parseMarkDown(text) {
                return md(text);
            },
            check(index) {
                if (index === 0) return true;
                if (index === this.notifications.length) {
                    if (Moment(this.notifications[index].date).format('YYYY/MM/DD') === Moment(this.notifications[index + 1].date).format('YYYY/MM/DD')) return false;
                    return true;
                } else {
                    if (Moment(this.notifications[index].date).format('YYYY/MM/DD') === Moment(this.notifications[index - 1].date).format('YYYY/MM/DD')) return false;
                    return true;
                }
            },
            parseDate(date) {
                let currentDate = new Date();
                let yesterdayDate = new Date();
                yesterdayDate = yesterdayDate.setDate(yesterdayDate.getDate() - 1);
                if (Moment(date).format('YYYY/MM/DD') === Moment(currentDate).format('YYYY/MM/DD')) {
                    return this.$t('pages.notifications.today');
                }
                if (Moment(date).format('YYYY/MM/DD') === Moment(yesterdayDate).format('YYYY/MM/DD')) {
                    return this.$t('pages.notifications.yesterday');
                }
                return Moment(date).format('MM/DD');
            },
            parseTime(date) {
                return Moment(date).format('HH:mm');
            }
        }
    }
</script>
