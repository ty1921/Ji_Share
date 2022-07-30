// pages/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,    
    disabled: false,
    excel:'',
    path: '',
    select_desc:'＋上传Excel',
    progress:0,
    progress_desc:' ＋上传Excel ',
    progress:0,
    active:0,
    images: [],
    images_str: '',
    count: 3,
    addedCount: 0,
    active_tab: 1,
    fileList: [
      // {
      //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      //   name: '图片1',
      //   deletable:true
      // },
    ], 
    steps: [
      {
        text: '① 开始发货',
      },
      {
        text: '② 选择EXCEL',
      },
      {
        text: '③ 上传照片（可选）',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  upload(){
    console.log('点击按钮')
    this.setData({
      loading: true,
    })

    let that =this    
    wx.chooseMessageFile({
      count: 1,
      type: 'file', 
      extension: ['xls', 'xlsx'],
      success (res) {
        if( res.tempFiles[0].size > 1000000 ){
          wx.$alert('文件太大了！请重新选择')
          that.setData({
            disabled: false,
            loading: false, 
          })
          return false
        }
        that.data.excel = res.tempFiles[0].name
   
        that.setData({
          excel:res.tempFiles[0].name,          
          path: res.tempFiles[0].path,
          // progress:100,
          // progress_desc:' 准备发货 ',
          select_desc:'重新选择',
          active: 1,
          disabled: false,
          loading: false, 
        })
        
        console.log('本次选择的文件是=',that.data.excel, res)

        
      }
    })
  },
  afterRead(event) {
    let that = this
    const { file } = event.detail;
    console.log( '上传图片', file )

    // if( file.size > 1000000 ){
    //   wx.$alert('文件太大了！请重新选择')
    //   that.setData({
    //     disabled: false,
    //     loading: false, 
    //   })
    //   return false
    // }

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://joytour-tyre.com/backend/upload.php?action=upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { 
        openid:  wx.getStorageSync('openid'),
        tel: wx.getStorageSync('tel'),
        type: 1,
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

    //0 检查excel
    if( !this.data.path && !this.data.excel ){
      wx.showToast({    title: '请上传Excel！',   icon: 'none'  })
      return false
    }


    //1 提交前，必须先允许订阅消息
    var that = this 
    wx.requestSubscribeMessage({
      tmplIds: ['xNVm55glddqLNUEcUgaz_RzWXWm0JvLzvBzdTWsIpnM'],
      success (res) {
        console.log("wx.requestSubscribeMessage成功了")
        if( res['xNVm55glddqLNUEcUgaz_RzWXWm0JvLzvBzdTWsIpnM'] == "reject" ){
           wx.showToast({    title: '请允许订阅消息后，方可继续操作！',   icon: 'none'  })
          return false
        }

        //开始提交
        that.submit_final()
       },
       fail(res){
        console.log("wx.requestSubscribeMessage失败！！")
        console.log(res)
        wx.showToast({    title: '订阅消息失败，请稍候再试！',   icon: 'none'  })
       }
    })

    
    //----------------------------------------
  },

  submit_final(){
    let images_str = '';

    if( this.data.fileList && this.data.fileList.length > 0 ){
      for (let i = 0; i < this.data.fileList.length; i++) {
        console.log('this.data.fileList[i]',this.data.fileList[i])
        images_str += this.data.fileList[i]['url'] + '|';        
      }
      this.setData({ images_str: images_str });
    }

    //2 上传excel
    wx.uploadFile({
      url: 'https://joytour-tyre.com/backend/excel.php?action=import', // 仅为示例，非真实的接口地址
      filePath: this.data.path,
      name: 'excel',
      formData: { 
        openid:  wx.getStorageSync('openid'),
        tel: wx.getStorageSync('tel'),
        type: 1,
        images: this.data.images_str,
       },
      success(res) {
        console.log( '上传excel的返回', res )

        let datas = JSON.parse(res.data);

        if( datas.code == 1 ){
          wx.$alert('发货成功！');

          setTimeout(function(){
            wx.redirectTo({
              url: '/pages/share/share?order_id=' + datas.order_id
            })
          },2000)
        }
        else{
          if( datas.code == 9 ){
            wx.$alert('Excel除单价和金额外都需填写，请补充全部信息后重试！');
          }
          else{
            wx.$alert('发货失败！ [code:'+datas.code+']');
          }
        }
        
        // console.log( 'datas=', datas )
 
      }, 
    });
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
  
  onChangeTab(event) {
    console.log(event.detail)
    this.setData({
      active_tab: event.detail,
    });
    if( event.detail == 0 ){      
      wx.redirectTo({
        url: '/pages/home/home'
      })
    }
    else if( event.detail == 2 ){      
      wx.redirectTo({
        url: '/pages/my/my'
      })
    }
  },

})