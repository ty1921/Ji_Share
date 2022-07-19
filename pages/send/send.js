// pages/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    excel:'',
    select_desc:'请选择Excel文件',
    progress:0,
    progress_desc:' 上传Excel ',
    progress:0,
    active:0,
    images: [],
    count: 3,
    addedCount: 0,
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true,
        deletable: true,
      },
    ], 
    steps: [
      {
        text: '①',
        desc: '选择EXCEL',
      },
      {
        text: '②（可选）',
        desc: '上传照片',
      },
      {
        text: '③',
        desc: '完成发货',
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
    let that =this    
    wx.chooseMessageFile({
      count: 1,
      type: 'file', 
      extension: ['xls', 'xlsx'],
      success (res) {
        if( res.tempFiles[0].size > 1000000 ){
          wx.$alert('文件太大了！请重新选择')
          return
        }
        that.data.excel = res.tempFiles[0].name
   
        that.setData({
          excel:res.tempFiles[0].name,
          progress:100,
          progress_desc:' 准备发货 ',
          select_desc:'重新选择Excel文件',
          active: 1,
        })
        
        console.log('本次选择的文件是=',that.data.excel)
      }
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  beforeRead(event) {
    const { file, callback } = event.detail;
    callback(file.type === 'image');
  },

})