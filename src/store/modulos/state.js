export default {
  //
  titulo: 'Menu',
  despesas:[
    {
      id: 1,
      qtde_insumo: 14.0,
      valor: 26.459999999999997,
      valorUnitario: 1.89,
      local: "Bem Mais",
      descricao: "Açucar",
      data: new Date(),
      tipo: {
          id: 1,
          descricao: "Material"
      }
    },
    {
      id: 2,
      qtde_insumo: 10.0,
      valor: 21.9,
      valorUnitario: 2.19,
      local: "Todo Dia",
      descricao: "Farinha",
      data: new Date(),
      tipo: {
          id: 1,
          descricao: "Material"
      }
    },
    {
      id: 3,
      qtde_insumo: 2.0,
      valor: 31.78,
      valorUnitario: 15.89,
      local: "Bem Mais",
      descricao: "Margarina",
      data: new Date(),
      tipo: {
          id: 1,
          descricao: "Material"
      }
    },
    {
      id: 4,
      qtde_insumo: 2.0,
      valor: 18.0,
      valorUnitario: 9.0,
      local: "Todo Dia",
      descricao: "Ovo",
      data: new Date(),
      tipo: {
          id: 1,
          descricao: "Material"
      }
    }
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
//         id: 2
//     },
//     "usuario": {
//         id: 1
//     }
// }
  produtos:[
    {id: 0, nome: 'Bolo Fofo', valor: 8.00},
    {id: 1, nome: 'Bolo de Leite', valor: 10.00}
  ],
  tiposDespesa: [
    {
        id: 1,
        descricao: "Material"
    },
    {
        id: 2,
        descricao: "Gás"
    },
    {
        id: 3,
        descricao: "Energia"
    },
    {
        id: 4,
        descricao: "Água"
    },
    {
        id: 5,
        descricao: "Telefone"
    },
    {
        id: 6,
        descricao: "Equipamento"
    },
    {
        id: 7,
        descricao: "Capital"
    }
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
