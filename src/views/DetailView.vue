<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-5 flex-wrap">
      <div class="text-3xl font-medium text-900 p-3">Отчет за ломбард</div>
      <Calendar v-model="fromDate" dateFormat="dd/mm/yy" />
      <Calendar v-model="toDate" dateFormat="dd/mm/yy" />
      <Button @click="getCurrentPartnersReport" label="Submit" />
    </div>
    <div class="card px-3">
      <div class="grid grid-nogutter px-3">
        <div class="col-4">
          <div class="p-3 border-1 surface-border font-bold">
            {{ currentPartner?.name }}
          </div>
        </div>
        <div class="col-4">
          <div class="p-3 border-1 surface-border bg-blue-100 font-bold">
            Комиссионка
          </div>
        </div>
        <div class="col-4">
          <div class="p-3 border-1 surface-border bg-yellow-100 font-bold">
            ИТОГ
          </div>
        </div>
      </div>
      <span v-for="(key, value) in productList" :key="value">
        <div class="grid grid-nogutter px-3">
          <div class="col-4">
            <div class="p-3 border-1 surface-border font-bold">
              {{ ProductName[key[0] as keyof typeof ProductName] }}
            </div>
          </div>
          <div class="col-4">
            <div class="p-3 border-1 surface-border bg-blue-100">
              {{ key[1] }}
            </div>
          </div>
          <div class="col-4">
            <div class="p-3 border-1 surface-border bg-yellow-100">
              {{ key[1] }}
            </div>
          </div>
        </div>
      </span>
    </div>
    <chart-component :partnerId="currentPartner.id" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ChartComponent from "@/components/ChartComponent.vue";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import { usePartnersStore } from "@/store/partnersStore";
import api from "@/api/api";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const toDate = ref(new Date());
const fromDate = ref(new Date());
fromDate.value.setDate(1);

const store = usePartnersStore();

const { currentPartner } = storeToRefs(store);

enum ProductName {
  profit = "ДОХОД",
  profitStore = "ДОХОД МАГАЗИНА",
  otherProfit = "ДОП ДОХОДЫ",
  profits = "ДОХОДЫ",
  costs = "РАСХОДЫ",
  netProfit = "ЧИСТАЯ ПРИБЫЛЬ(-3%)",
  clients = "ВСЕ КЛИЕНТА",
  newClients = "НОВЫЕ КЛИЕНТА",
  netIssue = "ЧИТАЯ ВЫДАЧА",
  auctioneerEquipment = "АУКЦИОНИСТ ТЕХНИКА",
  auctioneerCoat = "АУКЦИОНИСТ ШУБА",
  cashInDeposit = "НАЛ В ЗАЛОГЕ",
}

interface IReportModel {
  profit: number;
  profitStore: number;
  otherProfit: number;
  profits: number;
  costs: number;
  netProfit: number;
  clients: number;
  newClients: number;
  netIssue: number;
  auctioneerEquipment: number;
  auctioneerCoat: number;
  cashInDeposit: number;
}

const products = ref<IReportModel>({
  profit: 0,
  profitStore: 0,
  otherProfit: 0,
  profits: 0,
  costs: 0,
  netProfit: 0,
  clients: 0,
  newClients: 0,
  netIssue: 0,
  auctioneerEquipment: 0,
  auctioneerCoat: 0,
  cashInDeposit: 0,
});
const productList = ref(Object.entries(products.value));
function formatDateToYYYYMMDDHHMMSS(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T23:59:59.000`;
}

const getCurrentPartnersReport = () => {
  console.log("render");

  currentPartner.value &&
    api
      .get<IReportModel>(
        `reports/${
          currentPartner.value.id
        }?fromDate=${formatDateToYYYYMMDDHHMMSS(
          fromDate.value
        )}&toDate=${formatDateToYYYYMMDDHHMMSS(toDate.value)}`
      )
      .then((res) => {
        products.value = res.data;
        productList.value = Object.entries(res.data);
        console.log(res.data);
      });
};

onMounted(() => {
  if (!currentPartner.value.id.length) router.push("/");
  else getCurrentPartnersReport();
});
</script>
