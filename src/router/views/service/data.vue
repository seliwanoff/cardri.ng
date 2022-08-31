<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import Balance from "../../../components/balance.vue";
import axios from "axios";
import Message from "@/src/components/message.vue";
import moment from "moment";
export default {
  page: {
    title: "Buy Data",
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
      isdisabled: false,
      btnText: "Submit",
      mtnapi: "",
      getplan: [],
      tfee: "",
      plan: "",
      message: "",
      status: null,
      transaction: [],
      moment: moment,
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
        this.redam = parseInt(this.amount) + parseInt(response.data.data.nairtime);
        this.tfee = response.data.data.ndata;

        this.commission = response.data.data.cdata;
      } else if (this.usertype === 2) {
        this.redam = parseInt(this.amount) + parseInt(response.data.data.mairtime);
        this.commission = response.data.data.cdata;
        this.tfee = response.data.data.mdata;
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
        `${process.env.VUE_APP_BASE_URL}api/gettransaction?type=2`
      );

      this.transaction = transaction.data.data;
    } catch (e) {}
  },

  methods: {
    async getEachNetwork(id) {
      if (id === "1" && this.mtnapi === 1) {
        try {
          const plan = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getmtnplans`);
          this.getplan = plan.data.data;
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const plan = await axios.get(
            `${process.env.VUE_APP_BASE_URL}api/smeplans?type=data`
          );
          this.getplan = plan.data.data.data[id];
        } catch (e) {
          console.log(e);
        }
      }
    },
    HandleSubmit() {
      if (this.phone.toString().length === 11) {
        console.log(this.plan.amount);
        if (parseInt(this.balance) >= parseInt(this.plan.amount)) {
          this.btnText = "Loading";
          this.isdisabled = true;
          const current = new Date();

          const data = {
            networkid: this.network.networkid,
            networkname: this.network.networkname,
            amount: this.plan.amount,
            reciever: this.phone,
            type: 2,
            tfee: this.tfee,
            plan: this.plan.plan,
            planid: this.plan.id,
            status: 1,
            ref: moment(current).format("YYYYMMDDHHm"),
            commission: this.discount,
            name: this.plan.name,
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
      } else {
        this.status = false;
        this.message = "Invalid Number";
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

                <label for="exampleInputEmail1">Network</label>

                <select
                  v-model="network"
                  class="form-control form-select-lg mb-3 w-100"
                  aria-label=".form-select-lg example"
                  required
                  @change="getEachNetwork(network.networkid)"
                >
                  <option :value="{ networkid: '1', networkname: 'MTN' }">MTN</option>
                  <option :value="{ networkid: '2', networkname: 'AIRTEL' }">
                    Airtel
                  </option>
                  <option :value="{ networkid: '3', networkname: '9MOBILE' }">
                    9mobile
                  </option>
                  <option :value="{ networkid: '4', networkname: 'GLO' }">Glo</option>
                </select>
                <label for="exampleInputEmail1">Select Plan</label>

                <select
                  v-model="plan"
                  class="form-control form-select-lg mb-3 w-100"
                  required
                  @change="getAmontForCommission(plan.amount)"
                >
                  <option
                    v-for="item in getplan"
                    :key="item.id"
                    :value="{
                      id: item.id,
                      amount: item.price,
                      name: item.name,
                      plan: item.plan,
                    }"
                  >
                    {{ item.name }} {{ item.plan }} &#8358;{{ item.price }}
                  </option>
                </select>
                <div class="form-group">
                  <label for="exampleInputEmail1">Phone Number</label>
                  <input
                    v-model="phone"
                    type="number"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Recipient"
                    required
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

                <button :disabled="isdisabled" type="submit" class="btn btn-primary">
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
                      <div>
                        <span v-if="item.network === '1'">MTN</span>
                        <span v-else-if="item.network === '2'">AIRTEL</span>
                        <span v-else-if="item.network === '3'">9MOBILE</span>
                        <span v-else-if="item.network === '4'">GLO</span>
                        <span v-else>{{ item.network }}</span>
                      </div>
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
              <div v-else style="text-align: center">No Data transaction yet</div>
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
