<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import Balance from "../../../components/balance.vue";
import axios from "axios";
import Message from "@/src/components/message.vue";
import moment from "moment";
export default {
  page: {
    title: "Airtime",
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
      service: [],
      mname: "",
      address: "",
      isDisabledText: true,
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

      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getmanagement`
      );
      if (this.usertype === 1) {
        this.redam = parseInt(this.amount) + parseInt(response.data.data.nbill);
        this.tfee = response.data.data.ncable;

        this.commission = response.data.data.cbill;
      } else if (this.usertype === 2) {
        this.redam = parseInt(this.amount) + parseInt(response.data.data.mbill);
        this.commission = response.data.data.cbill;
        this.tfee = response.data.data.mcable;
      }
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
        `${process.env.VUE_APP_BASE_URL}api/gettransaction?type=5`
      );

      this.transaction = transaction.data.data;
    } catch (e) {}

    try {
      const service = await axios.get(
        "https://vtpass.com/api/services?identifier=electricity-bill"
      );

      this.service = service.data.content;
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    async getEachNetwork(id) {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getcableorbillplan?serviceid=` + id
      );
      this.getplan = response.data.content.varations;

      this.isDisabledText = false;
    },
    async verifyMeterNumber() {
      const data = {
        serviceID: this.network.id,
        billersCode: this.phone,
        type: this.plan,
      };
      try {
        const verify = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/getmearchant`,
          data
        );

        if (verify.data.content.Customer_Name) {
          this.mname = verify.data.content.Customer_Name;
          this.address = verify.data.content.Address;
          this.isDisabled = false;
        } else {
          this.name = verify.data.content.error;
          this.address = verify.data.content.error;
          this.isDisabled = true;
        }
      } catch (e) {
        this.isDisabled = true;
      }
    },
    HandleSubmit() {
      if (parseInt(this.balance) >= parseInt(this.amount)) {
        this.btnText = "Loading";
        this.isdisabled = true;
        const current = new Date();

        const data = {
          networkid: this.network.id,
          networkname: this.network.networkname,
          amount: this.amount,
          reciever: this.phone,
          type: 5,
          tfee: this.tfee,
          plan: this.plan,
          planid: this.plan,
          status: 1,
          ref: moment(current).format("YYYYMMDDHHm"),
          commission: this.discount,
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

                <label for="exampleInputEmail1">Service Provider</label>

                <select
                  v-model="network"
                  class="form-control form-select-lg mb-3 w-100"
                  required
                  @change="getEachNetwork(network.id)"
                >
                  <option
                    v-for="item in service"
                    :key="item.id"
                    :value="{
                      networkname: item.name,
                      id: item.serviceID,
                    }"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <div v-show="isDisabledText" class="text-muted" style="color: crimsom">
                  Please choose a service provider first.
                </div>
                <br />

                <label for="exampleInputEmail1">Service Plan</label>

                <select
                  v-model="plan"
                  class="form-control form-select-lg mb-3 w-100"
                  required
                >
                  <option
                    v-for="item in getplan"
                    :key="item.id"
                    :value="item.variation_code"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <div class="form-group">
                  <label for="exampleInputEmail1">Meter Number</label>
                  <input
                    v-model="phone"
                    class="form-control"
                    aria-describedby="emailHelp"
                    required
                    @keydown="verifyMeterNumber"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Meter Name</label>
                  <input
                    v-model="mname"
                    type="text"
                    readonly
                    class="form-control"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input
                    v-model="address"
                    type="text"
                    readonly
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Recipient"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Amount</label>
                  <input
                    v-model="amount"
                    type="number"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="0.0"
                    @keydown="getAmontForCommission(amount)"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Commission</label>
                  <input
                    v-model="discount"
                    type="number"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="0.0"
                    readonly
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
                      height: 35px;
                      width: 35px;
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
                      <span>&#8358;{{ item.amount }}</span>
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
              <div v-else style="text-align: center">No bill yet</div>
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
.disableClass {
  background: #ccc !important;
  border: 1px solid #ccc;
}
.activeClass {
  background: #0a1aa8 !important;
  border: 1px solid #0a1aa8;
}
</style>
