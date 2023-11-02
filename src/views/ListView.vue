<template>
  <div>
    <div class="text-3xl font-medium text-900 p-3">Филилалы</div>

    <ul class="list-none px-3 m-0">
      <li
        v-for="partner in partners"
        :key="partner.id"
        class="border-bottom-1 surface-border py-3 flex flex-row md:align-items-center md:justify-content-between"
      >
        <router-link :to="{ path: '/details' }" class="no-underline">
          <a
            v-ripple
            class="cursor-pointer font-medium text-900"
            @click="handlePartnerClick(partner)"
            >{{ partner.name }}</a
          >
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import api from "@/api/api";
import { onMounted } from "vue";
import { usePartnersStore, IPartner } from "@/store/partnersStore";
import { storeToRefs } from "pinia";

const store = usePartnersStore();

const { partners } = storeToRefs(store);

const { setPartners, setCurrentPartner } = store;

const handlePartnerClick = (partner: IPartner) => {
  setCurrentPartner(partner);
};

onMounted(() => {
  api.get<IPartner[]>("/partners").then((res) => {
    console.log(res.data, "res");

    setPartners(res.data);
  });
});
</script>
