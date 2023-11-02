<template>
  <div>
    <div class="p-3">
      <span class="text-3xl font-medium text-900 pr-3"
        >Форма отчета директора филиала</span
      >
      <span
        ><Dropdown
          v-model="option"
          optionLabel="name"
          placeholder="Выберите филиал"
          :options="options"
          class="w-full md:w-14rem"
      /></span>
    </div>
    
    <div class="grid formgrid p-fluid p-3">
      <div class="field mb-4 col-12">
        <label for="reportDate" class="font-medium">Дата отчета:</label>
        <Calendar
          id="reportDate"
          v-model="reportForm.reportDate"
          dateFormat="dd/mm/yy"
          type="number"
          :class="{ 'p-invalid': reportErrors.reportDate }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.reportDate || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="profit" class="font-medium">Доход ломбарда:</label>
        <InputNumber
          v-model="reportForm.profit"
          id="profit"
          type="number"
          :class="{
            'p-invalid': reportForm.profit === null && reportErrors.profit,
          }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.profit || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="profitStore" class="font-medium">Доход магазина:</label>
        <InputNumber
          v-model="reportForm.profitStore"
          id="profitStore"
          type="number"
          :class="{ 'p-invalid': reportErrors.profitStore }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.profitStore || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="otherProfit" class="font-medium">Допполнительные доходы:</label>
        <InputNumber
          id="otherProfit"
          v-model="reportForm.otherProfit"
          type="number"
          :class="{ 'p-invalid': reportErrors.otherProfit }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.otherProfit || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="clients" class="font-medium">Клиенты за сегодня:</label>
        <InputNumber
          id="clients"
          v-model="reportForm.clients"
          type="number"
          :class="{ 'p-invalid': reportErrors.clients }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.clients || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="newClients" class="font-medium">Новые клиенты за сегодня:</label>
        <InputNumber
          id="newClients"
          v-model="reportForm.newClients"
          type="number"
          :class="{ 'p-invalid': reportErrors.newClients }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.newClients || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="netIssue" class="font-medium">Выдача за сутки:</label>
        <InputNumber
          id="netIssue"
          v-model="reportForm.netIssue"
          type="number"
          :class="{ 'p-invalid': reportErrors.netIssue }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.netIssue || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="cost" class="font-medium">Возврат:</label>
        <InputNumber
          id="cost"
          v-model="reportForm.cost"
          type="number"
          :class="{ 'p-invalid': reportErrors.cost }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.cost || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="invoice" class="font-medium">Накладная:</label>
        <InputNumber
          id="invoice"
          v-model="reportForm.invoice"
          type="number"
          :class="{ 'p-invalid': reportErrors.invoice }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.invoice || "&nbsp;"
        }}</small>
      </div>
      <!-- <div class="field mb-4 col-12">
        <label for="netProfit" class="font-medium">Чистая прибыль</label>
        <InputNumber
          id="netProfit"
          v-model="reportForm.netProfit"
          type="number"
          :class="{ 'p-invalid': reportErrors.netProfit }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.netProfit || "&nbsp;"
        }}</small>
      </div> -->
      <div class="field mb-4 col-12">
        <label for="auctioneerEquipment" class="font-medium"
          >Аукционист техники:</label
        >
        <InputNumber
          id="auctioneerEquipment"
          v-model="reportForm.auctioneerEquipment"
          type="number"
          :class="{ 'p-invalid': reportErrors.auctioneerEquipment }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.auctioneerEquipment || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="auctioneerCoat" class="font-medium">Аукционист шуб:</label>
        <InputNumber
          id="auctioneerCoat"
          v-model="reportForm.auctioneerCoat"
          type="number"
          :class="{ 'p-invalid': reportErrors.auctioneerCoat }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.auctioneerCoat || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="cashInDeposit" class="font-medium">Нал в залоге:</label>
        <InputNumber
          id="cashInDeposit"
          v-model="reportForm.cashInDeposit"
          type="number"
          :class="{ 'p-invalid': reportErrors.cashInDeposit }"
        />
        <small class="p-error" id="text-error">{{
          reportErrors.cashInDeposit || "&nbsp;"
        }}</small>
      </div>
      <div class="field mb-4 col-12">
        <label for="note" class="font-medium">ПРИМЕЧАНИЕ:</label>
        <InputText id="note" v-model="reportForm.note" type="text" />
      </div>
      <div class="field mb-4 col-12">
        <label for="cashInDepositGold" class="font-medium"
          >НАЛ В ЗАЛОГЕ ЗОЛОТО:</label
        >
        <InputNumber
          id="cashInDepositGold"
          v-model="reportForm.cashInDepositGold"
          type="number"
        />
      </div>
      <div class="field mb-4 col-12">
        <label for="auctioneerGold" class="font-medium">Аукционист ЗОЛОТО:</label>
        <InputNumber
          id="auctioneerGold"
          mode="decimal"
          :decimal="true"
          v-model="reportForm.auctioneerGold"
          type="number"
        />
      </div>
    </div>
    <div class="px-3">
      <Button
        :disabled="!option"
        @click="handleSubmit"
        label="Заполнить"
      ></Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import api from "@/api/api";
