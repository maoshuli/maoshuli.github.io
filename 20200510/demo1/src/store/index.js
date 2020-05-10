import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        list: [
            {
                id: 1,
                task: "解决问题1",
                done: false
            }
        ],
        nextId: 2,
        type: "all"
    },
    mutations: {
        add(state, test) {
            var obj = {
                id: state.nextId,
                task: test,
                done: false
            };
            state.list.push(obj);
            state.nextId++;
        },
        changeDone(state, id) {
            for(let i = 0; i < state.list.length; i++) {
                if(state.list[i].id == id) {
                    state.list[i].done = !state.list[i].done;
                }
            }
        },
        remove(state, id) {
            for (let i = 0; i < state.list.length; i++) {
                if (state.list[i].id == id) {
                    state.list.splice(i, 1);
                }
            }
        },
        changeType(state, type) {
            state.type = type;
        },
        removeDoneFalse(state) {
            let newList = state.list.filter(item => {
                return item.done === false;
            });

            state.list = newList;
        }
    },
    actions: {

    },
    getters: {
        noDoneNum(state) {
            let no = 0;
            for(let i = 0; i < state.list.length; i++) {
                if(state.list[i].done === false) {
                    no++
                }
            }
            return no;
        },
        listFilter(state) {
            let type = state.type;

            switch (type) {
                case "all":
                    return state.list
                    break;
                case "yes":
                    return state.list.filter(item => {
                        return item.done === true;
                    })
                    break;
                case "no":
                    return state.list.filter(item => {
                        return item.done === false;
                    })
                    break;
                default:
                    return state.list;
                    break;

            }
        }
    }
});

export default store;