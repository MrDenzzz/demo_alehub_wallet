<template>
    <div class="heading">
        <div v-if="newWalletStep === 1">
            <p class="title title-expand"
                @click="openDropdown">
                {{ modalTitle }}
                <i class="arrow"></i>
            </p>
            <i class="close"
                v-if="isCloseModal"
                @click="closeModal"></i>
            <div class="dropdown-list list-select"
                v-show="isOpenOptions">
                <ul>
                    <li v-for="(option, optionIndex) in dropDownOption"
                        :class="{ 'selected': option.isSelected }"
                        @click="changeType(optionIndex)" :key="optionIndex">
                        {{ option.title }}
                    </li>
                </ul>
            </div>
        </div>

        <div v-else>
            <i class="back"
                @click="changeRecoveryStep"></i>
            <p class="title">
                {{ $t('modals.newWallet.recovery.phrase.title') }}
            </p>
            <i class="close"
                v-if="isCloseModal"
                @click="closeModal"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewWalletHead",
        props: {
            newWalletStep: {
                type: Number,
                required: true,
            },
            dropDownOption: {
                type: Array,
                required: true,
            },
            isCloseModal: {
                type: Boolean,
                required: true,
            },
            isOpenOptions: {
                type: Boolean,
                required: true,
            }
        },
        computed: {
            modalTitle: function () {
                let type = this.dropDownOption.find(item => {
                    return item.isSelected;
                });
                return type.title;
            },
        },
        methods: {
            openDropdown: function () {
                this.$parent.$parent.$emit('openDropdown');
            },
            closeModal: function () {
                this.$parent.$parent.$emit('closeModal');
            },
            changeType: function (index) {
                this.$parent.$parent.$emit('changeType', index);
            },
            changeRecoveryStep: function () {
                this.$parent.$parent.$emit('changeRecoveryStep');
            }
        },
    }
</script>