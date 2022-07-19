<template>
    <div class="container w-75">
        <task-header :title="label"/>
        <multi-select :assets="option"/>
        <text-field label="Any additional instructions / Restrictions"/>
    </div>
</template>
<script>

import TextField from '../components/TextField.vue'
import TaskHeader from '../components/TaskHeader.vue'
import MultiSelect from '../components/MultiSelect.vue'
export default {
    name: "ModalContent",
    components: {
        TextField,
        TaskHeader,
        MultiSelect,
        
    },
    props: {
        label: String,
        option: Object
    },
}
</script>
<style lang="scss">
    
</style>