import axios from 'axios'

const initialState = {
    users: [],
    isLoading: false,
    hasError: false
}

const assign = (state, props) => Object.assign(state, props)

const mutations = {
    getUserList: (state) => {
        assign(state, {
            isLoading: true,
            hasError: false
        })
    },
    getUserListSuccess: (state, response) => {
        assign(state, {
            isLoading: false,
            users: response.data
        })
    },
    getUserListError: (state) => {
        assign(state, {
            isLoading: false,
            hasError: true
        })
    }
}

const actions = {
    getUserList: ({ commit }) => {
        const promise = axios.get('https://jsonplaceholder.typicode.com/posts')
        commit('getUserList', promise)
    }
}

export default {
    state: initialState,
    mutations,
    actions
}
