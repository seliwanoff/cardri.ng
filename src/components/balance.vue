<template>
  <b-card>
    <div class="container">
      <div class="w-100 border-bottom d-inline-block">
        <div class="float-left">
          <span class="font-weight-bold text-black">Total Balance</span>
          <h3 class="font-weight-bold text-black">&#8358;{{ user.data.balance }}</h3>
        </div>
        <div class="float-right">
          <router-link to="../deposit-fund/account-details">
            <button
              class="btn-rounded text-white p-1 bg-#4705AF border border-#4705AF deposit"
              style="min-width: 120px"
            >
              Deposit
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
          <b-card class="d-grid" style="background: none"
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
            <span class="text-center" style="font-size: 0.7rem">investment</span></b-card
          >
        </div>
      </div>
    </div>
  </b-card>
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
