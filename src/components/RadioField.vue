<template>
    <div class="form-check-inline">
        <input class="form-check-input" type="radio" 
        :checked="checked" 
        :id="fieldId" 
        :name="name"
        :value="value"
        @change="checkRadio">
        <label class="form-check-label mx-2" :for="fieldId">{{label}}</label> 
    </div>
</template>
<script>
export default {
    name: 'RadioField',
    props: {
        label: String,
        fieldId: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            default: false
        },
        name: null,
        value: String
    },
    methods: {
        checkRadio(e){
            this.$emit('radioCheck', e.target.value)
        }
    }
}
</script>
<style lang="scss">
    .form-check-label {
        font-size: 12px;
    }
</style>