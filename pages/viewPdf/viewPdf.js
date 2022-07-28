// pages/viewPdf/viewPdf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdf: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中，请稍候'
    })

    console.log("options-------------------------")
    console.log(options)
    let id = options.order_id
    if(!id || id<= 0 || id == 'undefined'){
      id=3
    }

    this.setData({
      pdf: 'https://joytour-tyre.com/backend/PDF/examples/example_048.php?order_id=' + id
    })

    console.log('url=',this.data.pdf)

    setTimeout(function () {
      wx.hideLoading()
    }, 3000)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})