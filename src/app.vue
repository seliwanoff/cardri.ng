<template>
  <div id="app">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <RouterView />
  </div>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Design variables and utilities from src/design.
@import "@design";
.btn,
.cll,
.deposit {
  background-color: #4705af !important;
  border: 1px solid #4705af !important;
}
</style>

<script>
import store from "../src/store/modules/user";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: function () {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      logoutTimer: null,
    };
  },
  beforeCreate() {
    if (store.state["user"] === null) {
      this.$router.push("/login");
    } else {
      this.$router.push("/dashboard");
    }
  },
  async mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
    try {
      await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`);
    } catch (e) {
      if (e.response.staus === 401) {
        store.state["user"] = null;
        store.state["token"] = null;
        this.$route.push("/login");
      }
    }
  },
  methods: {
    setTimers: function () {
      this.logoutTimer = setTimeout(this.logoutUser, 1200000);
    },

    resetTimer: function () {
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
    ...mapActions({
      signOutAction: "signOut",
    }),
    signOut() {
      this.signOutAction();
      this.$router.push("/login");
    },
  },
};
</script>
