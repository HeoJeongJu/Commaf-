import { createStore } from "vuex";
import axios from "axios";

export const store = createStore({
    state: {
        coffee: {},
        recommendation: {},
        isEditMode: false
    },
    mutations: {
        setCoffee(state, coffee) {
            state.coffee = coffee;
        },
        setRecommendation(state, recommendation)  {
            state.recommendation = recommendation;
        },
        setEditMode(state) {
            state.isEditMode = !state.isEditMode;
        },
        addFlavor(state, flavor) {
            if (!state.coffee.flavor_profile) {
                state.coffee.flavor_profile = [];
            }
            state.coffee.flavor_profile.push(flavor);
        },
        addGrinderOption(state, grind) {
            if (!state.coffee.grind_option) {
                state.coffee.grind_option = [];
            }
            state.coffee.grind_option.push(grind);
        }
    },
    actions: {
        addFlavor({ commit }, flavor) {
            commit('addFlavor', flavor);
        },
        addGrinderOption({ commit }, grind) {
            commit('addGrinderOption', grind);
        },
        async fetchCoffee({ commit }, coffeeName) {
            try {
                const res = await axios.get(`http://localhost:3001/coffee/${coffeeName}`);
                commit('setCoffee', res.data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchRecommendation({ commit, state }) {
            try {
                const coffeeName = state.coffee.name;
                const res = await axios.get(`http://localhost:3001/recommendations/${coffeeName}`);
                commit('setRecommendation', res.data);
            } catch (error) {
                console.error(error);
            }
        },
        setEditMode({ commit }) {
            commit('setEditMode');
        },
        async updateCoffee({ commit, state }, updatedFields) {
            try {
                console.log("Submitting:", updatedFields);
                const res = await axios.patch(`http://localhost:3001/admin/item/${state.coffee.name}`, updatedFields, { withCredentials: true});
                commit('setCoffee', res.data);
            } catch (error) {
                console.error(error);
            }
        },
    }
})