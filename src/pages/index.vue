<template>
  <div class="index-wrap">
    <div class="index-left">
    	<div class="index-left-block">
    		<h2>全部产品</h2>
    		<template v-for="product in productList">
    			<h3>{{product.title}} </h3>
  				<ul>
  					<li v-for="item in product.list">
  						<a :href="item.url">{{item.name}} </a>
              <span class="hot-tag" v-if="item.hot">hot</span>
  					</li>
  				</ul>
  				<div class="hr" v-if="!product.last"></div>
    		</template>
    	</div>
    	<div class="index-left-block lastest-news">
    		<h2>最新消息</h2>
    		<ul>
    			<li v-for="item in newsList">
    				<a href="item.url" class="new-item">{{item.title}} </a>
    			</li>
    		</ul>
    	</div>
    </div>
    <div class="index-right">
      <Slide-show :slides="slides" :inv="invTime"></Slide-show>
    	<div class="index-board-list">
    		<div class="index-board-item" v-for="(item,index) in boardList" :class="[{'line-last': index % 2 !== 0}, 'index-board-' + item.id]">
    			<div class="index-board-item-inner">
    				<h2>{{ item.title}} </h2>
    				<p>{{item.description}}</p>
    				<div class="index-board-button">
    					<a :href="item.href" class="button">立即使用</a>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
import SlideShow from "../components/slideShow"
export default {
  components: {
    SlideShow
  },
  created: function(){
  	this.$http.get("api/newsList")
  		.then((res) => {
  			this.newsList = res.data
  		}, (err) => {
  			console.log(err)
  		})
  },
  data () {
    return {
      invTime: 3000,
      slides: [
        {
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'xxx3',
          href: 'detail/publish'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ],
      productList:{
      	pc:{
      		title: "pc产品",
      		list:[
      			{
      				name: "asus",
      				url: "http://www.asus.com",
              hot: true
      			},
      			{
      				name: "apple",
      				url: "http://www.apple.com"
      			},
      			{
      				name: "hp",
      				url: "http://www.hp.com"
      			},
      			{
      				name: "dell",
      				url: "http://www.dell.com"
      			}
      		]
      	},
      	phone:{
      		title: "移动产品",
      		last: true,
      		list:[
      			{
      				name: "iphone",
      				url: "http://www.iphone.com"
      			},
      			{
      				name: "meizu",
      				url: "http://www.meizu.com"
      			},
				    {
      				name: "xiaomi",
      				url: "http://www.xiaomi.com"
      			},
      			{
      				name: "huawei",
      				url: "http://www.huawei.com"
      			}
      		]
      	}
      },
      newsList: [],
      boardList:[
      	{
      		title: "百度新闻",
      		description: "百度新闻是包含海量资讯的新闻服务平台，真实反映每时每刻的新闻热点。",
      		id: "car",
          href: "https://news.baidu.com"
      	},
      	{
      		title: "百度贴吧",
      		description: "百度贴吧——全球最大的中文社区。贴吧的使命是让志同道合的人相聚。",
      		id: "earth",
          href: "https://tieba.baidu.com"
      	},
      	{
      		title: "百度知道",
      		description: "百度知道 - 全球最大中文互动问答平台",
      		id: "loud",
          href: "https://zhidao.baidu.com" 
      	},
      	{
      		title: "百度音乐",
      		description: "百度音乐是中国第一音乐门户，为你提供海量正版高品质音乐，带给你全新音乐体验。",
      		id: "hill",
          href: "https://music.baidu.com"
      	}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
