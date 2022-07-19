<template>
    <button>{{text}}</button>
</template>
<script>
export default {
  name: "Button",
  props: {
    text: String
  }
};
</script>
<style lang="scss">
button {
  margin-bottom: 5rem;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
  }
}
.btn {
  padding: 0.5rem 4.5rem !important;
  border-radius: 25px !important;
}
.btn-success {
  background: #40b20a !important;
  margin-left: 5rem;
}
.btn-danger {
  background: #ef6a6a !important;
}
</style>