<template>
  <div class="min-h-screen flex relative lg:static bg-primary-50">
    <div
      id="app-sidebar-2"
      class="bg-bluegray-800 min-h-screen hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 select-none"
      style="width: 280px"
    >
      <div class="flex flex-column h-full">
        <div class="overflow-y-auto mt-3">
          <ul class="list-none p-3 m-0">
            <li>
              <router-link :to="{ path: '/' }" class="no-underline">
                <a
                  v-ripple
                  class="flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-home mr-2"></i>
                  <span class="font-medium">Главная</span>
                </a>
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/send-report' }" class="no-underline">
                <a
                  v-ripple
                  class="flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors p-ripple"
                >
                  <i class="pi pi-chart-line mr-2"></i>
                  <span class="font-medium">Отправить отчет</span>
                </a>
              </router-link>
            </li>
            <li @click="handleSignOutClick">
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 hover:bg-bluegray-900 border-round text-bluegray-100 hover:text-bluegray-50 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-sign-out mr-2"></i>
                <span class="font-medium">Выйти</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex flex-column relative flex-auto">
      <div
        class="flex justify-content-between align-items-center pl-2 lg:px-5 relative lg:static"
      >
        <div class="flex">
          <a
            v-ripple
            class="cursor-pointer block lg:hidden text-700 mr-3 mt-1 p-ripple"
            v-styleclass="{
              selector: '#app-sidebar-2',
              enterClass: 'hidden',
              enterActiveClass: 'fadeinleft',
              leaveToClass: 'hidden',
              leaveActiveClass: 'fadeoutleft',
              hideOnOutsideClick: true,
            }"
          >
            <i class="pi pi-bars text-4xl"></i>
          </a>
        </div>
      </div>
      <div class="lg:p-5 flex flex-column flex-auto">
        <div class="border-2 border-transparent surface-section flex-auto">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const handleSignOutClick = () => {
  signOut(getAuth()).then(() => {
    router.push("sign-in");
  });
};
</script>
