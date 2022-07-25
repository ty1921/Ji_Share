// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tel = wx.getStorageSync('tel')
    if( !tel || tel == null || tel.length<11 ){
      wx.redirectTo({ 
        url: '/pages/login/login'
      })
      return false
    }

    // this.setData({
    //   nickName : wx.getStorageSync('nickName'),
    //   tel :  tel
    // })

    this.getData( tel )
    
  },
  getData( tel ){
    console.log('获取数据开始',)
    wx.$get({
      url: 'order.php?action=QlistAll&tel=' +  tel,
    }).then(res => {
      const data = res.data
      this.setData({
        list: res.data,
      })
    })
  },
  goto(){
    wx.redirectTo({
      url: '/pages/send/send'
    })
  }
})