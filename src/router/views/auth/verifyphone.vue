<script>
import Layout from "@layouts/auth";
import { authMethods } from "@state/helpers";
import appConfig from "@src/app.config";
import axios from "axios";
import Message from "@/src/components/message.vue";
export default {
  name: "VerifyPhone",
  page: {
    title: "Register",
    meta: [{ name: "description", content: `Register to ${appConfig.title}` }],
  },
  components: { Layout, Message },
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: "",
      username: "",
      status: null,
      message: "",
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      btnText: "Verify",
      code: "",
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
    };
  },
  computed: {},
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    async handleSubmit() {
      this.btnText = "Loading";
      this.isDisabled = true;
      const getdata = JSON.parse(localStorage.getItem("data"));

      const data = {
        code: this.pin1 + this.pin2 + this.pin3 + this.pin4,
        phone: getdata.phone,
      };

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/auth/confirm_phone`,
          data
        );
        console.log(response);
        this.status = true;
        this.message = response.data.message;
        this.interval = setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      } catch (e) {
        if (e.response.status === 400 || e.response.status === 422) {
          this.isDisabled = false;
          this.status = false;
          this.message = e.response.data.message;
          this.btnText = "Verify";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } else {
          this.status = false;
          this.message = "Connection problem, try checking your network";
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
            <span>
              <!--<img
                src="@assets/images/logo-dark.png"
                alt=""
                height="22"
              >
              -->
              <h3>CARDRI</h3>
            </span>
          </a>
        </div>
        <Message :status="status" :message="message" />
        <div class="card">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <h4 class="text-uppercase mt-0">Verify Phone Number</h4>
            </div>

            <b-alert v-model="isRegisterError" variant="danger" dismissible>
              {{ regError }}
            </b-alert>

            <b-form @submit.prevent="handleSubmit">
              <b-form-group id="fullname-group" class="d-flex justify-content-center">
                <b-form-input
                  v-model="pin1"
                  type="tel"
                  maxlength="1"
                  required
                  style="width: 40px; height: 40px; float: left; margin-right: 5px"
                ></b-form-input>
                <b-form-input
                  v-model="pin2"
                  type="tel"
                  required
                  style="width: 40px; height: 40px; float: left; margin-right: 5px"
                  maxlength="1"
                ></b-form-input>
                <b-form-input
                  v-model="pin3"
                  type="tel"
                  required
                  style="width: 40px; height: 40px; float: left; margin-right: 5px"
                  maxlength="1"
                ></b-form-input>
                <b-form-input
                  v-model="pin4"
                  type="tel"
                  required
                  style="width: 40px; height: 40px; float: left"
                  maxlength="1"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="button-group" class="mt-4">
                <b-button type="submit" variant="primary" class="btn-block">{{
                  btnText
                }}</b-button>
              </b-form-group>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
