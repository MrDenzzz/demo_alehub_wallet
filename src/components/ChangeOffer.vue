<template>
        <div class="change-offer">
        <Navbar
                title="Edit Offer"
                :isNavigate="true"
                :isBalance="false"
        />

        <section class="main">
            <div class="content nomenu">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="form">
                                <div class="control">
                                    <label>Offer Name</label>
                                    <input type="text" :value="offerName" @input="changeOfferName($event)">
                                </div>
                                <div class="control">
                                    <label>Offer Description</label>
                                    <textarea name="" id="" cols="30" rows="10" :value="description" @input="changeDescription($event)"></textarea>
                                </div>
                                <div class="control">
                                    <div style="display: flex;">
                                        <div style="display: flex; flex-direction: column;">
                                            <label>Start Date</label>
                                            <input type="date" :value="startDate" @input="changeStartDate($event)">
                                        </div>
                                        <div style="display: flex; flex-direction: column;">
                                            <label>Final Date</label>
                                            <input type="date" :value="finalDate" @input="changeFinalDate($event)">
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column;" class="control">
                                    <label>Project Name</label>
                                    <input type="text" :value="projectName" @input="changeProjectName($event)">
                                </div>
                                <div style="display: flex; flex-direction: column;" class="control">
                                    <label>Requirements and Skills</label>
                                    <input type="text" :value="skills" @input="changeSkills($event)">
                                </div>
                                <div style="display: flex; flex-direction: column;" class="control">
                                    <label>Offer Price</label>
                                    <input type="text" :value="price" @input="changePrice($event)">
                                </div>
                            </div>
                            <p>{{ offerName }}</p>
                            <p>{{ description }}</p>
                            <p>{{ projectName }}</p>
                            <p>{{ startDate }} - {{ finalDate }}</p>
                            <p>{{ skills }}</p>
                            <p>{{ price }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from './layouts/Navbar';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
 
export default {
    name: 'ChangeOffer',
    components: {
        Navbar
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'offerName',
            'description',
            'projectName',
            'startDate',
            'finalDate',
            'skills',
            'price'
        ])
    },
    methods: {
        ...mapActions([
            'changeOfferName',
            'changeDescription',
            'changeProjectName',
            'changeStartDate',
            'changeFinalDate',
            'changeSkills',
            'changePrice'
        ])
    }
}
</script>

<style lang="stylus" scoped>
.control
    display flex
    flex-direction column
    align-items flex-start

    input
        z-index unset 
        opacity 1
        display unset 
        position unset
</style>

