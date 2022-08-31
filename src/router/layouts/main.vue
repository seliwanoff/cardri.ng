<script>
import NavBar from "@components/nav-bar";
import SideBar from "@components/side-bar";
import RightBar from "@components/right-bar";
import Footer from "@components/footer";

export default {
  components: { NavBar, SideBar, RightBar, Footer },
  data() {
    return {
      isMenuCondensed: false,
      user: this.$store ? this.$store.state.user : {} || {},
      title: this.$route ? this.$route.meta.title || "" : "",
      username: "",
      image: "",
      usertype: "",
      url: "https://tap.150psi.com/public/storage/images/",
    };
  },
  created: () => {
    document.body.classList.remove("authentication-bg");
  },

  methods: {
    toggleMenu() {
      this.isMenuCondensed = !this.isMenuCondensed;
      document.body.classList.toggle("sidebar-enable");
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
          navigator.userAgent
        )
      )
        document.body.classList.toggle("enlarged");
    },
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
  },
};
</script>

<template>
  <div id="wrapper">
    <NavBar />
    <SideBar
      :is-condensed="isMenuCondensed"
      :user="username"
      :type="usertype"
      :image="image"
      :url="url"
    />
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="content-page">
      <div class="content">
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <Footer />
    </div>
    <RightBar />
  </div>
</template>
