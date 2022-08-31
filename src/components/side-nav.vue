<script>
import { authComputed } from "@state/helpers";

import MetisMenu from "metismenujs/dist/metismenujs";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {
      username: "",
      image: "",
      usertype: "",
      url: "https://tap.150psi.com/public/storage/images/",
    };
  },

  computed: {
    ...authComputed,
    ...mapGetters(["user"]),
  },
  mounted: function () {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu("#side-menu");
  },
  methods: {
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

<template>
  <div>
    <div class="user-box text-center">
      <img
        v-if="user.data.image === null"
        src="@assets/images/users/user-1.jpg"
        alt="user-img"
        class="rounded-circle img-thumbnail avatar-lg"
      />
      <img
        v-if="user.data.image !== null"
        :src="url + user.data.image"
        alt="user-img"
        class="rounded-circle img-thumbnail avatar-lg"
      />
      <div class="">
        <a href="#" class="text-dark dropdown-toggle h5 mt-2 mb-1 d-block">{{
          user.data.username
        }}</a>
      </div>
      <p v-if="user.data.type === 1" class="text-muted">Normal</p>
      <p v-if="user.data.type === 2" class="text-muted">Merchant</p>
    </div>

    <!--- Sidemenu -->
    <div id="sidebar-menu">
      <ul id="side-menu" class="metismenu">
        <li class="menu-title">Menu</li>

        <li class="active">
          <router-link tag="a" to="/dashboard" class="active">
            <i class="mdi mdi-view-dashboard"></i>
            <span> Dashboard </span>
          </router-link>
        </li>

        <li>
          <a href="javascript: void(0);" class="waves-effect">
            <i class="mdi mdi-share-variant"></i>
            <span> Services </span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="nav-second-level nav" aria-expanded="false">
            <li>
              <router-link to="../service/airtime"> Buy Airtime</router-link>
            </li>
            <li>
              <router-link to="../service/data">Buy Data</router-link>
            </li>
            <li>
              <router-link to="../service/transfer">Transfer</router-link>
            </li>
            <li>
              <router-link to="../service/bill">Bill</router-link>
            </li>
            <li>
              <router-link to="../service/cable">Cable & Tv</router-link>
            </li>
            <li>
              <router-link to="../service/investment">Investment</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" class="waves-effect">
            <i class="mdi mdi-account-settings"></i>
            <span> Account </span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="nav-second-level nav" aria-expanded="false">
            <li>
              <router-link to="../account/password">Password Settings</router-link>
            </li>
            <li>
              <router-link to="../account/account">Account settings</router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" class="waves-effect">
            <i class="mdi mdi-account-settings"></i>
            <span> API </span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="nav-second-level nav" aria-expanded="false">
            <li>
              <router-link to="../api/token">API Token</router-link>
            </li>
            <li>
              <a href="apidocumenttation">Documentation</a>
            </li>
          </ul>
        </li>

        <li class="active" @click="signOut">
          <a href="javascript: void(0);">
            <i class="mdi mdi-logout"></i>
            <span> Sign Out </span>
          </a>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <!-- End Sidebar -->
  </div>
</template>

<style lang="scss">
@import "~metismenujs/scss/metismenujs";
</style>
