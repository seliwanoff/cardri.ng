<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import Balance from "../../../components/balance.vue";
import axios from "axios";
import Message from "@/src/components/message.vue";
import moment from "moment";
import { mapGetters } from "vuex";
// import user from "@/src/store/user";

export default {
  page: {
    title: "Password Settings",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, Balance, Message },
  data() {
    return {
      token: "",
      balance: "",
      accessToken: "",
      letdrops: "",
      hidemes: true,
      image: null,
      url: "https://tap.150psi.com/public/storage/images/",
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
      fn: "",
      commission: 0,
      usertype: "",
      network: "0",
      phone: "",
      discount: 0,
      amount: 0,
      isdisabled: false,
      btnText: "Submit",
      status: null,
      message: "",
      tfee: "",
      networkid: "1",
      transaction: [],
      moment: moment,
      checked: true,
      disablechecked: false,
      key: "",
      webhook: "",
      dpassword: "",
      npassword: "",
      cnpassword: "",
      isDisabled: false,
      btnPass: "Update Password",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    try {
      const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`);
      this.usertype = user.data.data.type;
      this.balance = user.data.data.balance;
      this.username = user.data.data.username;
      this.fn = user.data.data.username.charAt(0);
      this.image = user.data.data.image;
      this.balance = user.data.data.balance;
      this.commission = user.data.data.commission;
      this.apitoken = user.data.data.token;
      this.key = user.data.data.tstatus;

      if (this.key === "1") {
        this.disablechecked = true;
      } else {
        this.disablechecked = false;
      }
    } catch (e) {
      console.log(e);
    }

    this.isLoading = false;
  },

  methods: {
    async HandleSubmit() {
      this.isDisabled = true;
      this.btnPass = "Loading";
      if (this.npassword.length >= 6) {
        if (this.npassword === this.cnpassword) {
          const data = {
            password: this.dpassword,
            newpassword: this.npassword,
          };
          try {
            const response = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/updatepassword`,
              data
            );

            this.status = true;
            this.message = response.data.message;
            this.npassword = "";
            this.dpassword = "";
            this.cnpassword = "";

            this.interval = setTimeout(() => {
              this.status = null;
              this.btnPass = "Update Password";
              this.isDisabled = false;
            }, 3000);
          } catch (e) {
            if (e.response.status === 400 || e.response.status === 422) {
              this.isDisabled = false;
              this.status = false;
              this.message = e.response.data.message;
              this.btnPass = "Update Password";

              this.interval = setTimeout(() => {
                this.status = null;
                this.isDisabled = false;
              }, 3000);
            } else {
              this.status = false;
              this.message = "Connection problem, try checking your network";
              this.isDisabled = false;
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            }
          }
        } else {
          this.status = false;
          this.message = "Password does not match ";
          this.setTimeout = setTimeout(() => {
            this.status = null;
            this.isDisabled = false;
            this.btnPass = "Update Password";
          }, 3000);
        }
      } else {
        this.status = false;
        this.message = "Password must be atleast six ";
        this.setTimeout = setTimeout(() => {
          this.status = null;
          this.isDisabled = false;
          this.btnPass = "Update Password";
        }, 3000);
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-md-12">
        <Balance :balance="balance" />

        <b-card>
          <div class="d-lg-flex justify-content-center">
            <b-card class="border border-pink w-100">
              <form
                style="place-items: center; align-items: center"
                @submit.prevent="HandleSubmit"
              >
                <Message :status="status" :message="message" />
                <div class="form-group">
                  <label for="exampleInputEmail1">Password</label>
                  <input
                    id="exampleInputEmail1"
                    v-model="dpassword"
                    type="password"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter your current password"
                    required
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Enter New Password</label>
                  <input
                    id="exampleInputPassword1"
                    v-model="npassword"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    autocomplete="off"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Confirm New Password</label>
                  <input
                    id="exampleInputPassword1"
                    v-model="cnpassword"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    autocomplete="off"
                  />
                </div>

                <button :disabled="isDisabled" type="submit" class="btn btn-primary">
                  {{ btnPass }}
                </button>
              </form>
            </b-card>
          </div>
        </b-card>
      </div>
    </div>
  </Layout>
</template>
<style>
.glvl .card-body {
  padding: 10px !important;
}
.glvl {
  height: 500px;
  overflow: auto;
}
.glvl::-webkit-scrollbar {
  background: #555;
  width: 2px;
}
.glvl::-webkit-scrollbar {
  width: 4px;
}

/* Track */
.glvl::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.glvl::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

/* Handle on hover */
.glvl::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>
