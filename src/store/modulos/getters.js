export function someGetter (/* state */) {
}

export function getProdutos (state) {
    return state.produtos
}

export function getUsuarioId (state) {
    return state.user ? state.user.id : 1
}

export function getUsuario(state) {
    return state.user
}
