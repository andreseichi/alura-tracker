import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TarefasView from "../views/Tarefas.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: TarefasView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
