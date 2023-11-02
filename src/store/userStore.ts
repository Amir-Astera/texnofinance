import { User } from "firebase/auth";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ user: null as User | null }),
  getters: {},
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
  },
});
