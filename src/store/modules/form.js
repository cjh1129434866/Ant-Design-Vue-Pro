import router from "../../router";
import Vue from "vue";

const state = {
  step: {
    payAccount: "123456",
    receiverAccount: {
      type: "aliPay",
      number: ""
    }
  }
}

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
}

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await new Vue().axios({
      url: "/api/form",
      method: "post",
      params: payload
    });
    commit("saveStepFormData", payload)
    router.push("/form/step-form/result")
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}