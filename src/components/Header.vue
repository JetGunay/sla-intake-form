<template>
    <div class="header">
       <h6 class="fw-bold mt-4"><span class="text-danger">*</span>{{title}}
        <span class="icon rounded-circle px-1 bs-tooltip-top"
       role="tooltip" 
       data-bs-toggle="tooltip"
       :title="tooltip"
       id="tooltip"><fa icon="question"/></span>
      </h6>
    </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    title: String,
    tooltip: String
  }
};
</script>
<style scoped lang="scss">
h6 {
  font-size: 12px;
}
.icon {
  background: #373d3f;
  color: #f2f2f2;
  font-size: 8px;
  padding-bottom: 1px;
  padding-top: 1px;

  &:hover {
    cursor: pointer;
  }
}
</style>