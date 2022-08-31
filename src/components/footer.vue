<script>
import { authComputed } from "@state/helpers";

export default {
  components: {},
  computed: {
    ...authComputed,
  },
  methods: {},
};
</script>

<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">2022 &copy;Cardri <a href="">Nigeria</a></div>
        <div class="col-md-6">
          <div class="text-md-right footer-links d-none d-sm-block">
            <a href="javascript:void(0);">About Us</a>
            <a href="javascript:void(0);">Help</a>
            <a href="javascript:void(0);">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss"></style>
