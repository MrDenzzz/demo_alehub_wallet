<template>    
    <div class="create-offer">
        <Navbar
                :title="$t('pages.newOffer.navbarTitle')"
                :isNavigate="true"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="form">
                                <input-control
                                    :labelValue="'Offer Name'"
                                    :inputId="'offerName'"
                                    :placeholder="'Enter the name of the offer'"
                                    :fullWidth="true"
                                />
                                <textarea-control
                                    :label-value="$t('pages.newOffer.fields.description.label')"
                                    :textarea-id="'description'"
                                    :placeholder="'Type your description here'"
                                    :fullWidth="true"
                                />
                                <div class="control">
                                    <div class="wrap-input datepick">
                                        <label for="offerName">Start Date</label>
                                        <datepicker
                                            id="datepicker"
                                            v-model="newOffer.startDate"
                                            language="en"
                                            :placeholder="'Choose start time'"
                                        />
                                    </div>
                                </div>
                                <div class="control">
                                    <div class="wrap-input datepick">
                                        <label for="offerName">Final Date</label>
                                        <datepicker
                                            id="datepicker"
                                            v-model="newOffer.finalDate"
                                            language="en"
                                            :placeholder="'Choose final time'"
                                        />
                                    </div>
                                </div>
                                <input-control
                                    :labelValue="'Offer Price'"
                                    :inputId="'offerPrice'"
                                    :placeholder="'Enter the price of the offer'"
                                    :fullWidth="true"
                                    :inputType="'number'"
                                />
                            </div>
                            <div class="additional" @click="toggleAdd">
                                Additional
                            </div>
                            <div class="form addition" :class="{'add-opened': isOpened}">
                                <div class="outer">
                                    <input-control
                                        :labelValue="'Project Name'"
                                        :inputId="'projectName'"
                                        :placeholder="'Enter the name of the project'"
                                        :fullWidth="true"
                                    />
                                    <input-control
                                        :labelValue="'Requirements and Skills'"
                                        :inputId="'reqs'"
                                        :placeholder="'Enter the Requirements and Skills'"
                                        :fullWidth="true"
                                    />
                                </div>
                            </div>
                            <button class="buttons btn btn-yellow" @click="createNewOffer(newOffer)">Create Offer</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from './layouts/Navbar';
import TextareaControl from './layouts/forms/TextareaControl';
import InputControl from './layouts/forms/InputControl';
import Datepicker from 'vuejs-datepicker';
import { mapActions } from 'vuex';

export default {
    name: 'CreateOffer',
    components: {
        Navbar,
        TextareaControl,
        InputControl,
        Datepicker
    },
    data() {
        return {
            newOffer: {
                name: '',
                description: '',
                projectName: '',
                companyName: '', // take from current user
                companyLogo: '', // take from current user
                startDate: '',
                finalDate: '',
                skills: '',
                price: null
            },
            isOpened: false
        }
    },
    methods: {
        ...mapActions([
            'createNewOffer'
        ]),
        toggleAdd: function () {
            this.isOpened = !this.isOpened;
            if (this.isOpened) {
                document.querySelector('.addition').style.height = document.querySelector('.addition .outer').scrollHeight+'px';
            } else {
                document.querySelector('.addition').style.height = '0px';
            }
        }
    },
    mounted () {
        this.$on('imitVModel', function(value, id) {
            if (id === 'offerName') this.newOffer.name = value;
            if (id === 'offerPrice') this.newOffer.price = value;
            if (id === 'projectName') this.newOffer.projectName = value;
            if (id === 'reqs') this.newOffer.skills = value;
        })
        this.$on('receiveDescriptionOffer', function(value) {
            this.newOffer.description = value;
        })
    }
}
</script>

<style lang="stylus" scoped>
.form
    margin-bottom 24px

.control
    .wrap-input
        width 100%

        input 
            opacity 1

    &:last-child
        border none !important 

.additional
    text-align center
    text-transform uppercase
    font-size 14px
    font-family MuseoSansCyrl500
    padding 15px
    background-color #f0f0f0
    margin-top -20px
    margin-bottom 4px
    cursor pointer

.addition
    height 0px
    overflow-y hidden
    padding 0 16px
    transition all 0.3s linear

    &.add-opened
        padding 16px
</style>

<style lang="stylus">
.control
    .datepick
        input
            opacity 1 !important
</style>

