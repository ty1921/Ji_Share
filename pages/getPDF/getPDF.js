// pages/getPDF/getPDF.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.fnShare()
  },
  fnShare(){

    wx.downloadFile({
      url: 'http://192.168.31.158/API/New/PDF/examples/example_048.php?id=1&type=file', // 下载url
      success (res) {
        // 下载完成后转发
        wx.shareFileMessage({
          filePath: res.tempFilePath,
          success() {},
          fail: console.error,
        })
      },
      fail: console.error,
    })
 
    
  },  
  fnView(){
    // wx.navigateTo({
    //   url:'viewPdf?id=1'  
    //   //'http://192.168.31.158/API/New/PDF/examples/example_048.php?id=1',
    // })

    wx.redirectTo({
      url: '/pages/viewPdf/viewPdf?id=1'
    })
    
  }



})