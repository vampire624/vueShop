<template>
	<div>
		<this-dialog :is-show="isShowCheckDialog" @on-close="checkStatus">
			请检查你的支付状态！
			<div class="button" @click="checkStatus">
				支付成功
			</div>
			<div class="button" @click="checkStatus">
				支付失败
			</div>
		</this-dialog>
		<this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
			购买成功！
		</this-dialog>
		<this-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
			购买失败！
		</this-dialog>

	</div>
</template>
<script>
import Dialog from "@/components/dialog"
export default {
	props: {
		isShowCheckDialog: {
			type: Boolean,
			default: false
		},
		orderId: {
			type: [String, Number]
		}
	},
	components: {
		thisDialog: Dialog
	},
	data () {
		return {
			isShowFailDialog: false,
			isShowSuccessDialog: false
		}
	},
	methods: {
		checkStatus () {
			this.$http.post("/api/checkOrder", {
				orderId: this.orderId
			}).then((res) => {
				this.isShowSuccessDialog = true
			// 这里不能直接isShowCheckDialog置为false，父组件传进来的参数，子组件不能修改，所以需要绑定事件告诉父组件修改prop
				this.$emit("on-close-check-dialog")
			}, (err) => {
				//这里的请求失败逻辑有误，弹窗为支付失败的时候，后端返回支付失败状态，并非http本身请求失败
				this.isShowFailDialog = true
				this.$emit("on-close-check-dialog")
			})
		},
		toOrderList () {
			this.$router.push({path: "/orderList"})
			//通过router的push方法 直接跳转到某一路径
		}
	}

}
</script>

<style scoped>
	
</style>