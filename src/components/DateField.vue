<template>
  <div class="form-group mt-4">
    <Datepicker 
    v-model="datepicker"
    autoApply
    weekStart="0"
    class="dp__theme_light"
    :format="format" 
    :disabledWeekDays="[6,0]"
    :readonly="false"
    :enableTimePicker="false"
    :minDate="calcDate"
    :maxDate="comDate"
    @update:modelValue="checkDate" />
  </div>
</template>
<script>
import Datepicker from '@vuepic/vue-datepicker';
import moment from "moment";
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
export default {
  name: "DateField",
  components: {
    Datepicker
  },
  data(){
    return {
      date: this.calcDate,
    }
  },
  props: {
    calcDate: Date,
  },
  setup(props){
    const datepicker = ref(new Date(props.calcDate));
    // const datepicker = ref(null);
    const format = (datepicker) => {
      const date = moment(datepicker).format("ddd, MMMM Do YYYY");
      return date;
    };
    return {
      format,
      datepicker
    }
  },
  computed: {
    datepick() {
      console.log("date " + this.date)
      return new Date(this.calcDate);
    },
    comDate() {
      return new Date(this.datepick.setDate(this.datepick.getDate() + 14));
    },
  },
  watch: {},
  methods: {
    checkDate(datepicker){
      this.$emit('checkDate', datepicker)
    },
    getDate() {
      return this.calcDate
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