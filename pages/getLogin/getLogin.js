const app = getApp()
  
Page({
  data: {
    motto: '获取手机号，准备收货了',
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
    this.getServerUserInfo() 

  

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
    let that = this
    wx.login({
      success: function (res) {
        if (res.code) {
           console.log(1111111111,res)
        }
      }
    })
  },
  fnGetInfo(e){
    console.log('获取手机了')

    console.log(e)

    console.log(e.detail.encryptedData)
    console.log(e.detail.iv) 
    
    wx.$get({
      url: 'demo.php?action=getTel&encryptedData=' + e.detail.encryptedData + '&iv=' + e.detail.iv ,
    }).then(res => {
      console.log('getTel')
      console.log(res)

      const data = res.data
      // this.setData({
      //   total_card: res.total,
      //   list: data
      // })
    })

  },
  getPhoneNumber (e) {
    console.log(e)
  },
  
})
