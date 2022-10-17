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
    title: "Account Profile",
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
      url: "https://api.cardri.ng/public/storage/images/",
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
      fname: "",
      lname: "",
      email: "",
      username: "",
      imageUrl: null,
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
      this.fname = user.data.data.fname;
      this.lname = user.data.data.lname;
      this.email = user.data.data.email;
      this.phone = user.data.data.phone;
    } catch (e) {
      console.log(e);
    }

    try {
      const transaction = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/gettransaction?type=8`
      );

      this.transaction = transaction.data.data;
    } catch (e) {}

    this.isLoading = false;
  },

  methods: {
    onSelectedFile(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        alert("no");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      console.log(this.image);
    },
    async HandleSubmit() {
      // const ext = filename.slice(filename.lastIndexOf('.'))
      this.isDisabled = true;
      this.btnText = "Loading";
      if (this.image) {
        const formdata = new FormData();
        formdata.append("image", this.image, this.image.name);
        formdata.append("fname", this.fname);
        formdata.append("lname", this.lname);

        try {
          const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/updateuser`,
            formdata
          );

          this.status = true;
          this.message = response.data.message;
          this.isDisabled = false;
          this.btnText = "Update";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } catch (e) {
          if (e.response.status === 400 || e.response.status === 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Update";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
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
        const data = {
          fname: this.fname,
          lname: this.lname,
        };

        try {
          const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/updateuser`,
            data
          );
          this.status = true;
          this.message = response.data.message;
          this.isDisabled = false;
          this.btnText = "Update";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } catch (e) {
          if (e.response.status === 400 || e.response.status === 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Update";
            this.isDisabled = false;
            this.interval = setTimeout(() => {
              this.status = null;
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
                enctype="multipart/form-data"
                style="place-items: center; align-items: center"
                @submit.prevent="HandleSubmit"
              >
                <div
                  style="
                    margin: 0px auto;
                    width: 75px;
                    height: 75px;
                    border: 1px solid #ccc;
                    border-radius: 100%;
                    position: relative;
                  "
                >
                  <img
                    v-if="imageUrl !== null"
                    :src="imageUrl"
                    alt=""
                    style="
                      overflow: hidden;
                      width: 100%;
                      height: 100%;
                      border-radius: 100%;
                    "
                  />
                  <img
                    v-else-if="image !== null"
                    :src="url + image"
                    alt=""
                    style="
                      overflow: hidden;
                      width: 100%;
                      height: 100%;
                      border-radius: 100%;
                    "
                  />
                  <img
                    v-else-if="image === null"
                    src="@assets/images/users/user-1.jpg"
                    alt=""
                    style="
                      overflow: hidden;
                      width: 100%;
                      height: 100%;
                      border-radius: 100%;
                    "
                  />
                  <span
                    class="mdi mdi-pencil"
                    style="
                      position: absolute;
                      bottom: 0px;
                      right: 0px;
                      width: 20px;
                      height: 20px;
                      border-radius: 100%;
                      color: #fff;
                      background: blue;
                    "
                    @click="$refs.fileInput.click(e)"
                  ></span>
                  <input
                    ref="fileInput"
                    type="file"
                    name=""
                    style="display: none"
                    @change="onSelectedFile"
                  />
                </div>
                <Message :status="status" :message="message" />
                <div class="form-group">
                  <label for="exampleInputEmail1">Firtname</label>
                  <input
                    id="exampleInputEmail1"
                    v-model="fname"
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Lastname</label>
                  <input
                    id="exampleInputPassword1"
                    v-model="lname"
                    type="text"
                    class="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Username</label>
                  <input
                    id="exampleInputPassword1"
                    v-model="username"
                    type="email"
                    class="form-control"
                    readonly
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Email</label>
                  <input
                    id="exampleInputPassword1"
                    v-model="email"
                    type="email"
                    class="form-control"
                    readonly
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Phone Number</label>
                  <input
                    id="exampleInputPassword1"
                    v-model="phone"
                    type="number"
                    class="form-control"
                    readonly
                  />
                </div>

                <button :disabled="isDisabled" type="submit" class="btn btn-primary">
                  Update Profile
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
