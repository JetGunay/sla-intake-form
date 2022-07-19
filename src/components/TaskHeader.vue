<template>
    <div class="task-header">
        <p class="h6 fw-bold mt-4">{{title}}</p>
    </div>
</template>
<script>
export default {
    name: "TaskHeader",
    props: {
        title: String
    }
}
</script>
<style lang="scss">
    .h6 {
        font-size: 14px;
    }
</style>