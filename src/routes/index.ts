import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TarefasView from '../views/Tarefas.vue';
import ProjetosView from '../views/Projetos.vue';
import FormularioProjeto from '../views/Projetos/Formulario.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: TarefasView,
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: ProjetosView,
  },
  {
    path: '/projetos/novo',
    name: 'Novo Projeto',
    component: FormularioProjeto,
  },
  {
    path: '/projetos/:id',
    name: 'Editar Projeto',
    component: FormularioProjeto,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
