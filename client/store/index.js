import { auth, service } from "~/plugins/feathers-client";

export const state = () => ({});

export const mutations = {};

const commonServiceOptions = {
  idField: "id",
  nameStyle: "path"
};
function crudService(apiResource, options) {
  return service(`api/${apiResource}`, {
    ...commonServiceOptions,
    ...options,
    state: {
      editing: {},
      editingIsValid: undefined
    },

    getters: {
      editingIsValid: state => state.editingIsValid
    },

    actions: {
      editWithId({ commit, getters }, id) {
        const movementType = getters.get(id);
        commit("setEditing", movementType);
      }
    },

    mutations: {
      setEditing(state, movementType) {
        state.editing = movementType;
      },
      updateEditing(state, changes) {
        Object.assign(state.editing, changes);
      },
      setEditingIsValid(state, valid) {
        state.editingIsValid = valid;
      }
    }
  });
}

export const plugins = [
  auth({
    userService: "api/users",
    namespace: "api/auth",
    state: {
      publicPages: ["login", "signup"]
    },
    getters: {
      authenticated: state => !!state.payload
    }
  }),
  service("api/users", commonServiceOptions),
  crudService("movement-type"),
  crudService("movement")
];
