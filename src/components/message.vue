<template>
  <div class="mcl">
    <div v-if="status === true" class="alert alert-success" role="alert">
      {{ message }}
    </div>
    <div v-if="status === false" class="alert alert-danger" role="alert">
      {{ message }}
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageApp",
  props: {
    status: {
      type: Boolean,
      required: false,
    },
    message: {
      type: String,
      required: false,
      default: () => "",
    },
  },
};
</script>
<style>
.mcl {
  width: 100%;
}
</style>
