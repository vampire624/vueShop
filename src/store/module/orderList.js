import Vue from "vue"

const state = {
	orderList: [],
	params: {}
}

const getters = {
	getOrderList: state => state.orderList
}

const actions = {
	fetchOrderList ({commit, state}){
		Vue.http.post("/api/getOrderList", state.params)
		.then( (res) => {
			commit("updateOrderList", res.data.list)
		}, (err) => {
			console.log(err)
		})	
	},
	syncParams (context, params) {
		context.commit("updateParams", params)
	}
}

const mutations = {
	updateOrderList (state, payload) {
		state.orderList = payload
	},
	updateParams (state, payload) {
		state.params[payload.key] = payload.value
		// 采用解构赋值
		// state.params[key] = value
	}
}
export default {
	state,
	getters,
	actions,
	mutations	
}