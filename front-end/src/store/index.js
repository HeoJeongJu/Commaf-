import { createStore } from "vuex";

export const store = createStore({
    state: {
        choices: []
    },
    mutations: {
        addChoice(state, choice) {
            state.choices.push(choice);
        },
        resetChoices(state) {
            state.choices = [];
        }
    },
    actions: {
        submitChoices({ commit, state }) {
            console.log("Submitting choices:", state.choices);
            commit('resetChoices');
        }
    }
})