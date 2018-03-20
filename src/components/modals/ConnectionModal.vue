<template>
    <modal name="connectionmodal" height="auto" class="modal-md" :clickToClose="false" @opened="modalOpened">
        <div class="heading">
            <p class="title" v-if="isLoader">Reconnecting</p>
            <p class="title" v-else>No internet connection</p>
        </div>

        <div class="body body-loader" v-if="isLoader">
            <div class="modal-control text-center noLine">
                <span class="modal-desc">Trying to connect ALE servers…</span>
            </div>
            <Spinner class="loader" />
        </div>

        <div class="body" v-else>

            <div class="modal-control text-center noLine">
                <span class="modal-desc">To use this app you need internet connection. Seems that there are some problems with yours. </span>
            </div>

            <div class="modal-btn text-center">
                <button class="btn btn-yellow btn-large" @click="tryConnect">
                    Try to reconnect
                </button>
            </div>

        </div>
    </modal>
</template>

<script>
    import Spinner from '../layouts/Spinner';

    export default {
        name: 'backupCodes',
        components: {
            Spinner
        },
        data() {
            return {
                isLoader: false
            }
        },
        methods: {
            tryConnect() {
                this.isLoader = true;
                let connectStatus = navigator.onLine;
                if(connectStatus) return this.$modal.hide('connectionmodal');
                return window.addEventListener('online', this.updateOnlineStatus);
            },
            updateOnlineStatus() {
                let connectStatus = navigator.onLine;
                if(connectStatus) return this.$modal.hide('connectionmodal');
            },
            modalOpened() {
                this.isLoader = false;
            }
        }
    }
</script>

<style lang="scss">
    @import './modals.scss';

    .modal-input {
        & input {
            width: 100%;
        }
    }

    .modal-md {
        & .v--modal-box {
            & .body {
                & .modal-control {
                    &.noLine {
                        border-bottom: none;
                        padding-bottom: 0;
                    }
                }
            }
            & .body-loader {
                margin-bottom: 20px;

                & .loader {
                    margin-top: 10px;
                }
            }
        }
    }

    .modal-btn {
        & .btn-large {
            padding: 11px 70px 11px 70px !important;
        }
    }
</style>
