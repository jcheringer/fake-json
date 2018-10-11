import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './user-module'

Vue.use(Vuex)

const myPlugin = store => {
    store.subscribe((mutation, state) => {
        const isPromise = mutation.payload && mutation.payload.then

        if (!isPromise) {
            return
        }

        const success = `${mutation.type}Success`
        const error = `${mutation.type}Error`

        store.hotUpdate({
            mutations: {
                [success] (state, payload) {},
                [error] (state, payload) {}
            }
        })
        
        mutation.payload.then((response) => {
            store.commit(success, response)
        }).catch((response) => {
            store.commit(error, response)
        })
    })
}

export const store = new Vuex.Store({
    plugins: [myPlugin],
    modules: {
        userState: UserModule
    }
})
