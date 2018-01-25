import Vue from "vue"
import Vuex from "vuex"
import orderList from "./module/orderList"

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		orderList
	}
})