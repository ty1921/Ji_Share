// pages/getPDF/getPDF.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options) 
    this.setData({
      order_id: options.order_id
    })
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
      url: 'https://joytour-tyre.com/backend/PDF/examples/example_048.php?type=file&order_id=' + this.data.order_id, // 下载url
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
    let order_id = this.data.order_id
    let url = 'https://joytour-tyre.com/backend/PDF/examples/example_048.php?order_id=' + order_id

    if (!(url && url.length)) {
        return;
    }
    wx.showLoading("文件加载中...");
    wx.downloadFile({
        url: url,
        success: (res) => {
          
            if (res.tempFilePath) {
                wx.openDocument({
                    filePath: res.tempFilePath,
                    showMenu: true,
                    fail: (err) => {
                        console.error(err);
                    },
                    complete: () => {
                        wx.hideLoading();
                    }
                })
            }
        },
        fail: (err) => {
            console.error(err);
            wx.hideLoading();
        }
    })
  },

})