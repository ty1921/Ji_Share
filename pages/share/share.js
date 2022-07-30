// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:"",
    path:'',
    info:[],
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options-------------------------")
    console.log(options)
    let id = options.order_id
    if(!id || id<= 0 || id == 'undefined'){
      wx.showToast({  title: '参数错误，请稍候再试！',  icon: 'none' })
      setTimeout(function(){
        wx.redirectTo({
          url: '/pages/home/home'
        })
      },2000)
      return
    }
    this.setData({
      order_id: id,
      path:"/pages/getAction/getAction?order_id=" + id,
      title:"发货成功，请点击确认",
    })

    this.getData(id)
  },
  /**
   * 用户点击右上角分享 
   */
  onShareAppMessage:function(res){
    console.log(res)
    //转发事件来源 ：from （button:页面内按钮分享  menu:右上角转发菜单）
    if(res.from == 'button'){//自定义按钮分享
      //如果form值是button，则target是触发这次转发事件的button，否则为undefined
      //自定义转发内容
      var title=this.data.title
      var path=this.data.path
      var jsonStr={id:1,name:"测试的好友"}

      return{
        title: this.data.title,
        path: this.data.path, 
        success: function(res) {
          console.log('分享成功',title,path)
        },
        fail: function(res) {
          console.log('分享失败',title,path)
        }
      }
    }else{//右上角转发菜单
      return{
        title:  this.data.title,
        path:  this.data.path,
        success: function(res) {
          console.log('分享成功',title,path)
        },
        fail: function(res) {
          console.log('分享失败',title,path)
        }
      }
    }
  },
  getData(order_id){
    console.log('获取数据开始,order_id=',order_id)
    wx.$get({
      url: 'order.php?action=Qlist&order_id=' + order_id ,
    }).then(res => {
      const data = res.data
      this.setData({
        info: res.data,
        list: res.data2
      })
    })
  }
})