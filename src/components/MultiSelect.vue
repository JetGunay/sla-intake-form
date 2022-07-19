<template>
<div class="form-group">
    <!-- <select>
        <option v-for="(option, index) in options" :key="index">{{option.name}}</option>
    </select> -->
</div>
</template>
<script>
export default {
  name: "MultiSelect",
  props: {
    options: Object,
    title: String,
    placeholder: String,
  },
  data() {
    return {
      selected: [],
      show: false
    };
  },
  methods: {
      showDropdown(){
          this.show = !this.show
      }
  }
};
</script>
<style scoped lang="scss">
.multi-select {
    position: relative;
    z-index: 2;
}
.btn-secondary {
    font-size: 10.5px;
}
.form-label {
    font-size: 10.5px;
}
</style>