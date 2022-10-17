<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import Balance from "../../components/balance.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  page: {
    title: "Dashboard",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, Balance },
  data() {
    return {
      token: "",
      balance: "",
      accessToken: "",
      letdrops: "",
      hidemes: true,
      image: null,
      url: "https://cardri.ng/public/storage/images/",
      isLoading: true,
      fullPage: true,
      color: "#0A1AA8",
      fn: "",
      commission: "",
      usertype: "",
      transaction: [],
      moment: moment,
    };
  },
  computed: {
    ...mapGetters(["user", "authenticated"]),
  },
  async mounted() {
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`);
      if (response.data.data.bank == null) {
        await axios.get(`${process.env.VUE_APP_BASE_URL}api/createbank`);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const transaction = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/gettransaction`
      );

      this.transaction = transaction.data.data;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/login");
        localStorage.removeItem("admin");
      }
    }
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-md-12">
        <Balance />
        <b-card class="bg-#4705af" style="background: #4705af; height: 90px">
          <router-link to="/service/refer">
            <h6 style="color: #fff; margin: 0px !important; padding: 0px !important">
              Refer & Earn
            </h6>
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 5px;
                color: #fff;
                font-weight: 100 Important;
              "
            >
              <p style="font-weight: 100; font-size: 0.8rem">
                Earn Rewards for inviting business to Cardri
              </p>
              <span class="mdi mdi-arrow-right"></span>
            </div>
          </router-link>
        </b-card>
        <div class="w-100 d-inline-block d-sm-flex m-10">
          <b-card class="w-100 mr-1">
            <div class="d-flex justify-content-between w-100">
              <b-card
                class="border w-100 h-5 border-2 border-rgba(71, 5, 175, 0.1);"
                style="#000 color: #000;background:rgba(71, 5, 175, 0.1)"
              >
                <router-link to="./service/airtime" class="w-100">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-phone" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center; font-size: 0.7rem" class="w-100">
                    Airtime
                  </div>
                </router-link>
              </b-card>
              <b-card
                class="border w-100 border-1"
                style="#000 color: #000;background:rgba(255, 192, 203,0.1);border:rgba(255, 192, 203,0.1)"
              >
                <router-link to="./service/data" class="w-100">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-wifi" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center;w-100; font-size: 0.7rem">Data</div>
                </router-link>
              </b-card>
              <b-card
                class="border w-100"
                style="#000 color: #000; background: rgba(0, 193, 101, 0.1);
                      border: rgba(0, 193, 101, 0.1);"
              >
                <router-link to="./service/transfer">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-bank" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center;w-100; font-size: 0.7rem">
                    Send money
                  </div>
                </router-link>
              </b-card>
            </div>
            <div class="d-flex justify-content-between w-100">
              <b-card
                class="border w-100 border-2"
                style="#000 color: #000;background:rgba(71, 5, 175, 0.1);border:rgba(175, 5, 158, 0.1)"
              >
                <router-link to="./service/cable" class="w-100">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-television" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center;w-100; font-size: 0.7rem;">
                    Cable & Tv
                  </div>
                </router-link>
              </b-card>
              <b-card
                class="border w-100 border-2 border-primary"
                style="#000 color: #000;"
              >
                <router-link to="./service/betting">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i
                      class="mdi mdi-account-multiple-outline"
                      style="font-size: 1.2rem"
                    ></i>
                  </div>
                  <div style="text-align: center;w-100; font-size: 0.7rem">Betting</div>
                </router-link>
              </b-card>
              <b-card
                class="border w-100 border-2"
                style="#000 color: #000;background:rgba(0, 89, 193, 0.1);border:rgba(0, 89, 193, 0.1)"
              >
                <router-link to="./service/bill">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-lightbulb-on" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center;w-100; font-size: 0.7rem">Bill</div>
                </router-link>
              </b-card>
            </div>
          </b-card>
          <b-card class="w-100 ml-1">
            <div class="d-flex justify-content-between w-100">
              <b-card
                class="border w-100 h-5 border-2 border-primary"
                style="#000 color: #000"
              >
                <router-link to="./service/investment/level-1" class="w-100">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-coin" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center; font-size: 0.7rem" class="w-100">
                    Investment
                  </div>
                </router-link>
              </b-card>
              <b-card class="border w-100 border-1 border-pink" style="#000 color: #000">
                <router-link to="./service/investment/level-2" class="w-100">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-point-of-sale" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center;w-100; font-size: 0.7rem">POS</div>
                </router-link>
              </b-card>
              <b-card class="border w-100 border-2 border-info" style="#000 color: #000">
                <router-link to="./service/investment/level-3">
                  <div
                    class="d-flex justify-content-center -mt-2"
                    style="margin-top: -15px"
                  >
                    <i class="mdi mdi-clipboard-text" style="font-size: 1.2rem"></i>
                  </div>
                  <div style="text-align: center;w-100; font-size: 0.7rem">
                    Transaction
                  </div>
                </router-link>
              </b-card>
            </div>
          </b-card>
        </div>
        <h4 class="text-muted">Recent Transaction</h4>
        <b-card v-if="transaction.length > 0" style="max-width: 100%; width: 100%">
          <div v-for="item in transaction" :key="item.id" style="height: 50px">
            <div
              class="float-left"
              style="
                height: 35px;
                width: 35px;
                border-radius: 100%;
                border: 1px solid grey;
                place-items: center;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <i v-if="item.type === '1'" class="mdi mdi-tablet-android icons-pic"></i>
              <i v-if="item.type === '2'" class="mdi mdi-tablet-android icons-pic"></i>
              <i v-if="item.type === '3'" class="mdi mdi-television icons-pic"></i>
              <i v-if="item.type === '4'" class="mdi mdi-sync icons-pic"></i>
              <i v-if="item.type === '5'" class="mdi mdi-lightbulb icons-pic"></i>
              <i v-if="item.type === '6'" class="mdi mdi-bank icons-pic"></i>
            </div>
            <div class="float-right" style="width: calc(100% - 50px)">
              <div class="d-flex justify-content-between">
                <div>
                  <span v-if="item.network === '1'">MTN</span>
                  <span v-else-if="item.network === '2'">AIRTEL</span>
                  <span v-else-if="item.network === '3'">9MOBILE</span>
                  <span v-else-if="item.network === '4'">GLO</span>
                  <span v-else>{{ item.network }}</span>
                </div>
                <span>&#8358;{{ Intl.NumberFormat().format(item.amount) }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>{{ moment(item.updated_at).fromNow() }}</span>
                <span v-if="item.status === '1'" style="font-size: 0.8rem; color: green"
                  >sent</span
                >
                <span v-if="item.status === '0'" style="font-size: 0.8rem; color: crimson"
                  >failed</span
                >
              </div>
            </div>
          </div>
        </b-card>
        <div v-else style="text-align: center">No Transaction Yet</div>
      </div>
    </div>
  </Layout>
</template>
<style scoped>
.icons-pic {
  display: flex;

  align-self: center;
  margin: 0px auto;
}
</style>
