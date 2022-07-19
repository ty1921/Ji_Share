// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        showNav: false, // 默认不显示
        showShare: false,
        options: [
        { name: '微信', icon: 'wechat', openType: 'share' },
        // { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        // { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        ],
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // setTimeout(() => {
    //     this.showNav = true;
    //     this.$apply();
    // }, 300);

    return
    wx.downloadFile({ 
        url: "http://62.234.50.235/back.pdf",//pdf地址 例如：http://**.*****.***/ceshi/demo.pdf
        filePath: wx.env.USER_DATA_PATH + "/1.pdf",//wx.env.USER_DATA_PATH 文件系统中的用户目录路径 filepath可有可无
        success(res) {
            if (res.statusCode === 200) {
                const tempFilePath = res.filePath//返回的文件临时地址，用于后面打开本地预览所用
                wx.openDocument({
                    filePath: tempFilePath,
                    showMenu: true,
                    fileType: "pdf",
                    success: function (res) {} 
                })
            } else {
                showAutoError("协议打开失败，请重新打开");
            }
        },
        fail(res) {
            showAutoError("协议下载失败")
        }
    })

  },

  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },
 
})