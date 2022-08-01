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

  onShow: function(){
    wx.hideHomeButton();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.order_id
    if(!id || id<= 0 || id == 'undefined'){
      id=20220730017
      // wx.showToast({  title: '参数错误，请稍候再试！',  icon: 'none' })
      // setTimeout(function(){
      //   wx.redirectTo({
      //     url: '/pages/home/home'
      //   })
      // },2000)
      // return
    }
    this.setData({
      order_id: id,
      path:"/pages/getLogin/getLogin?id=" + id,
      title:"收货成功，请收货！",
      arr_images:[],
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
      url: 'https://joytour-tyre.com/backend/upload.php?action=upload', // 仅为示例，非真实的接口地址
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

      //图片的还原出来
      let str_img = res.data.col10
      if( str_img && str_img.length > 10 ){
        let arr_images = str_img.split('|')        
        console.log( arr_images )

        this.setData({
          arr_images: arr_images,
        })
      }
    })
  },
  viewPdf(){
    wx.redirectTo({
      url: '/pages/getPDF/getPDF?order_id=' + this.data.order_id
    })
  },
  //预览图片，放大预览
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.arr_images // 需要预览的图片http链接列表
    })
  },

  
  fnGetInfo(e){
    console.log('获取手机号')

    let code = e.detail.code
    console.log(code)
 
   
    wx.$get({
      url: 'wx.php?action=tel&code='+code ,
    }).then(res2 => {
      if( res2.code == 1){
        console.log('wx.php=',res2)
        wx.setStorageSync('tel',res2.tel)
            
        //2 确认收货 
        this.Submit()
      }
      else{
        wx.showToast({  title: '获取手机号错误，请重试！',  icon: 'none' })
      }
      
    })
 


    return

  },
  getPhoneNumber (e) {
    console.log(e)
  },
  Submit(){
     
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
  }


})