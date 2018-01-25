import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Detail from "@/pages/detail"
import OrderList from "@/pages/orderList"

import Count from "@/pages/details/count"
import Publish from "@/pages/details/publish"
import Forecast from "@/pages/details/forecast"
import Analysis from "@/pages/details/analysis"

Vue.use(Router)
let router = new Router({
	mode: "history",
	  	routes: [
	    {
	        path: '/',
	        name: 'Index',
	        component: Index
	    },
	    {
	    	path: "/orderList",
	    	name: "OrderList",
	    	component: OrderList
	    },
	    {
	    	path: "/detail",
	    	name: "Detail",
	    	redirect: "/detail/analysis",
	    	component: Detail,
	    	children: [
	    		{
	    			path: "count",
	    			// 子路由路径直接写，无需写父路由
	    			component: Count
	    		},
	    		{
	    			path: "publish",
	    			component: Publish
	    		},
	    		{
	    			path: "forecast",
	    			component: Forecast
	    		},
	    		{
	    			path: "analysis",
	    			component: Analysis
	    		}
	    	]
	    }
	]
})
export default router 
