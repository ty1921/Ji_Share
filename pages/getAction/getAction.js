// pages/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submit_status: false,
    active:0,
    images: [],
    count: 3,
    addedCount: 0,
    fileList: [ ],      
    disabled: true,
    btn: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.order_id
    if(!id || id<= 0 || id == 'undefined'){
      id=3
    }
    this.setData({
      order_id: id,
      path:"/pages/getLogin/getLogin?id=" + id,
      title:"收货成功，请收货！",
    })

    this.getData(id)
  },
  
  afterRead(event) {
    let that = this
    const { file } = event.detail;
    console.log( '上传图片', file )

    if( file.size > 1000000 ){
      wx.$alert('文件太大了！请重新选择')
      that.setData({
        disabled: false,
        loading: false, 
      })
      return false
    }

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://42.193.249.42/backend/upload.php?action=upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { 
        openid:  wx.getStorageSync('openid'),
        tel: wx.getStorageSync('tel'),
        type: 2,
       },
      success(res) {
        // console.log( '上传图片的返回', res.data )
        let datas = JSON.parse(res.data);
 
        // console.log( 'datas=', datas )
 
        // 上传完成需要更新 fileList 
        let fileList = that.data.fileList;

        fileList.push( datas.data );
        that.setData({ fileList });

        console.log( '新的图片数组：', fileList)
      }, 
    });
  },
  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },
  
  submit: function () {

    if( this.data.disabled){
      return false
    }
    let images_str = '';

    if( this.data.fileList && this.data.fileList.length > 0 ){
      for (let i = 0; i < this.data.fileList.length; i++) {
        console.log('this.data.fileList[i]',this.data.fileList[i])
        images_str += this.data.fileList[i]['url'] + '|';        
      }
      this.setData({ images_str: images_str });
    }

    //2 确认收货
    wx.$get({
      url: 'order.php?action=Umx', 
      data: { 
        order_id: this.data.order_id,
        openid:  wx.getStorageSync('openid'),
        tel: wx.getStorageSync('tel'),
        type: 2,
        images: this.data.images_str,
       },
    }).then(res => {
      console.log( '返回', res )

        if( res.code == 1 ){
          this.setData({
            disabled: true,
            btn: '已收货'
          })
          wx.$alert('收货成功！');
        }
        else{
          wx.$alert('收货失败！ [code:'+datas.code+']');
        }
    }) 
  },
  deleteImg(e){
    this.data.fileList.splice([e.detail.index],1)
    this.setData({ fileList: this.data.fileList});
    let img_list=[]
    this.data.fileList.forEach(element => {
      img_list.push(element.url)
    });
    // 删除后的图片传给父组件，父组件setData赋值数据
    this.triggerEvent('dalete', img_list);
  },
  getData(order_id){
    console.log('获取数据开始,order_id=',order_id)
    wx.$get({
      url: 'order.php?action=Qlist&order_id=' + order_id ,
    }).then(res => {
      const data = res.data
      this.setData({
        info: res.data,
        list: res.data2,
      })

      if( data.col9 == 1 ){
        this.setData({
          disabled: false,
          btn: '确认收货'
        })
      }
      else{
        this.setData({
          disabled: true,
          btn: '已收货'
        })
      }
    })
  },
  viewPdf(){
    wx.redirectTo({
      url: '/pages/getPDF/getPDF?order_id=' + this.data.order_id
    })
  }


})