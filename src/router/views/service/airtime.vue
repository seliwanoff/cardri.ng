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
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getmanagement`
      );
      if (this.usertype === 1) {
        this.redam = parseInt(this.amount) + parseInt(response.data.data.nairtime);
        this.tfee = response.data.data.nairtime;

        this.commission = response.data.data.caitime;
      } else if (this.usertype === 2) {
        this.redam = parseInt(this.amount) + parseInt(response.data.data.mairtime);
        this.commission = response.data.data.caitime;

        this.tfee = response.data.data.mairtime;
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const transaction = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/gettransaction?type=1`
      );

      this.transaction = transaction.data.data;
    } catch (e) {}
    this.isLoading = false;
  },

  methods: {
    HandleSubmit() {
      if (this.phone.toString().length === 11) {
        if (this.balance >= this.amount) {
          this.btnText = "Loading";
          this.isdisabled = true;
          const current = new Date();

          const data = {
            networkid: this.network.networkid,
            networkname: this.network.networkname,
            amount: this.amount,
            reciever: this.phone,
            type: 1,
            tfee: this.tfee,
            plan: "",
            status: 1,
            planid: "",
            ref: moment(current).format("YYYYMMDDHHm"),
            commission: this.commission,
          };
          console.log(data);
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
    getAmount() {
      this.discount = this.commission * this.amount;
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
                    placeholder="Enter Amount"
                    required
                    @keyup="getAmount"
                  />
                </div>

                <button :disabled="isdisabled" type="submit" class="btn btn-primary">
                  {{ btnText }}
                </button>
              </form>
            </b-card>
            <b class="w-100 glvl">
              <h4 class="text-muted" style="margin-left: 10px; margin-top: 0px">
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
              <div
                v-else
                style="text-align: center; font-weight: normal; margin-top: 20px"
              >
                No Airtime Transaction Yet
              </div>
            </b>
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
