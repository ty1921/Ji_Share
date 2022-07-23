// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    path:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options-------------------------")
    console.log(options)
    this.setData({
      id: options.id,
      path:"/pages/getLogin/getLogin?id=" + this.id,
      title:"发货成功，请收货！",
    })
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
      var title=""
      var path=""
      var jsonStr={id:1,name:"测试的好友"}

      
      

      return{
        title: this.title,
        path: this.path, 
        success: function(res) {
          console.log('分享成功')
        },
        fail: function(res) {
          console.log('分享失败')
        }
      }
    }else{//右上角转发菜单
      return{
        title:  this.title,
        path:  this.path,
        success: function(res) {
          console.log('分享成功')
        },
        fail: function(res) {
          console.log('分享失败')
        }
      }
    }
  }
})