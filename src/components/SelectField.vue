<template>
  <select class="form-select form-select-sm" @change="checkValue">
    <option selected disabled>{{label}}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.id">{{option.name}}</option>
  </select>
</template>
<script>
export default {
  name: "SelectField",
  props: {
      options: Object,
      placeholder: String,
      label: String,
      required: Boolean,
      value: String
  },
  methods: {
    checkValue(e){
      this.$emit("customCheck", e.target.value)
    }
  }
};
</script>
<style scoped lang="scss">
 
</style>