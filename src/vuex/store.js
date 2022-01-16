import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex);
let store = new Vuex.Store({
    state:{
        products:[],
        order:[],
        status:[],
        },
    mutations:{
        SET_PRODUCTS:(state,products)=>{
            state.products=products;
        },
        SET_ORDER:(state,order)=>{
            state.order=order;
        },
        SET_STATUS:(state,status)=>{
            state.status=status;
        }
     },
    actions:{
        GET_PRODUCTS_API({commit}){
            return axios('http://localhost:3000/products',{
                method:"GET"
            }).then((products)=>{
                commit('SET_PRODUCTS',products.data);
            })
        },
        GET_ORDER_API({commit}){
                return axios('http://localhost:3000/order',{
                    method:"GET"
                }).then((order)=>{
                    commit('SET_ORDER',order.data);
                })
        },
        GET_STATUS_API({commit}){
            return axios('http://localhost:3000/status',{
                method:"GET"
            }).then((status)=>{
                commit('SET_STATUS',status.data);
            })
        }
    },
    getters:{
        PRODUCTS(state){
        return state.products;
        },
        ORDER(state){
            return state.order;
        },
        STATUS(state){
            return state.status;
        }
    }
    }
);
export default store;