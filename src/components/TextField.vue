<template>
    <div class="form-group mt-2">
        <label class="form-label fw-bold">{{label}}</label>
        <QuillEditor :ref="this.value" @editorChange="$emit('update:textChange', this.$refs[this.value].getHTML())" />
        <!-- <textarea class="form-control"></textarea> -->
    </div>
</template>
<script>
export default {
    name: 'TextField',
    props: {
        label: String,
        value: String,
    }
}
</script>
<style scoped lang="scss">
    .form-label {
        font-size: 12px;
    }
</style>