// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    active: 0,
    active_tab: 0,
    activeName: '1',
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

    this.getData(1)
    
  },
  getData( type ){
    let tel = wx.getStorageSync('tel')
    console.log('获取数据开始', tel)
    
    wx.$get({
      url: 'order.php?action=QlistAll&type='+type+'&tel=' +  tel,
    }).then(res => {
      const data = res.data
      if( type == 1 ){
        this.setData({ list: res.data,  })
      }
      else{
        this.setData({ list2: res.data,  })
      }
    })
  },
  goto(){
    wx.redirectTo({
      url: '/pages/send/send'
    })
  },
  onChangeNav(event) {
    console.log(event)
    this.setData({ active: event.detail });
    if( event.detail.index == 0 ){
      this.getData( 1 )
    }
    else{
      this.getData( 2 )
    }
  },
  onChange2(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  onChangeTab(event) {
    console.log(event.detail)
    this.setData({
      active_tab: event.detail,
    });
    if( event.detail == 1 ){      
      wx.redirectTo({
        url: '/pages/send/send'
      })
    }
    // else if( event.detail == 2 ){      
    //   wx.redirectTo({
    //     url: '/pages/my/my'
    //   })
    // }
  },
  viewPdf(e){
    console.log(e.currentTarget)
    const order_id = e.currentTarget.dataset.id;
    console.log(order_id)

    this.openFile(order_id)
    // wx.redirectTo({
    //     url: '/pages/viewPdf/viewPdf?order_id=' + order_id
    // })
  },
  
  openFile(order_id) {
    let url = 'https://joytour-tyre.com/backend/PDF/examples/example_048.php?order_id=' + order_id

    if (!(url && url.length)) {
        return;
    }
    wx.showLoading("文件加载中...");
    wx.downloadFile({
        url: url,
        success: (res) => {
          
            if (res.tempFilePath) {
              const newPath = res.tempFilePath
              // const filePath = res.tempFilePath
              // let newPath = wx.env.USER_DATA_PATH + '/' + order_id + '.pdf'
              // wx.getFileSystemManager().renameSync(filePath, newPath)
              
                wx.openDocument({
                    filePath: newPath,
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
  //预览图片，放大预览
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: {currentUrl} // 需要预览的图片http链接列表
    })
  },
  preview2(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },

})