const app = getApp()
  
Page({
  data: {
    tel:'',
    password:'',
    motto: '授权，准备发货',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  }, 
  onLoad() {
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
 
    //获取手机 
    let tel = wx.getStorageSync('tel')

    if( tel.length == 11 ){
      //跳走
      // this.setData({
      //   motto: '用户已授权，正在跳转',
      // }) 

      // wx.showLoading({
      //   title: '正在跳转',
      // }) 

      // setTimeout(function(){
      //   wx.redirectTo({
      //     url: '/pages/send/send'
      //   })
      // },1500)
      
    }
    else{  
      
    }

  

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  /**
   * 获取openid、userToken
   */
  getServerUserInfo: function (e) {
    
  },
  fnGetInfo(e){
    console.log('获取手机号')
    console.log(e)

    let msg = e.detail.errMsg
    
    if( msg == "getPhoneNumber:fail user deny" ){
      wx.$alert('需要授权获取手机号才能发货！')
      return
    }

    
    if (!/^1[3-9]\d{9}$/.test(tel)) {
      wx.showToast({  title: '请输入正确的手机号！',  icon: 'none' })
      return false;
    }

    if (!/^\d{6}$/.test(yzm)) {
      wx.showToast({  title: '请输入6位数字验证码！',   icon: 'none'})
      return false;
    }

    console.log(e.detail.encryptedData)
    console.log(e.detail.iv) 
    
    let that = this
    wx.login({
      success: function (res) {
        if (res.code) {
                  
            wx.$get({
              url: 'wx.php?code='+ e.detail.code +'&encryptedData=' + encodeURIComponent(e.detail.encryptedData) + '&iv=' + e.detail.iv ,
            }).then(res => {
              console.log('getTel')
              
              let tel = res.data.phone_info.phoneNumber
              if( !tel ){
                tel = res.data.phone_info.purePhoneNumber
              }

              //存储手机
              wx.setStorageSync('tel', tel)

              //跳到发货页

            })
        }
      }
    })

    

  },
  getPhoneNumber (e) {
    console.log(e)
  },
  bindTelInput(e){
    this.setData({
      tel: e.detail.value
    })
  },
  bindPwdInput(e){
    this.setData({
      password: e.detail.value
    })
  }
})
