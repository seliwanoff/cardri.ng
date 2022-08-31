<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import Balance from "../../../components/balance.vue";
import axios from "axios";
import Message from "@/src/components/message.vue";
import moment from "moment";
export default {
  page: {
    title: "Transfer",
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
      commission: "",
      usertype: "",
      network: "0",
      phone: "",
      discount: 0,
      amount: 0,
      isDisabled: true,
      btnText: "Submit",
      mtnapi: "",
      getplan: [],
      tfee: "",
      plan: "",
      message: "",
      status: null,
      transaction: [],
      moment: moment,
      name: "",
      id: "",
      networkname: "",
    };
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
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;

    try {
      const mtndata = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getmanagement`);
      this.mtnapi = mtndata.data.data.mtnapi;
    } catch (e) {
      console.log(e);
    }
    try {
      const transaction = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/gettransaction?type=4`
      );

      this.transaction = transaction.data.data;
    } catch (e) {}
  },

  methods: {
    HandleSubmit() {
      if (this.balance >= this.amount) {
        this.btnText = "Loading";
        this.isdisabled = true;
        const current = new Date();

        const data = {
          network: this.id,
          amount: this.amount,
          reciever: "234" + this.phone.slice(1),
          type: 4,
          tfee: 0,
          plan: this.name,
          name: this.username,
          planid: "",
          status: 1,
          ref: moment(current).format("YYYYMMDDHHm"),
          commission: 0,
          networkname: "Transfer",
        };

        localStorage.setItem("sub", JSON.stringify(data));
        this.status = true;
        this.message = "Transaction Generated";
        this.interval = setTimeout(() => {
          this.$router.push("../payment/payment");
        }, 3000);
      } else {
        this.status = false;
        this.message = "Not Enougn balance,Kindly deposit";
        this.interval = setTimeout(() => {
          this.status = null;
        }, 3000);
      }
    },
    getAmontForCommission(amt) {
      this.discount = Math.floor(this.commission * amt);
    },
    async getUser() {
      try {
        const resp = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/getuser?phone=${
            "234" + this.phone.slice(1)
          }`
        );
        this.name = resp.data.data.fname + " " + resp.data.data.lname;
        this.id = resp.data.data.id;
        console.log(this.id);
        if (this.name !== null) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      } catch (e) {
        this.name = "Failed to fetch name";
        this.isDisabled = true;
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
          <div class="d-lg-flex justify-content-between">
            <b-card class="border border-pink w-100">
              <form @submit.prevent="HandleSubmit">
                <Message :status="status" :message="message" />

                <div class="form-group">
                  <label for="exampleInputEmail1">Phone Number</label>
                  <input
                    v-model="phone"
                    type="number"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Recipient"
                    required
                    @keydown="getUser"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Account Name</label>
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="0.0"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Amount</label>
                  <input
                    v-model="amount"
                    type="number"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Recipient"
                    required
                  />
                </div>

                <button
                  :disabled="isDisabled"
                  :class="isDisabled ? 'disableClass' : 'btn-primary'"
                  type="submit"
                  class="btn"
                >
                  {{ btnText }}
                </button>
              </form>
            </b-card>
            <b-card class="w-100 glvl">
              <h4 class="text-muted" style="margin-top: -10px; margin-left: 10px">
                Recent Transaction
              </h4>
              <b-card v-if="transaction.length > 0" class="w-100" style="overflow: auto">
                <div
                  v-for="item in transaction"
                  :key="item.id"
                  style="height: 50px; border-bottom: 1px solid #ccc"
                >
                  <div
                    class="float-left"
                    style="
                      height: 40px;
                      width: 40px;
                      border-radius: 100%;

                      place-items: center;
                      display: flex;
                      align-items: center;
                      margin-top: 5px;
                    "
                  >
                    <img
                      v-if="item.network === '1'"
                      src="../../../assets/images/mtn.png"
                      alt=""
                      width="100%"
                      height="100%"
                      style="border-radius: 100%; overflow: hidden"
                    />
                    <img
                      v-if="item.network === '2'"
                      src="../../../assets/images/airtel.png"
                      alt=""
                      width="100%"
                      height="100%"
                      style="border-radius: 100%; overflow: hidden"
                    />
                    <img
                      v-if="item.network === '3'"
                      src="../../../assets/images/9moble.png"
                      alt=""
                      width="100%"
                      height="100%"
                      style="border-radius: 100%; overflow: hidden"
                    />
                    <img
                      v-if="item.network === '4'"
                      src="../../../assets/images/glo.png"
                      alt=""
                      width="100%"
                      height="100%"
                      style="border-radius: 100%; overflow: hidden"
                    />
                  </div>
                  <div
                    class="float-right"
                    style="width: calc(100% - 100px); margin-right: 20px"
                  >
                    <div class="d-flex justify-content-between">
                      <span>{{ item.name }}</span>
                      <span>{{ item.plan }}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span style="font-size: 0.6rem">{{
                        moment(item.updated_at).format("DD-MM-YYYY hh:mm")
                      }}</span>
                      <span v-if="item.status === '1'" style="font-size: 0.6rem"
                        >sent</span
                      >
                      <span v-if="item.status === '0'" style="font-size: 0.6rem"
                        >failed</span
                      >
                    </div>
                  </div>
                </div>
              </b-card>
              <div v-else style="text-align: center; margin-top: 20px">
                No transfer yet
              </div>
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
.disableClass {
  background: #ccc !important;
  border: 1px solid #ccc;
}
.activeClass {
  background: #0a1aa8 !important;
  border: 1px solid #0a1aa8;
}
</style>
