 <template>
  <view class="container">
    <view class="logo">
      <image src="/static/login.png" mode="aspectFit" />
    </view>
	<view><p class="log-fount">易阅读</p> </view>
	<view>&nbsp; </view>
    <view class="form">
      <input class="input" type="text" placeholder="用户名" v-model="username" />
      <input class="input" type="password" placeholder="密码" v-model="password" />
	  <view>&nbsp;</view>
      <button class="button" @click="login">登录</button>
    </view>
	<view>&nbsp;</view>
	<view class="regedit">
		<text style="color: cornflowerblue;" @click="redit">还没有账户？点击立即注册</text>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
		uni.request({
					// url: 'http://bailicaicai.cn/news/login?username='+this.username+"&password="+this.password,
					url: 'http://bailicaicai.cn/news/login',
					header: {
					    // 'custom-header': 'hello' //自定义请求头信息
								
					},
					method: 'POST',
					data: {
						userName: this.username,
						passWord: this.password
						
					},
						success: res => {
							if(res.data.code===200){
								uni.setStorageSync('user', res.data.data);
								uni.showToast({
								title:"登录成功",
								duration:2000,
								success() {
								setTimeout(function () {
								uni.switchTab({
								  url: '/pages/news/index' // 替换为你的TabBar页面路径
								});
								}, 100);
								}
								});
								
							}else{
								uni.showToast({
									title: res.data.msg
								})
								
								
							}
					
							},
					fail: () => {
							
					},
				});
		
      // 登录逻辑
    },
	redit(){
	 console.log("进入注册逻辑");	
		uni.navigateTo({
			url:'/pages/ucenter/regedit'
		})
	}
  }
};
</script>

<style>
	@import "@/fountcss/fount.css";
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.log-fount{
	/*    rpxCalcMaxDeviceWidth: 960;
	    rpxCalcBaseDeviceWidth: 375; 
	    rpxCalcIncludeWidth: 750; */
	  font-family:'alibaba';
	  font-size: 60rpx;
}

.input {
  width: 300px;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  width: 200px;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.regedit{
	margin-top: 55rpx;
	text-align: right;
	
	
}
</style>




