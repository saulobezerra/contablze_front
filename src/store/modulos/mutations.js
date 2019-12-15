// export function someMutation (/* state */) {
// }
export const setTitulo = (state, titulo) => {
    state.titulo = titulo
}
export const addDespesa = (state, despesa) => {
    state.despesas.push(despesa)
}
export const addReceita = (state, receita) => {
    state.receitas.push(receita)
}
export const registraUsuario = (state, usuario) => {
    state.user = usuario;
}
export const totalDespesas = (state, valor) => {
    state.totalDespesas = valor;
}
export const totalReceitas = (state, valor) => {
    state.totalReceitas = valor;
}//addProduto

export const addProduto = (state, produto) => {
    state.produtos.push(produto);
}

export const editaProduto = (state, produto) => {
    for (let index = 0; index < state.produtos.length; index++) {
        console.log(state.produtos[index].id, produto.id)
        if(state.produtos[index].id == produto.id) {
            state.produtos[index] = produto
        }
    }
}