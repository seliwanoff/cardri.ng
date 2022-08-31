<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import Balance from "../../../components/commission.vue";
import axios from "axios";
import Message from "@/src/components/message.vue";
import moment from "moment";
import { mapGetters } from "vuex";
// import user from "@/src/store/user";

export default {
  page: {
    title: "commission",
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
      btnText: "Withdraw commission",
      status: null,
      message: "",
      tfee: "",
      networkid: "1",
      transaction: [],
      moment: moment,
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
          this.btnText = "Withdraw commission";
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
            <b-card class="border border-pink w-100" style="max-height: 300px">
              <form
                style="place-items: center; align-items: center"
                @submit.prevent="HandleSubmit"
              >
                <Message :status="status" :message="message" />

                <div class="form-group">
                  <label for="exampleInputEmail1">Amount</label>
                  <input
                    v-model="commission"
                    type="number"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Amount"
                    required
                    readonly
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
              <b-card v-if="transaction.length > 0" class="w-100">
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
              <div
                v-else
                style="
                  text-align: center;
                  font-size: 0.9rem;
                  width: 100%;
                  margin-top: 20px;
                  font-weight: normal;
                "
              >
                No Commission Transaction Yet
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
