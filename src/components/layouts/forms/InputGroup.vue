<template>
  <div class="input-body">
    <div class="input-group">
      <button
        class="input-group-btn big-btn black-btn"
        v-if="isBtn"
      >{{ btnValue }}</button>

      <button
        class="input-group-btn big-btn black-btn btn-dropdown"
        v-if="isDropDown"
        :class="{ 'btn-dropdown-alone': isInput != true }"
        @click="openDropDown"
      >
        {{ dropDownValue }}
        <span class="caret"></span>
      </button>

      <ul class="dropdown-menu" v-if="isDropDown" v-show="isOpenDropDown">
        <li>
          <a href="#" class="active">{{ dropDownValue }}</a>
        </li>
      </ul>

      <input type="text" class="form-control" :value="value" v-if="isInput">
      <span class="input-group-addon" v-if="isInput">{{ addonValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inputGroup',
  props: {
    btnValue: String,
    addonValue: String,
    isBtn: Boolean,
    isInput: Boolean,
    inputValue: String,
    isDropDown: Boolean,
    dropDownValue: String
  },
  data() {
    return {
      value: this.inputValue,
      isOpenDropDown: false
    }
  },
  methods: {
    openDropDown() {
      this.isOpenDropDown = !this.isOpenDropDown
    }
  }
}
</script>

<style scoped>
  /* .dropdown-menu {
    display: block;
  } */
</style>
