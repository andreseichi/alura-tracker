import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TarefasView from "../views/Tarefas.vue";
import ProjetosView from "../views/Projetos.vue";
import ListaView from "../views/Projetos/Lista.vue";
import FormularioProjeto from "../views/Projetos/Formulario.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tarefas",
    component: TarefasView,
  },
  {
    path: "/projetos",
    component: ProjetosView,
    children: [
      {
        path: "",
        name: "Projetos",
        component: ListaView,
      },
      {
        path: "novo",
        name: "Novo Projeto",
        component: FormularioProjeto,
      },
      {
        path: ":id",
        name: "Editar Projeto",
        component: FormularioProjeto,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
