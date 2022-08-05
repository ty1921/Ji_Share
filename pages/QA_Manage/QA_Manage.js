// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    active: 0,
    active_tab: 2, 
    activeName: '1',
    emptyData: 'hide',
    arr_img: [],
    arr_index: 0,
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

    this.getData(9)
    
  },
  getData( type ){
    let tel = wx.getStorageSync('tel')
    console.log('获取数据开始', tel)
    
    wx.$get({
      url: 'order.php?action=QlistAll&type='+type+'&tel=' +  tel,
    }).then(res => {
      const data = res.data

      if( res.code==1 && data.length>0 ){
        this.setData({ list: res.data, emptyData: 'hide',  })
      }
      else{
        this.setData({  list: [],  emptyData: '',  })
      }
    
    })
  },
  goto(){
    wx.redirectTo({
      url: '/pages/send/send'
    })
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
    else if( event.detail == 0 ){      
      wx.redirectTo({
        url: '/pages/home/home'
      })  
    }
  }, 
  //预览图片，放大预览
  preview(event) {
    console.log('获取地址了',event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },
  fnDel(event){
    let that = this
    console.log('获取了',event.currentTarget.dataset.order)
    let order_id = event.currentTarget.dataset.order
    wx.showModal({
      title: '操作提醒',
      content: '您确认要删除订单【'+order_id+'】吗?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        
          //删除订单开始      
          wx.$get({
            url: 'order.php?action=Del&order_id='+order_id ,
          }).then(res2 => {
            if( res2.code == 1){ 
              that.getData(9)
              wx.showToast({  title: '删除订单成功',  icon: 'none' })
            }
            else{
              wx.showToast({  title: '删除失败，请稍后再试或联系开发者',  icon: 'none' })
            }
            
          })
  
  
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },
})