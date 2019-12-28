export default {
  //
  titulo: 'Menu',
  despesas:[
    {nome: 'Farinha de trigo com fermento', valor: 2.89, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Farinha de trigo sem fermento', valor: 2.19, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Farinha de trigo com fermento', valor: 2.89, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Farinha de trigo sem fermento', valor: 2.19, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Farinha de trigo com fermento', valor: 2.89, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Farinha de trigo sem fermento', valor: 2.19, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Farinha de trigo com fermento', valor: 2.89, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Farinha de trigo sem fermento', valor: 2.19, local: 'Todo Dia', data: '03/11/2019'},
    {nome: 'Margarina Deline 3kg', valor: 16.79, local: 'Irmãos Nunes', data: '03/11/2019'}
  ],
  receitas:[
    { 
      id: 1,
      nomeCliente: "Severino", 
      dataReceita: "2019-12-18T22:53:29.228+0000",
      valor: 8.0,
      isPago: true, 
      observacao: "Teste de cadastro", 
      qtdeProduto: 1.0,
      produto: {
          id: 1,
          nome: 'Bolo Fofo',
          valor: 8.0
      }
    },
    { 
      id: 2,
      nomeCliente: "Severino", 
      dataReceita: "2019-12-18T22:53:29.228+0000",
      valor: 20.0,
      isPago: false, 
      observacao: "Teste de cadastro", 
      qtdeProduto: 2.0,
      produto: {
          id: 2,
          nome: 'Bolo Baeta',
          valor: 10.0
      }
    },
    { 
      id: 3,
      nomeCliente: "Severino", 
      dataReceita: "2019-12-18T22:53:29.228+0000",
      valor: 10.0,
      isPago: true, 
      observacao: "", 
      qtdeProduto: 1.0,
      produto: {
          id: 2,
          nome: 'Bolo Baeta',
          valor: 10.0
      }
    },
    { 
      id: 4,
      nomeCliente: "Severino", 
      dataReceita: "2019-12-18T22:53:29.228+0000",
      valor: 8.0,
      isPago: true, 
      observacao: "Teste de cadastro", 
      qtdeProduto: 1.0,
      produto: {
          id: 1,
          nome: 'Bolo Fofo',
          valor: 8.0
      }
    }
  ],

//   {
//     "nomeCliente": "Severino",
//     "isPago": true,
//     "observacao": "Teste de cadastro",
//     "qtdeProduto": 3.0,
//     "produto": {
//         "id": 2
//     },
//     "usuario": {
//         "id": 1
//     }
// }
  produtos:[
    {id: 0, nome: 'Bolo Fofo', valor: 8.00},
    {id: 1, nome: 'Bolo de Leite', valor: 10.00}
  ],
  totalDespesas: 0,
  totalReceitas: 0,
  user : undefined
  // user: {
  //   nome: '',
  //   userName: '',
  //   email: '',
  //   senha: '',
  // }
}
