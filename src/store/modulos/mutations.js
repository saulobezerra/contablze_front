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
}