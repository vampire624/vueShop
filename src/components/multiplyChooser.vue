<template>
	<div class="chooser-component">
		<ul class="chooser-list">
			<li v-for="(item, index) in selections" :title="item.label" @click="toggleSelection(index)" :class="{active: checkActive(index)}">{{ item.label}}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		selections: {
			type: Array,
			default () {
				return [{
					label: "test",
					value: 0
				}]
			}
		}
	},
	data () {
		return {
			nowIndexes: []
		}
	},
	methods: {
		toggleSelection (index) {
			let idx = this.nowIndexes.indexOf(index)
			if(idx === -1 ){
				this.nowIndexes.push(index)
			}else{
				this.nowIndexes.splice(idx,1)
			}
			let nowObjArray = []
			for(let i in this.nowIndexes){
				nowObjArray.push(this.selections[this.nowIndexes[i]])
			}
			this.$emit("on-change", nowObjArray)
		},
		checkActive (index) {
			return this.nowIndexes.indexOf(index) !== -1
		}
	}
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}	
</style>