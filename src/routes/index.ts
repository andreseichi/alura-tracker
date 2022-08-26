import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TarefasView from "../views/Tarefas.vue";
import ProjetosView from "../views/Projetos.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: TarefasView,
  },
  {
    path: "/projetos",
    name: "Projetos",
    component: ProjetosView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
