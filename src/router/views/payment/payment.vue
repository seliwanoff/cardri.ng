<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import Balance from "../../../components/balance.vue";
import axios from "axios";
import Message from "@/src/components/message.vue";
// import Message from "@/src/components/message.vue";
export default {
  page: {
    title: "Make payment",
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
      network: "",
      phone: "",
      discount: 0,
      amount: 0,
      isdisabled: false,
      btnText: "Submit",
      status: null,
      message: "",
      receiver: "",
      plan: "",
      ref: "",
      type: "",
      tfee: "",
      reciever: "",
      mtnapi: "",
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
      this.phone = user.data.data.phone;

      const data = JSON.parse(localStorage.getItem("sub"));
      this.amount = data.amount;
      this.commission = data.commission;
      this.ref = data.ref;
      this.plan = data.plan;
      this.planid = data.planid;
      this.reciever = data.reciever;
      this.tfee = data.tfee;
      this.type = data.type;
      this.name = data.name;
      this.network = data.network;
      this.networkname = data.networkname;

      this.networkid = data.networkid;
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getmanagement`
      );
      this.mtnapi = response.data.data.mtnapi;
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
  },

  methods: {
    async HandleSubmit() {
      if (this.type === 2) {
        console.log(this.mtnapi);
        if (this.networkid === "1" && this.mtnapi === 1) {
          const data = {
            type: this.type,
            status: 1,
            ref: this.ref,
            am: this.amount,
            plan: this.plan,
            planid: this.planid,
            network: this.networkid,
            reciever: this.reciever,
            amount: this.amount,
            name: this.plan,
            mtn: "mtn",
            m: "web",
          };
          console.log(data);
          try {
            const resp = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/transaction`,
              data
            );
            if (resp.data.success === "false") {
              this.status = false;
              this.message = resp.data.data.msg;
              this.setTimeout = setTimeout(() => {
                this.status = null;
                this.btnText = "Payment";
                this.isDisabled = false;
              }, 3000);
            } else {
              this.status = true;
              this.message = resp.data.comment;
              this.setTimeout = setTimeout(() => {
                this.$router.push("/dashboard");
              }, 3000);
            }
          } catch (e) {
            if (e.response.status === 400 || e.response.status === 422) {
              this.isDisabled = false;
              this.status = false;
              this.message = e.response.data.message;
              this.btnText = "Payment";
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
                this.btnText = "Payment";
              }, 3000);
            }
          }
        } else {
          const data = {
            type: this.type,
            status: 1,
            ref: this.ref,
            am: this.amount,
            plan: this.plan,
            planid: this.planid,
            network: this.networkid,
            reciever: this.reciever,
            amount: this.amount,
            name: this.networkname,
            mtn: "",
            m: "web",
          };
          try {
            const resp = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/transaction`,
              data
            );
            if (resp.data.success === "false") {
              this.status = false;
              this.message = resp.data.data.msg;
              this.setTimeout = setTimeout(() => {
                this.status = null;
                this.btnText = "Payment";
                this.isDisabled = false;
              }, 3000);
            } else {
              this.status = true;
              this.message = resp.data.comment;
              this.setTimeout = setTimeout(() => {
                this.$router.push("/dashboard");
              }, 3000);
            }
          } catch (e) {
            if (e.response.status === 400 || e.response.status === 422) {
              this.isDisabled = false;
              this.status = false;
              this.message = e.response.data.message;
              this.btnText = "Payment";
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
                this.btnText = "Payment";
              }, 3000);
            }
          }
        }
      } else if (this.type === 3) {
        const data = {
          reciever: this.reciever,
          type: this.type,
          status: 1,
          ref: this.ref,
          amount: this.amount,
          plan: this.planid,
          name: this.metername,
          network: this.network,
          cref: this.ref,
          serveid: this.networkid,
          ph: this.phone,
          am: this.amount,
          bi: this.reciever,
          variationcode: this.planid,
          requestid: this.ref,
          fr: "",
          st: this.ename,
          m: "web",
        };
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/transaction`,
            data
          );
          if (response.data.data.code > "000") {
            this.status = false;
            this.message = response.data.data.response_description;
            this.setTimeout = setTimeout(() => {
              this.status = null;
              this.btnText = "Submit";
              this.isDisabled = false;
            }, 3000);
          } else {
            this.status = true;
            this.message = response.data.data.response_description;
            this.setTimeout = setTimeout(() => {
              this.$router.push("/dashboard");
            }, 3000);
          }
        } catch (e) {
          if (e.response.status === 400 || e.response.status === 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Payment";
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
              this.btnText = "Payment";
            }, 3000);
          }
        }
      } else if (this.type === 1) {
        const data = {
          type: this.type,
          status: 1,
          ref: this.ref,
          am: this.amount,
          plan: "",
          planid: "",
          network: this.networkid,
          reciever: this.reciever,
          amount: this.amount,
          name: this.network,
          mtn: "",
          m: "web",
        };
        try {
          const resp = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/transaction`,
            data
          );

          if (resp.data.data.status === false || resp.data.data.status < 0) {
            this.status = false;
            this.message = resp.data.data.msg;
            this.setTimeout = setTimeout(() => {
              this.status = null;
              this.btnText = "Payment";
              this.isDisabled = false;
            }, 3000);
          } else {
            this.status = true;
            this.message = "Transaction Succesful";
            this.setTimeout = setTimeout(() => {
              this.$router.push("/dashboard");
            }, 3000);
          }
        } catch (e) {
          if (e.response.status === 400 || e.response.status === 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Payment";
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
              this.btnText = "Payment";
            }, 3000);
          }
        }
      } else if (this.type === 4) {
        const data = {
          reciever: this.reciever,
          type: this.type,
          status: 1,
          ref: this.ref,
          amount: this.amount,
          plan: this.plan,
          name: this.name,
          network: this.network,
          m: "web",
        };
        try {
          const resp = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/transaction`,
            data
          );
          console.log(resp);
          this.status = true;
          this.message = "Transfer Successful";
          this.setTimeout = setTimeout(() => {
            this.$router.push("/dashboard");
          }, 3000);
        } catch (e) {
          if (e.response.status === 400 || e.response.status === 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Payment";
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
              this.btnText = "Payment";
            }, 3000);
          }
        }
      } else if (this.type === 5) {
        const data = {
          reciever: this.reciever,
          type: this.type,
          status: 1,
          ref: this.ref,
          amount: this.amount,
          plan: this.planid,
          name: this.metername,
          network: this.network,
          cref: this.ref,
          serveid: this.networkid,
          ph: this.phone,
          am: this.amount,
          bi: this.reciever,
          variationcode: this.planid,
          requestid: this.ref,
          fr: "",
          st: this.ename,
          m: "web",
        };
        try {
          const response = await axios.post(
            `${process.env.VUE_APP_BASE_URL}api/transaction`,
            data
          );
          if (response.data.data.code > "000") {
            this.status = false;
            this.message = response.data.data.response_description;
            this.setTimeout = setTimeout(() => {
              this.status = null;
              this.btnText = "Submit";
              this.isDisabled = false;
            }, 3000);
          } else {
            this.status = true;
            this.message = response.data.data.response_description;
            this.setTimeout = setTimeout(() => {
              this.$router.push("/dashboard");
            }, 3000);
          }
        } catch (e) {
          if (e.response.status === 400 || e.response.status === 422) {
            this.isDisabled = false;
            this.status = false;
            this.message = e.response.data.message;
            this.btnText = "Payment";
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
              this.btnText = "Payment";
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
        <form action="" @submit.prevent="HandleSubmit">
          <Message :status="status" :message="message" />
          <b-card style="max-width: 100%; width: 100%">
            <div class="payment-info">
              <h5 style="font-weight: 600">Reference</h5>
              <span> {{ ref }}</span>
            </div>
            <div class="payment-info">
              <h5 style="font-weight: 600">Amount</h5>
              <span>&#8358; {{ amount }}</span>
            </div>
            <div class="payment-info">
              <h5 style="font-weight: 600">Receiver</h5>
              <span> {{ reciever }}</span>
            </div>
            <div v-if="plan !== ''" class="payment-info">
              <h5 style="font-weight: 600">Plan</h5>
              <span> {{ networkname }}{{ plan }}</span>
            </div>
            <div class="payment-info">
              <h5 style="font-weight: 600">Network</h5>
              <span> {{ networkname }}</span>
            </div>
            <div class="payment-info">
              <h5 style="font-weight: 600">Commission</h5>
              <span>&#8358; {{ commission }}</span>
            </div>
            <div class="payment-info">
              <h5 style="font-weight: 600">Transaction Fee</h5>
              <span>&#8358; {{ tfee }}</span>
            </div>
            <div class="payment-info">
              <h5 style="font-weight: 600">Total Charges</h5>
              <span>&#8358; {{ parseInt(amount) + parseInt(tfee) }}</span>
            </div>
            <button :disabled="isdisabled" type="submit" class="btn btn-primary">
              {{ btnText }}
            </button>
          </b-card>
        </form>
      </div>
    </div>
  </Layout>
</template>
<style>
.payment-info {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
</style>
