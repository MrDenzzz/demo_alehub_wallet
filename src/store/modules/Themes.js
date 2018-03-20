const state = {
    theme: localStorage.getItem('theme') || 'main'
}

const mutations = {
    SET_THEME(state, theme) {
        state.theme = theme;
        localStorage.setItem('theme', theme)
    }
}

export default {
    state,
    mutations
}