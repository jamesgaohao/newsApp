<template>
	<view></view>&nbsp;<view></view>
	<view class="title">
		 <text class="title">用户信息</text>
	</view>
	
  <view class="container">
    <view class="user-info">
      <text>用户名：{{ currentUser.username }}</text><view></view>&nbsp;<view></view>
<!--      <text>邮箱：{{ currentUser.email }}</text> -->
    </view>
	<view></view>&nbsp;<view></view>
    <view class="password-change">
      <text class="section-title">修改密码</text>
	 <view></view>&nbsp;<view></view>
      <input class="input" type="password" v-model="oldPassword" placeholder="当前密码">
      <input class="input" type="password" v-model="newPassword" placeholder="新密码">
      <input class="input" type="password" v-model="confirmPassword" placeholder="确认新密码">
	  <view></view>&nbsp;<view></view>
      <button class="confirm-btn" @click="changePassword">确认修改</button>
    </view>
	<view></view>&nbsp;<view></view>
    <view class="subscription">
      <text class="section-title">订阅管理</text>
	  	<view></view>&nbsp;<view></view>
      <view class="subscription-item" v-for="(subscription, index) in subscriptionList" :key="index">
			<view></view>&nbsp;<view></view>
        <text class="subtext">{{ subscription.subscribeName }}</text>
			<view></view>&nbsp;<view></view>
        <switch  class="switch" :checked="subscription.checked" @change="toggleSubscription(index)"></switch>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentUser: {
        username: '张三',
        email: 'zhangsan@example.com'
      },
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
	  subscriptionSource: [ ],
      subscriptionList: [
        { subscribeName: '社会(Society)' },
        { subscribeName: '财经(Finance)' },
        { subscribeName: '娱乐(Entertainment)'},
		{ subscribeName: '科技(Technology)' },
		{ subscribeName: '国际(International)'},
		{ subscribeName: '国内(Domestic)' },
		{ subscribeName: '军事(Military)' }
      ]
    };
  },
  created() {
  	this.requestParams = {
		sourcePassword: this.oldPassword,
		passWord: this.newPassword
  	};
  },
  onShow(){
      const user = uni.getStorageSync('user');
	  this.currentUser=user;
  },
  methods: {
	  getdatasource(){
		 // 获取所有订阅列表
		 this.getsubscriblist();
		  // 获取用户订阅
		 this.getusersub();
		 
		 console.log('---------map方法--------')
		   console.log(this.subscriptionList)
		 for(const item of this.subscriptionList)	{
		 		 const found =  this.subscriptionSource.find(sourceItem => sourceItem === item.id);
		 		   if(found){
		 			   item.checked=true;
		 		   }else{
		 			   item.checked=false;
		 		   }
		 }  
		  
	  },
	  getusersub(){
		 
		  const user = uni.getStorageSync('user');
		 
		 // 初始化获取新闻订阅列表
		 uni.request({
		     url: 'http://bailicaicai.cn/news/subscribe/getUserSub', //仅为示例，并非真实接口地址。
			 method: 'GET',
			 data: {
				 name: user.username
			 },
		     success: (res) => {
		         console.log(res.data);
				   if(res.data.code===200){
					  this.subscriptionSource=res.data.data.sub; 
				   }else{
					   // uni.showToast({
					   // title:res.data.msg,
					   // duration:2000,
					   // success() {
					   // setTimeout(function () {
					   // uni.navigateTo({
					   //   url: '/pages/ucenter/login' // 替换为你的TabBar页面路径
					   // });
					   // }, 1000);
					   // }
					   // });
				   }
				    console.log("subscriptionSource=====");
		 			  
		 			  console.log(this.subscriptionSource);
		     }
		 });
		 
	 },
 async 	getsubscriblist(){
		// 初始化获取新闻订阅列表
	await uni.request({
		    url: 'http://bailicaicai.cn/news/subscribe/getList', //仅为示例，并非真实接口地址。
		    header: {
		        // 'custom-header': 'hello' //自定义请求头信息
		    },
		    success: (res) => {
		        console.log(res.data);
					  this.subscriptionList=res.data.data;
					   console.log("subscriptionList=====");
					  console.log(this.subscriptionList);
		    }
		});
		
	},  
    changePassword() {
      if (this.oldPassword === '' || this.newPassword === '' || this.confirmPassword === '') {
        uni.showToast({ title: '密码不能为空', icon: 'none' });
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        uni.showToast({ title: '新密码与确认密码不一致', icon: 'none' });
        return;
      }
	  
	  uni.request({
	    url: 'http://bailicaicai.cn/news/updateUser', // 请求的URL
	    method: 'POST', // 请求方法为POST
		header:{
			 'content-type': 'application/json'
		},
	    data: {
	      sourcePassword: this.oldPassword,
	      passWord: this.newPassword
	    }, // 请求参数数据
	    success: function (res) {
	      console.log(res.data); // 请求成功的回调函数，可通过res.data获取服务器返回的数据
		   uni.showToast({ title: '密码修改成功', icon: 'success' });
	    },
	    fail: function (error) {
	      console.log(error); // 请求失败的回调函数，可输出错误信息
	    }
	  });
	  // uni.request({
	  //     url: 'http://bailicaicai.cn/news/updateUser', //仅为示例，并非真实接口地址。
		 //  method: 'POST'
	  //     data: this.requestParams,
	  //     header: {
	  //         'content-type': 'application/json' //自定义请求头信息
	  //     },
	  //     success: (res) => {
	  //         console.log(res.data);
   //            uni.showToast({ title: '密码修改成功', icon: 'success' });
	  //         // this.text = 'request success';
	  //     }
	  // });
    },
    toggleSubscription(index) {
		 console.log('switch1 发生 change 事件，携带值为', this.subscriptionList[index].checked);
	 // 校验确认	
      this.subscriptionList[index].checked = !this.subscriptionList[index].checked;
	  if( this.subscriptionList[index].checked){
		  console.log("开启")
		  this.subscriptionSource.push(this.subscriptionList[index])
		  
		 
		   console.log(this.subscriptionSource)
		  
	  }else{
		   console.log("关闭")
		   // 获取下标
		    const targetIndex = this.subscriptionSource.findIndex(item => item.subscribeName === this.subscriptionList[index].subscribeName);
			if (targetIndex !== -1) {
				// 删除对象
			    this.subscriptionSource.splice(targetIndex, 1);
			}
		    console.log(this.subscriptionSource)
	  }
	  
	  // 更新 用户订阅
	if (this.subscriptionSource.length === 0) {
	    console.log("subscriptionSource is empty.");
	} else {
	    console.log("subscriptionSource is not empty.");
		const subscriptionNames = this.subscriptionSource.map(item => item.subscribeName);
		const resultString = subscriptionNames.join(',');
		  console.log('结果'+resultString);
	}
	  const sub =  this.subscriptionList;
	  console.log(sub);
    }
  }
};
</script>

<style>
@import "@/fountcss/fount.css";
.container {
  padding: 20rpx;
}

.user-info,
.password-change,
.subscription {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 45rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.input {
  width: 80%;
  margin-bottom: 10rpx;
  padding: 5rpx;
  border-radius: 5rpx;
  border: 1px solid whitesmoke;
  height: 45px;
  
}
.subtext{
	font-family:'alibaba';
	
	
}

.confirm-btn {
  background-color: #409eff;
  color: white;
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
}

.subscription-item {
  display: flex;
  justify-content: space-between;
  
   /* text-align:left; */
  align-items: center;
  margin-bottom: 10rpx;
  
}
.title {
	text-align: center;
	font-size: 50rpx;
	 background-color: white;
	
}

.switch {
  margin-left: 10rpx;
}
</style>
