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

  
    // this.setData({
    //   pdf: url
    // })

    this.openFile(url)

    console.log('url=',this.data.pdf)

    setTimeout(function () {
      wx.hideLoading()
    }, 3000)

  },
  openFile(url) {
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
}
 
})