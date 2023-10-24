const getDefaultState = () => {
    return {
        opened: false
    };
};

const state = getDefaultState();

const getters = {
    addImageDialogOpened(state) {
        return state.opened;
    },
};

const mutations = {
    setAddImageDialogOpened(state, opened) {
        console.log(state.opened);
        state.opened = opened
    },
};

const actions = {
};

export default {
    state,
    getters,
    mutations,
    actions
};