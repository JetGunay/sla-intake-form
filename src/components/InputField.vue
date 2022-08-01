<template>
    <div class="form-group">
        <!-- <input class="form-control text-sm" type="text" name="project" 
          :placeholder="placeholder"
          :value="value"
          @change="checkValue" 
          required 
        /> -->
        <input class="form-control text-sm" type="text" name="project" 
          :placeholder="placeholder"
          :value="value"
          @input="$emit('update:modelInput', $event.target.value)" 
          required 
        />
    </div> 
</template>
<script>
export default {
  name: "InputField",
  props: {
    title: String,
    label: String,
    placeholder: String,
    value: String,
  },
  methods: {
    // checkValue(e){
    //   this.$emit("customCheck", e.target.value)
    // }
  },
};
</script>
<style scoped>

</style>