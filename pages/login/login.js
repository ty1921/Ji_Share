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
    

    let openid = wx.getStorageSync('openid')
    if( !openid ){ 
        let that = this
        wx.login({
          success: function (res) {

            console.log('code=',res)
            if (res) {
              wx.$get({
                url: 'wx.php?code='+res.code ,
              }).then(res2 => {
                console.log('wx.php=',res2)
                const data = res2
                wx.setStorageSync('openid',res2)
              })
            }
          }
        })
    }

return

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

        wx.redirectTo({
          url: '/pages/home/home'
        })
       
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
        wx.setStorageSync('userInfo', res.userInfo );
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


    console.log(e.detail.encryptedData)
    console.log(e.detail.iv) 
  
    //登录
    this.loginSubmit()
    return
   

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
  },
  loginSubmit(){


    wx.$post({
      url: 'users.php?action=login',
      data:{
        tel: this.data.tel,
        password: this.data.password,
      },
    }).then(res => {
      console.log(res)
      if(res.code== 1){
        wx.$alert('登录成功！')

        wx.setStorageSync('tel', this.data.tel )

        setTimeout(function(){
          wx.redirectTo({
            url: '/pages/home/home'
          })
        },1500)
      }
      this.setData({
        info: res.data,
        list: res.data2
      })
    })
  }
})
