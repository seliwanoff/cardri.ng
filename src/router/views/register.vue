<script>
import Layout from "@layouts/auth";
import { authMethods } from "@state/helpers";
import appConfig from "@src/app.config";
import axios from "axios";
import Message from "@/src/components/message.vue";
export default {
  name: "RegisterApp",
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
    };
  },
  computed: {},
  methods: {
    ...authMethods,
    // Try to register the user in with the email, fullname
    // and password they provided.
    async tryToRegisterIn() {
      this.tryingToRegister = true;
      // Reset the regError if it existed.
      if (this.password.length >= 6) {
        if (this.phone.toString().length === 11) {
          const data = {
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            username: this.username,
            phone: "234" + this.phone.slice(1),
            password: this.password,
            rusername: "",
            m: "web",
          };

          this.btnText = "Loading...";
          try {
            const response = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/auth/register`,
              data
            );

            localStorage.setItem("data", JSON.stringify(data));
            const datas = {
              phone: "234" + this.phone.slice(1),
            };

            await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/auth/verifyphone`,
              datas
            );
            this.status = true;
            this.message =
              response.data.message +
              ". A code has been sent to your number for verification.";
            this.interval = setTimeout(() => {
              this.status = null;
              this.$router.push("/verifyphone");
            }, 3000);
          } catch (e) {
            if (e.response.status === 400 || e.response.status === 422) {
              this.checkButton = false;
              this.status = false;
              this.message = "Email or Username has been choosen";
              this.btnText = "Create your account";
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            } else {
              this.checkButton = false;
              this.status = false;
              this.message = "Connection problem, try checking your network";
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            }
          }
        } else {
          this.status = false;
          this.message = "Invalid Number";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      } else {
        this.status = false;
        this.message = "Password should be atleast 6 longer ";
        this.interval = setTimeout(() => {
          this.status = null;
        }, 3000);
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
              <img src="@assets/images/logo.png" alt="" height="33" />
            </span>
          </a>
          <p class="text-muted mt-2 mb-4"></p>
        </div>
        <Message :status="status" :message="message" />
        <div class="card">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <h4 class="text-uppercase mt-0">Register</h4>
            </div>

            <b-form @submit.prevent="tryToRegisterIn">
              <b-form-group id="fullname-group" label="Firstname" label-for="firstname">
                <b-form-input
                  id="firstname"
                  v-model="fname"
                  type="text"
                  required
                  placeholder="Enter your Firstname"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="fullname-group" label="Lastname" label-for="Lastname">
                <b-form-input
                  id="lastname"
                  v-model="lname"
                  type="text"
                  required
                  placeholder="Enter your Lastname"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="email-group" label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="email-group" label="Username" label-for="username">
                <b-form-input
                  id="username"
                  v-model="username"
                  type="text"
                  required
                  placeholder="Enter Username"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="email-group" label="Phone" label-for="phone">
                <b-form-input
                  id="phone"
                  v-model="phone"
                  type="number"
                  required
                  placeholder="Enter Phone Number"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="password-group" label="Password" label-for="password">
                <b-form-input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="button-group" class="mt-4">
                <b-button type="submit" variant="primary" class="btn-block"
                  >Sign Up</b-button
                >
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
