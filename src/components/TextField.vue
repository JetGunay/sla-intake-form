<template>
    <div class="form-group mt-2">
        <label class="form-label fw-bold">{{label}}</label>
        <textarea class="form-control"></textarea>
    </div>
</template>
<script>
export default {
    name: 'TextField',
    props: {
        label: String
    }
}
</script>
<style scoped lang="scss">
    .form-label {
        font-size: 12px;
    }
</style>