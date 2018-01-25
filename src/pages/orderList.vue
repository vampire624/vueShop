<template>
	<div class="order-wrap">
		<div class="order-list-choose">
			<div class="order-list-option">
				选择产品：
				<v-selection :selections="products" @on-change="productChange"></v-selection>
			</div>
			<div class="order-list-option">
				开始日期：
				<vue-datepicker-local v-model="startDate"></vue-datepicker-local>
			</div>
			<div class="order-list-option">
				结束日期：
				<vue-datepicker-local v-model="endDate"></vue-datepicker-local>
			</div>
			<div class="order-list-option">
				关键词：
				<input type="text" v-model.lazy="query" class="order-query">
			</div>
		</div>
		<div class="order-list-table">
			<table>
				<tr>
					<th v-for="head in tableHeads" @click="changeOrder(head)" :class="{active: head.active}">{{ head.label }}</th>
				</tr>
				<tr v-for="item in tableData">
					<td v-for="head in tableHeads">
						{{ item[head.key] }}
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import VSelection from "@/components/selection"
import VueDatepickerLocal from "vue-datepicker-local"
export default {
	components: {
		VSelection,
		VueDatepickerLocal
	},
	data () {
		return {
			startDate: new Date(),
			endDate: new Date(),
			query: "",
			productId: 0,
			products: [
	        {
	          label: '数据统计',
	          value: 0
	        },
	        {
	          label: '数据预测',
	          value: 1
	        },
	        {
	          label: '流量分析',
	          value: 2
	        },
	        {
	          label: '广告发布',
	          value: 3
	        }
	      	],
	      	tableHeads: [
	      		{
	      			label: "订单号",
	      			key: "orderId",
	      			active: false
	      		},
	      		{
	      			label: "购买产品",
	      			key: "product",
	      			active: false
	      		},
	      		{
	      			label: "版本类型",
	      			key: "version",
	      			active: false
	      		},
	      		{
	      			label: "有效时间",
	      			key: "period",
	      			active: false
	      		},
	      		{
	      			label: "购买日期",
	      			key: "date",
	      			active: false
	      		},
	      		{
	      			label: "数量",
	      			key: "buyNum",
	      			active: false
	      		},
	      		{
	      			label: "订单号",
	      			key: "amount",
	      			active: false
	      		}
	      	]
		}
	},
	computed: {
		//通过计算属性 返回vuex数据中心的getters方法 更新数据
		tableData () {
			return this.$store.getters.getOrderList
		}
	},
	methods: {
		productChange (obj) {
			this.productId = obj.value
			// this.getTableData()
			this.$store.dispatch("syncParams",{
				key: "productId",
				value: this.productId
			})
			this.$store.dispatch("fetchOrderList")
		},
		// getTableData () {
		// 	let reqParam = {
		// 		query: this.query,
		// 		productId: this.productId,
		// 		startDate: this.startDate,
		// 		endDate: this.endDate
		// 	}
		// 	this.$http.get("/api/getOrderList", reqParam).then( (res) => {
		// 		this.tableData = res.data.list
		// 	}, (err) => {
		// 		console.log(err)
		// 	})
		// },
		changeOrder (head) {
			for(let obj of this.tableHeads){
				if(obj.key === head.key){
					obj.active = true
				}else{
					obj.active = false
				}
			}
		}
	},
	watch: {
		query () {
			// this.getTableData()
			this.$store.dispatch("syncParams",{
				key: "query",
				value: this.query
			})
			this.$store.dispatch("fetchOrderList")
		},
		startDate () {
			// this.getTableData()
			this.$store.dispatch("syncParams",{
				key: "startDate",
				value: this.startDate
			})
			this.$store.dispatch("fetchOrderList")
		},
		endDate () {
			// this.getTableData()
			this.$store.dispatch("syncParams",{
				key: "endDate",
				value: this.endDate
			})
			this.$store.dispatch("fetchOrderList")
		}
	},
	mounted () {
		this.$store.dispatch("fetchOrderList")
	}
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}	
</style>