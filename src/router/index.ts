import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import SignIn from "@/layouts/SignIn.vue";
import MainVue from "@/layouts/Main.vue";
import { useUserStore } from "@/store/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SendReport from "../views/SendReport.vue";
import List from "../views/ListView.vue";
import Details from "../views/DetailView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/sign-in",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/",
    name: "main",
    component: MainVue,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/send-report",
        name: "sendreport",
        component: SendReport,
      },
      {
        path: "/",
        name: "list",
        component: List,
      },
      {
        path: "/details",
        name: "details",
        component: Details,
      },
    ],
  },
];

const getCurrentUser = () => {
  const { setUser } = useUserStore();
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        setUser(user);
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // Check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // If the user is not authenticated, redirect to the sign-in page
      if (!(await getCurrentUser())) {
        next({ name: "signin" });
      } else {
        next(); // User is authenticated, proceed to the route
      }
    } else {
      next(); // No authentication required, proceed to the route
    }
  }
);

export default router;
