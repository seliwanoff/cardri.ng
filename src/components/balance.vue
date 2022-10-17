<template>
  <div class="w-100">
    <b-card>
      <div class="container">
        <div class="w-100 border-bottom d-inline-block">
          <div class="float-left">
            <span class="font-weight-bold text-black" style="font-size: 0.8rem">
              <i class="mdi mdi-wallet" style="font-size: 0.9rem"></i>

              Total Balance
            </span>
            <h5 class="font-weight-bold text-black">
              &#8358;{{ Intl.NumberFormat().format(user.data.balance) }}
            </h5>
          </div>
          <div class="float-right">
            <router-link to="../deposit-fund/account-details">
              <button
                class="btn-rounded text-white p-1 bg-#4705AF border border-#4705AF deposit"
                style="min-width: 100px"
              >
                Deposit <span class="mdi mdi-send"></span>
              </button>
            </router-link>
          </div>
        </div>
        <div
          class="d-flex justify-content-center"
          style="margin: 0px !important; height: 60px !important"
        >
          <div class="d-flex justify-content-between" style="box-sizing: border-box">
            <b-card class="d-grid" style="background: none">
              <div class="d-flex justify-content-center">
                <router-link to="../convert-comission/commission">
                  <button
                    class="bg-#4705AF text-white border-#4705AF border cll"
                    style="width: 30px; height: 30px"
                  >
                    <i class="mdi mdi-wallet"></i>
                  </button>
                </router-link>
              </div>
              <span class="text-center" style="font-size: 0.7rem">commission</span>
            </b-card>
            <b-card class="d-grid" style="background: none; height: 150px !important"
              ><div class="d-flex justify-content-center">
                <router-link to="../service/transfer">
                  <button
                    class="bg-pink text-white border-pink border"
                    style="width: 30px; height: 30px"
                  >
                    <i class="mdi mdi-bank"></i>
                  </button>
                </router-link>
              </div>
              <span class="text-center" style="font-size: 0.7rem">Transfer</span></b-card
            >
            <b-card class="d-grid" style="background: none"
              ><div class="d-flex justify-content-center">
                <router-link to="../investment/investment">
                  <button
                    class="bg-#4705AF text-white border-#4705AF border cll"
                    style="width: 30px; height: 30px"
                  >
                    <i class="mdi mdi-trending-up"></i>
                  </button>
                </router-link>
              </div>
              <span class="text-center" style="font-size: 0.7rem"
                >investment</span
              ></b-card
            >
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "DepositApp",

  computed: {
    ...mapGetters(["user", "authenticated"]),
  },
};
</script>
