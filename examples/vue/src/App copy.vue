<script>
	export default {
		 globalData: {
			token: null,
		    myProfile: {
				nickName: "李狗蛋",
				userInfo: null
			},
		},
		onLaunch: async function() {
			console.log('App Launch');
			console.log("是否已经授权：",wx.getStorageSync('hadAuthed'))
			let that = this;
			// 注意:将代码放在onLoad方法下
			if (!wx.getStorageSync('hadAuthed')) { 
			  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
			  // An highlighted block
				wx.showModal({
					title: '温馨提示',
					content: '正在请求获取您的个人信息，以后续方便使用本程序！',
				success(res) {
				  if (res.confirm) {
					wx.getUserProfile({
					  desc: "获取你的昵称、头像、地区及性别",
					  success: res => {
						console.log("profile=",res)
						that.globalData.myProfile.UserInfo = res.userInfo
						// app.globalData.userInfo =  data
						wx.setStorageSync('userInfo', res.userInfo)
						wx.setStorageSync('hadAuthed', true)
						// wx.getStorageSync('hadAuthed')
						 //这里可以发起获取token的请求
						// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
						// 所以此处加入 callback 以防止这种情况
						// callback && callback(res);
					  },
					  fail: res => {
						//拒绝授权
						// that.showErrorModal('您拒绝了请求');
						wx.showToast({
						  title: '授权失败',
						  icon: 'none',
						  duration: 1000
						})
						return;
					  }
					})
				  } else if (res.cancel) {
					wx.showToast({
					  title: '授权失败',
					  icon: 'none',
					  duration: 1000
					})
					//拒绝授权 showErrorModal是自定义的提示
					// that.showErrorModal('您拒绝了请求');
					return;
				  }
				}
				})
			}

				if(wx.getStorageSync('hadAuthed')){
					let that = this;
					wx.login({
					  success (res) {
					    if (res.code) {
					      //发起网络请求
						  console.log("success res=",res)
					      wx.request({
					        url: 'http://127.0.0.1:8000/users',
					        data: {
					          code: res.code,
							  nickName: that.globalData.userInfo.nickName,
							  avatarUrl: that.globalData.userInfo.avatarUrl
					        },
							method:'POST',
							success(res){
								 // this.globalData.token = res.data;
								 wx.setStorageSync('token', res.data)
								 console.log("success",res);
							 },
							 fail(res){  
								 console.log('fail',res)
							 },
							 complete(res){   
								  console.log('complete',res)
								}
					      })
					    } else {
					      console.log('登录失败！' + res.errMsg)
					    }
					  }
					})
				}

			// await wx.getUserInfo({
			//   success: function(res) {
			//     var userInfo = res.userInfo
			//     var nickName = userInfo.nickName
			//     var avatarUrl = userInfo.avatarUrl
			//     var gender = userInfo.gender //性别 0：未知、1：男、2：女
			//     var province = userInfo.province
			//     var city = userInfo.city
			//     var country = userInfo.country
			//   }
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onShareAppMessage: function (res) {
			console.log("share message")
		    return {
		      title: '自定义转发标题',
		      path: 'pages/single/single?id=123'
		    }
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/dist/common/index.wxss";
</style>
<!-- const arr = document.querySelectorAll("#collection>li>.questionWrapper") 
const mycollect = []
const num =0
for(let item in arr){
    if(arr.hasOwnProperty(item)){
        const questions = arr[item].querySelectorAll(".question")
        const answers = arr[item].querySelectorAll(".answer")
        for(let q in questions){
        }
        const ansArr =[]
        for(let ans of answers){
            ansArr.push([ans.innerText,ans.getAttribute("value")])
        }
        mycollect.push({
            question:{
                text:questions[0].innerText
            },
            answers:ansArr
        })
    }
} -->
<!-- github.com 里面搜索 头脑王者 -->