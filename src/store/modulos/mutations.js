// export function someMutation (/* state */) {
// }
export const setUsuario = (state, usuario) => {
    if(usuario != null || usuario != undefined) 
        usuario['senha'] = '******'

    localStorage.setItem('usuario', JSON.stringify(usuario));
    state.user = usuario;
}
export const setTitulo = (state, titulo) => {
    state.titulo = titulo
}
export const addDespesa = (state, despesa) => {
    despesa["valor"] = despesa.valorUnitario * despesa.qtde_insumo;
    state.despesas.push(despesa)
}
export const addReceita = (state, receita) => {
    state.receitas.push(receita)
}

export const setReceitas = (state, receitas) => {
    state.receitas = receitas
}

export const setDespesas = (state, despesas) => {
    state.despesas = despesas
}

export const setTiposDespesa = (state, tiposDespesa) => {
    state.tiposDespesa = tiposDespesa
}

export const totalDespesas = (state, valor) => {
    state.totalDespesas = valor;
}

export const totalReceitas = (state, valor) => {
    state.totalReceitas = valor;
}

export const addProduto = (state, produto) => {
    state.produtos.push(produto);
}

export const setTotalReceitasPendentes = (state, totalPendentes) => {
    state.totalReceitasPendentes = totalPendentes;
}

export const setProdutos = (state, produtos) => {
    state.produtos = produtos;
}

export const editaProduto = (state, produto) => {
    for (let index = 0; index < state.produtos.length; index++) {
        if(state.produtos[index].id == produto.id) {
            state.produtos[index] = produto
        }
    }
}

export const setLucrosDefault = (state, lucros) => {
    state.lucros = lucros;
}

export const setObjMensagem = (state, objMsg) => {
    state.objMensagem = objMsg;
}

export const setToken = (state, valor) => {
    if(valor == null || valor == '')
        localStorage.removeItem('token');
    else
        localStorage.setItem('token', valor);
}
