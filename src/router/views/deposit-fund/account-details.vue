<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
// import Balance from "../../../components/commission.vue";
import axios from "axios";
import Message from "@/src/components/message.vue";
import moment from "moment";
import { mapGetters } from "vuex";
// import user from "@/src/store/user";

export default {
  page: {
    title: "Fund wallet",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, Message },
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
      amount: "",
      isdisabled: false,
      btnText: "Submit",
      status: null,
      message: "",
      tfee: "",
      networkid: "1",
      transaction: [],
      moment: moment,
      bank: "",
      bankname: "",
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
      this.bank = user.data.data.bank;

      this.bankname = user.data.data.bankname;
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
    async HandleSubmit() {
      this.isdisabled = true;
      this.btnText = "Loading";
      try {
        const commission = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/withdrawcommission`,
          1
        );
        if (commission.data.Status === "true") {
          this.status = true;
          this.message = "Commission withdraw successfully";
        }
      } catch (e) {
        if (e.response.status === 400 || e.response.status === 422) {
          this.isDisabled = false;
          this.status = false;
          this.message = e.response.data.message;
          this.btnText = "Submit";
          this.isDisabled = false;
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } else {
          this.status = false;
          this.message = "Connection problem";
          this.isDisabled = false;
          this.btnText = "submit";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      }
    },
    getAmount() {
      this.discount = this.commission * this.amount;
    },
    copyText() {
      try {
        navigator.clipboard.writeText(this.bank);
        this.status = true;
        this.message = "Copied to clipboard";
        this.interval = setInterval(() => {
          this.status = null;
        }, 2000);
      } catch (e) {
        this.status = false;
        this.message = "Failed to copy";
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-md-12">
        <b-card class="bg-dark">
          <div class="d-flex justify-content-between m-1" style="height: 40px">
            <div></div>

            <span
              class="mdi mdi-content-copy"
              style="color: #fff"
              @click="copyText"
            ></span>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <div style="text-align: center; color: #fff">
                <h6 class="text-white">
                  Account Number
                  <div style="margin-top: 4px">{{ user.data.bank }}</div>
                  <input v-model="bank" type="hidden" name="" class="copy" />
                </h6>
              </div>
              <div style="text-align: center; color: #fff">
                <h6 class="text-white">
                  Bank Name
                  <div style="margin-top: 4px">{{ user.data.bankname }}</div>
                </h6>
              </div>
            </div>
            <div>
              <div style="text-align: center; color: #fff">
                <h6 class="text-white">
                  Manual Account Number
                  <div style="margin-top: 4px">{{ user.data.bank }}</div>
                  <input v-model="bank" type="hidden" name="" class="copy" />
                </h6>
              </div>
              <div style="text-align: center; color: #fff">
                <h6 class="text-white">
                  Bank Name
                  <div style="margin-top: 4px">{{ user.data.bankname }}</div>
                </h6>
              </div>
            </div>
          </div>
          <div class="">
            Important Notice:<small style="color: red"
              >All manual payment receipt should be sent to 09128740173</small
            >
          </div>
        </b-card>

        <b-card>
          <div class="d-lg-flex justify-content-between">
            <b-card class="border border-pink w-100" style="max-height: 400px">
              <p class="text-muted">
                You can pay through your personalized account details above or by using
                your card.<br />
                <span style="color: crimson"> Charges required for using card.</span>
              </p>
              <form
                style="place-items: center; align-items: center"
                @submit.prevent="HandleSubmit"
              >
                <Message :status="status" :message="message" />

                <div class="form-group">
                  <label for="exampleInputEmail1">Amount</label>
                  <input
                    v-model="amount"
                    type="number"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="50"
                  />
                </div>

                <button :disabled="isdisabled" type="submit" class="btn btn-primary">
                  {{ btnText }}
                </button>
              </form>
            </b-card>
            <b-card class="w-100 glvl">
              <h4 class="text-muted" style="margin-left: 10px; margin-top: 0px">
                Recent Transaction
              </h4>
              <b-card
                v-if="transaction.length > 0"
                class="w-100"
                style="
                  overflow: auto;
                  max-height: 500px;

                  overflow: auto;
                "
              >
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
                      border: 1px solid black;
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
              <div v-else style="text-align: center">No Funding yet</div>
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
</style>
