const getDefaultState = () => {
    return {
        options: {
            title: 'Are you sure?',
            description: 'You cannot undo this action!',
            opened: false,
            cancelText: 'Cancel',
            actionText: 'Yes',
            onYes: () => { }
        }
    };
};

const state = getDefaultState();

const getters = {
    dialogOptions(state) {
        console.log(state.options);
        return state.options;
    },
};

const mutations = {
    setDialogOptions(state, options) {
        state.options = { ...getDefaultState().options, ...options };
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