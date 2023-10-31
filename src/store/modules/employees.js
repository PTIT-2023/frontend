import api from '@/api'
import router from '@/router'

const getDefaultState = () => {
    return {
        comboEmpRoles: [],
        selectedEmpRoleId: null,
        pEmployees: [],
        employee: {}
    };
};

const state = getDefaultState();

const getters = {
    comboEmpRoles(state) {
        return state.comboEmpRoles
    },
    selectedEmpRoleId(state) {
        return state.selectedEmpRoleId
    },
    pEmployees(state) {
        return state.pEmployees
    }
};

const mutations = {
    setComboEmpRoles(state, data) {
        state.comboEmpRoles = data
    },
    setSelectedEmpRoleId(state, data) {
        state.selectedEmpRoleId = data
    },
    setPEmployees(state, pData) {
        state.pEmployees = pData;
    },
};

const actions = {
    async getEmployeeRoles({ commit }) {
        try {
            const res = await api.get(`master/employee-roles`)
            const data = res.data
            if (data.code >= 400) {
                commit("SHOW_NOTIFICATION", data)
                return
            }
            console.log(data.message);
            commit("setComboEmpRoles", data.data);
            commit("setSelectedEmpRoleId", data.data[0]?.id)
        } catch (e) {
            console.log(e)
        }
    },
    async getPEmployees({ commit }, { roleId, page, keyWord }) {
        try {
            const res = await api.get(`employees?roleId=${roleId}&page=${page}&limit=10&keyWord=${keyWord}`)
            const data = res.data
            console.log(data);
            if (data.code >= 400) {
                commit("SHOW_NOTIFICATION", data)
                return
            }
            const pData = res.data.data;
            console.log(res.data.message, pData);
            commit("setPEmployees", pData);
        } catch (e) {
            console.log(e)
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};