import { usePartnersStore } from "@/store/partnersStore";
import { storeToRefs } from "pinia";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const store = usePartnersStore();

const { partners } = storeToRefs(store);

const option = ref<{
  name: string;
  code: string;
}>();

const options = ref(
  partners.value.map((p) => ({
    name: p.name,
    code: p.id,
  }))
);

interface IReportForm {
  profit: number | null;
  profitStore: number | null;
  otherProfit: number | null;
  cost: number | null;
  // netProfit: number | null;
  clients: number | null;
  newClients: number | null;
  netIssue: number | null;
  invoice: number | null;
  auctioneerEquipment: number | null;
  auctioneerCoat: number | null;
  auctioneerGold: number | null;
  cashInDeposit: number | null;
  cashInDepositGold: number | null;
  reportDate: Date;
  note: string;
}

const reportForm = ref<IReportForm>({
  profit: null,
  profitStore: null,
  otherProfit: null,
  cost: null,
  // netProfit: null,
  clients: null,
  newClients: null,
  netIssue: null,
  auctioneerEquipment: null,
  auctioneerCoat: null,
  cashInDeposit: null,
  cashInDepositGold: null,
  auctioneerGold: null,
  invoice: null,
  reportDate: new Date(),
  note: "",
});
const reportErrors = ref({
  profit: "",
  profitStore: "",
  otherProfit: "",
  cost: "",
  netProfit: "",
  clients: "",
  newClients: "",
  netCashOut: "",
  auctioneerEquipment: "",
  auctioneerCoat: "",
  cashInDeposit: "",
  reportDate: "",
  invoice: "",
  netIssue: "",
});

function formatDateToYYYYMMDDHHMMSS(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000`;
}

const validateReportForm = (): boolean => {
  for (const k in reportErrors.value) {
    reportErrors.value[k as keyof typeof reportErrors.value] = "";
  }
  for (const k in reportForm.value) {
    const v = reportForm.value[k as keyof typeof reportForm.value];
    if (k === "note" || k === "auctioneerGold" || k === "cashInDepositGold" || v === 0)
      continue;

    !v &&
      (reportErrors.value[k as keyof typeof reportErrors.value] =
        "This is reqired field");
  }
  for (const k in reportErrors.value) {
    const v = reportErrors.value[k as keyof typeof reportErrors.value];
    if (v.length) return false;
  }
  return true;
};
const sendReport = () => {
  api
    .post(`reports/${option.value?.code}`, {
      ...reportForm.value,
      reportDate: formatDateToYYYYMMDDHHMMSS(reportForm.value.reportDate),
    })
    .then(() => {
      router.push("/");
    });
};
const handleSubmit = () => {
  if (validateReportForm()) {
    sendReport();
  }
};
</script>
