const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: '/', name: 'menu', component: () => import('pages/Home.vue') },
      { path: '/receitas', name: "receitas", component: () => import('pages/Receitas.vue') },
      { path: '/receitas/:mes/:ano', name: "receitasPorMes", component: () => import('pages/Receitas.vue') },
      { path: '/receitas/editar/:id', name: "editarReceita", component: () => import('pages/cadastraReceita.vue') },
      { path: '/despesas', name: "despesas", component: () => import('pages/Despesas.vue') },
      { path: '/despesas/:mes/:ano', name: "despesasPorMes", component: () => import('pages/Despesas.vue') },
      { path: '/despesas/editar/:id', name: "editarDespesa", component: () => import('pages/CadastraDespesa.vue') },
      { path: '/produtos', name: "produtos", component: () => import('pages/Produtos.vue') },
      { path: '/produtos/cadastra', name: "cadastraProduto", component: () => import('pages/CadastraProduto.vue') },
      { path: '/produtos/editar/:id', name: "editarProduto", component: () => import('pages/CadastraProduto.vue') },
      { path: '/despesas/cadastraDespesa', name: "cadastraDespesa", component: () => import('pages/CadastraDespesa.vue') },
      { path: '/receitas/cadastraReceita', name: "cadastraReceita", component: () => import('pages/cadastraReceita.vue') },
      { path: '/cadastroUsuario', name: "cadastroUsuario", component: () => import('pages/CadastroUsuario.vue') },
      { path: '/perfil', name: "perfil", component: () => import('pages/CadastroUsuario.vue') },
      { path: '/lucro', name: "lucro", component: () => import('pages/Lucro.vue') },
      { path: '/lucro/receitas', name: "receita", component: () => import('pages/Receitas.vue') }
    ]
  },
  
  // {
  //   path: '/receitas',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', name: "receitas", component: () => import('pages/Receitas.vue') }
  //   ]
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
