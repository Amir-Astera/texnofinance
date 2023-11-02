<template>
  <div class="signin bg-primary-50">
    <div
      class="signin-card surface-card p-8 shadow-2 border-round w-full lg:w-5"
    >
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Добро пожаловать!</div>
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2"
          >Почта</label
        >
        <InputText
          id="email1"
          type="text"
          placeholder="Почта"
          class="w-full mb-3"
          v-model="email"
          required
        />

        <label for="password1" class="block text-900 font-medium mb-2"
          >Пароль</label
        >
        <InputText
          id="password1"
          type="password"
          placeholder="Пароль"
          class="w-full mb-3"
          v-model="password"
          required
        />
        <div class="mb-3 text-red-600" v-if="error">{{ error }}</div>

        <Button
          @click="signIn"
          label="Войти"
          icon="pi pi-user"
          class="w-full"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";

const { setUser, user } = useUserStore();

const error = ref<string>("");

const email = ref("");
const password = ref("");
const auth = getAuth();
const router = useRouter();

const signIn = async () => {
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      setUser(userCredential.user);

      router.push("/");
    })
    .catch((err) => {
      error.value = "Login failed. Please check your credentials.";
      console.log(err);
    });
};

const signInWithGoogle = async () => {
  const auth = getAuth();

  await signInWithPopup(auth, new GoogleAuthProvider())
    .then((userCredential) => {
      setUser(userCredential.user);

      router.push("/");
    })
    .catch((err) => {
      error.value = "Google sign-in failed. Please try again.";
      console.log(err);
    });
};
</script>

<style>
.signin {
  position: relative;
  height: 100vh;
}

.signin-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
