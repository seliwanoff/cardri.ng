<script>
import Layout from "@layouts/auth";
import { authMethods } from "@state/helpers";
import appConfig from "@src/app.config";
import axios from "axios";
import Message from "@/src/components/message.vue";
export default {
  name: "VerifyPhone",
  page: {
    title: "Reset Password",
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
      btnText: "Reset",
      code: "",
      cpassword: "",
      isDisabled: false,
    };
  },
  computed: {},
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    confirmPaswword() {
      if (this.password === this.cpassword) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
        this.status = false;
        this.message = "Password doesnt match";
        this.interval = setTimeout(() => {
          this.status = null;
        }, 3000);
      }
    },
    async handleSubmit() {
      this.btnText = "Loading";
      this.isDisabled = true;
      const getdata = JSON.parse(localStorage.getItem("pass"));

      const data = {
        code: this.code,
        password: this.password,
        phone: getdata.phone,
      };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/resetpasswordwithcode`,
          data
        );
        this.status = true;
        this.message = response.data.message;
        this.interval = setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      } catch (e) {
        console.log(e.response);
        if (
          e.response.status === 400 ||
          e.response.status === 422 ||
          e.response !== undefined
        ) {
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
              <h4 class="text-uppercase mt-0">Reset password</h4>
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input
                  v-model="cpassword"
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  required
                  @blur="confirmPaswword"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1"
                  >Code <small>(code sent to number or email)</small></label
                >
                <input
                  v-model="code"
                  type="password"
                  class="form-control"
                  placeholder="Enter code sent"
                  required
                />
              </div>

              <button :disabled="isDisabled" type="submit" class="btn btn-primary">
                {{ btnText }}
              </button>
            </form>
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
