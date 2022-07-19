<template>
    <div class="form-group">
        <input class="form-control text-sm" type="text" name="project" 
        :placeholder="placeholder"
         @change="checkValue" 
         required 
         >
    </div> 
</template>
<script>
export default {
  name: "InputField",
  props: {
    title: String,
    label: String,
    placeholder: String,
  },
  methods: {
    checkValue(e){
      this.$emit("customCheck", e.target.value)
    }
  },
};
</script>
<style scoped>

</style>