<template>
    <div>
        <task-header :title="label"/>
        <multi-select :assets="option"/>
        <text-field-modal 
            :name="name" 
            v-model:Copy="Copy" 
            v-model:Design="Design" 
            v-model:Motion="Motion" 
            v-model:Developer="Developer" 
            label="Any additional instructions / Restrictions"
        />
        {{ inputCopy }}
    </div>
</template>
<script>

import TextFieldModal from '../components/TextFieldModal.vue'
import TaskHeader from '../components/TaskHeader.vue'
import MultiSelect from '../components/MultiSelect.vue'
import { ref } from "vue";
export default {
    name: "ModalContent",
    components: {
        TextFieldModal,
        TaskHeader,
        MultiSelect,
        
    },
    props: {
        label: String,
        name: String,
        option: Object,
    },
    setup() {
    const Copy = ref("");
    const Design = ref("");
    const Motion = ref("");
    const Developer = ref("");

    return {
      Copy,
      Design,
      Motion,
      Developer,
    };
  },
  created() {},
  computed: {
    inputCopy() {
    console.log(this.Copy);
      return this.Copy;
    },
  }
}
</script>
<style lang="scss">
    
</style>