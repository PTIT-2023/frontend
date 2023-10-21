/*
 * State: properties to store
 */
const state = {
    notificationDisplayed: false,
    text: "",
    type: "",
    refNotification: null
};

/*
 * Mutations (Setters): Setters of properties defined in state
 */
const mutations = {
    SHOW_NOTIFICATION(state, { code, message }) {
        // console.log('SHOW_NOTIFICATION', text, SVGUnitTypes);
        state.notificationDisplayed = true;
        state.text = message;
        if (code === 200 || code === 201) {
            state.type = 'success';
        }
        else {
            state.type = 'error';
        }
    },

    RESET_NOTIFICATION(state) {
        console.log('RESET_NOTIFICATION');
        state.notificationDisplayed = false;
        state.text = "";
        state.type = "";
    },

    SET_REF_NOTIFICATION(state, data) {
        console.log('SET_REF_NOTIFICATION', data);
        state.refNotification = data;
    }
};

/*
 * Getters: Getters of properties defined in state
 */
const getters = {
    /*
     * Getter for notificationDisplayed
     */
    notificationDisplayed(state) {
        return state.notificationDisplayed;
    },

    /*
     * Getter for text
     */
    getNotificationText(state) {
        return state.text;
    },

    /*
     * Getter for type
     */
    getNotificationType(state) {
        return state.type;
    },

    /*
     * Getter for refNotification
     */
    getRefNotification(state) {
        return state.refNotification;
    }
};

/*
 * Actions: List of methods to fetch, update or delete data
 */
const actions = {
    sendNotification({ commit }, notifData) {
        commit("SHOW_NOTIFICATION", notifData);
    },

    resetNotification({ commit }) {
        commit("RESET_NOTIFICATION", {});
    },

    refNotification({ commit }, data) {
        commit("SET_REF_NOTIFICATION", data);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};