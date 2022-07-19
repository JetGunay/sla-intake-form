<template>
  <div class="form-group mt-4">
    <Datepicker v-model="datepicker" 
    :format="format" 
    class="dp__theme_light"
    :disabledWeekDays="[6,0]"
    weekStart="0"
    @update:modelValue="checkDate"></Datepicker>
  </div>
</template>
<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
export default {
  name: "DateField",
  components: {
    Datepicker
  },
  data(){
    return {
      date: new Date()
    }
  },
  setup(){
    const datepicker = ref(new Date());
    // const datepicker = ref(null);
    const format = (date) => {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() +1).padStart(2, "0");
      const yy = date.getFullYear();

      return `${yy}-${mm}-${dd}`
    }
    return {
      format,
      datepicker
    }
  },
  methods: {
    checkDate(datepicker){
      this.$emit('checkDate', datepicker)
    }
  }
}
</script>
<style scoped lang="scss">
  .dp__theme_light {
    --dp-background-color: #f2f2f2;
    --dp-text-color: #212121;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #1976d2;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: #ddd;
    --dp-menu-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #959595;
    --dp-danger-color: #ff6f60;
  }

  .dp__input {
    opacity: 0.75;
    border-radius: 10px;
  }
</style>