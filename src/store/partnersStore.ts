import { defineStore } from "pinia";
import { ref } from "vue";

export interface IPartner {
  id: string;
  name: string;
  description?: string;
  status: number;
}

export const usePartnersStore = defineStore("partners", () => {
  const partners = ref<IPartner[]>([]);
  const currentPartner = ref<IPartner>({
    id: "",
    name: "",
    status: 0,
  });

  function setPartners(partnersList: IPartner[]) {
    partners.value = partnersList;
  }
  function setCurrentPartner(partner: IPartner) {
    currentPartner.value = partner;
  }

  return { partners, currentPartner, setCurrentPartner, setPartners };
});
