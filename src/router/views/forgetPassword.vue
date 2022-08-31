<script>
import Layout from "@layouts/auth";
import { authMethods } from "@state/helpers";
import appConfig from "@src/app.config";
import axios from "axios";
import Message from "@/src/components/message.vue";
export default {
  page: {
    title: "Forget Password",
    meta: [{ name: "description", content: `Forget Password to ${appConfig.title}` }],
  },
  components: { Layout, Message },
  data() {
    return {
      email: "",
      error: null,
      tryingToReset: false,
      isResetError: false,
      isSuccess: false,
      successMessage: null,
      status: null,
      message: "",
      id: "",
      btnText: "Reset Password",
      isDisabled: false,
    };
  },
  computed: {},
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.

    async tryToReset() {
      this.btnText = "Loading";
      this.isDisabled = true;
      const data = {
        id: this.id,
      };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/sendresetcode`,
          data
        );
        localStorage.setItem("pass", JSON.stringify(response.data.message));
        this.status = true;
        this.message = "Reset code has been sent to your Email or Registerd Number";
        this.interval = setTimeout(() => {
          this.status = null;

          this.$router.push("/verify");
        }, 3000);
      } catch (e) {
        console.log(e);
        if (e.response.status === 400 || e.response.status === 422) {
          this.isDisabled = false;
          this.status = false;
          this.message = e.response.data.message;
          this.btnText = "Reset passwor";

          this.isDisabled = true;
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } else {
          this.status = false;
          this.message = "Connection problem, try checking your network";
          this.btnText = "Reset passwor";

          this.isDisabled = true;
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="text-center">
          <a href="/">
            <span><img src="@assets/images/logo.png" alt="" height="22" /></span>
          </a>
        </div>

        <div class="card" style="margin-top: 20px">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <h4 class="text-uppercase mt-0 mb-3">Reset Password</h4>
              <p class="text-muted mb-0 font-13">
                Enter your email address and we'll send you an email with code to reset
                your password.
              </p>
            </div>

            <Message :status="status" :message="message" />

            <b-form @submit.prevent="tryToReset">
              <b-form-group id="email-group" label="Email or Username" label-for="email">
                <b-form-input
                  id="id"
                  v-model="id"
                  type="text"
                  required
                  placeholder="Enter email or username"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="button-group" class="mt-4">
                <b-button
                  :disabled="isDisabled"
                  type="submit"
                  variant="primary"
                  class="btn-block"
                >
                  {{ btnText }}
                </b-button>
              </b-form-group>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="row mt-3">
          <div class="col-12 text-center">
            <p class="text-muted">
              Already have account?
              <router-link tag="a" to="/login" class="text-dark ml-1"
                ><b>Log In</b></router-link
              >
            </p>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
