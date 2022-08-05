// pages/QA_Manage_Mx/QA_Manage_Mx.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    subType: 0,
    new: 0,

    card_no: '',
    vin: '',
    date: '',
    brand: '',
    type: '',
    product: '',
    channel: '',
    product_select: '',
    brand_select:'',
    type_select:'',
    brand_other:'',
    channel_other:'',

    box_hide: 'hide',
    brand_hide: 'hide',
    channel_hide: 'hide',
    channel_tips: '',
    array_channel_tips: ['请填写包含城市的具体门店名称', '请填写 包含城市的具体门店名称', '请填写收货城市', '请填写具体购买渠道'],

    array_channel: ['4S店', 'PZero World', '京东自营旗舰店', '其他'], 

    array_brand: ['Porsche', 'MercedesBenz', 'LandRover', '其他品牌'],
    array_type:  [],
    array_type1: ['718', '911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
    array_type2: ['EClass', 'GClass', 'GLEClass', 'GLSClass', 'MaybachSClass', 'SClass'],
    array_type3: ['发现5', '揽胜揽胜运动', '揽胜运动', '卫士', '星脉'],
    array_type4: ['其他型号'],

    multiArray: [['锻造轮毂', '锻造轮毂套装'], ['23英寸', '22英寸', '21英寸', '20英寸', '19英寸', '18英寸', '17英寸']],
    multiIndex: [0, 0],
    arrColumn0: ['23英寸', '22英寸', '21英寸', '20英寸', '19英寸', '18英寸', '17英寸'],
    arrColumn1: ['23英寸', '22英寸', '21英寸', '20英寸', '19英寸', '18英寸', '17英寸'],
  },


   /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   if( wx.getStorageSync('flush') == 1 ){
  //     this.onLoad();
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
    if( !options.card_no ){
      options.card_no= '20220217013647752865'; 
    }
    wx.$get({ 
      url: 'card.php?action=Qmx&card_no=' + options.card_no,
    }).then(res => {
      const data = res.data
      this.setData({ 
        card: data,
        pic1: data.pic1,
        pic2: data.pic2,
        vin: data.vin,
        car_num: data.car_num,
        date: data.get_date,
        brand_select: data.brand,
        type_select: data.type,
        product_select: data.product,
        channel_select: data.channel,        
      })

      //如果质保卡已经生效，修改按钮提醒
      if( data.status == 1 ){
        this.setData({  new : 1 }) 
      }

      let tmp_image1 = wx.getStorageSync('tmp_image1');
      let tmp_image2 = wx.getStorageSync('tmp_image2');

      if( tmp_image1 ){
        this.setData({  pic1 : tmp_image1, })
      }
      if( tmp_image2 ){
        this.setData({  pic2 : tmp_image2, })
      }
   

      if(data.brand == '其他品牌' ){
        this.setData({
          brand_hide: '',
          brand_other: data.brand_other,
        })
      }

      if(data.channel ){
        this.setData({
          channel_hide: '',
          channel_other: data.channel_other,
        })
      }
    })

    let openid = wx.getStorageSync('openid'); 

    this.setData({
      openid: openid,
      card_no: options.card_no,
      img_header: app.globalData.img_header,
      img_logo0: app.globalData.img_logo0,
      src: app.globalData.src,
      array_type: this.data.array_type1
    })

  }, 

  bindDateChange: function (e) {
    this.setData({      date: e.detail.value    })
  },
  PickerChange2: function (e) {
    this.setData({      product_str: this.data.array_product[ e.detail.value ],  product:e.detail.value    })
  },
  PickerChange3: function (e) {
    this.setData({      
      channel_select: this.data.array_channel[ e.detail.value ],  
      channel:e.detail.value,
      channel_hide: '',
      channel_tips: this.data.array_channel_tips[e.detail.value]
    })
  },
  fnVinInput(e) {
    this.setData({  vin: e.detail.value    });
  },
  car_numInput(e) {
    this.setData({  car_num: e.detail.value    });
  },
  fnOtherInput(e) {
    this.setData({  brand_other: e.detail.value    });
  },
  fnOther2Input(e) {
    this.setData({  channel_other: e.detail.value    });
  },


  fnClose(){
    //返回到上一页
    // wx.navigateTo({
    wx.redirectTo({
      url: '/pages/QA_Manage/QA_Manage'
    })
  },

  //生成质保卡
  manageForm: function () {
    this.setData({ subType: 1  });
    this.fnSave();
  },

  //保存草稿
  manageForm_pre: function () {
    this.setData({ subType: 2  });
    this.fnSave();
  },

  //提交接口操作
  fnSave() {
    let _this = this;
    let type = _this.data.subType;
    console.log('提交form, type='+ type );
    var card_no = _this.data.card_no;
    var vin = _this.data.vin;
    var car_num = _this.data.car_num;
    var date = _this.data.date;
    var brand = _this.data.brand_select;
    var btype = _this.data.type_select;
    var product = _this.data.product_select;
    var channel = _this.data.channel_select;
    var brand_other = _this.data.brand_other;
    var channel_other = _this.data.channel_other;
    let tmp_image1 = wx.getStorageSync('tmp_image1');
    let tmp_image2 = wx.getStorageSync('tmp_image2'); 


    //如果是生成，效验数据
    if( type == 1 ){
      if( !date ){
        wx.showToast({ title: '请选择日期！', icon: 'none' })
        return false;
      }
      if( !vin ){
        wx.showToast({ title: '请输入车架号！', icon: 'none' })
        return false;
      }
      // if( !car_num ){
      //   wx.showToast({ title: '请输入车牌号！', icon: 'none' })
      //   return false;
      // }
      
      if( !brand ){
        wx.showToast({ title: '请选择品牌！', icon: 'none' })
        return false;
      }
      else if( brand == '其他品牌')
      {
        if( !brand_other )
        {
          wx.showToast({ title: '请输入具体的品牌和车型！', icon: 'none' })
          return false;
        }
      }

      if( !btype ){
        wx.showToast({ title: '请选择型号！', icon: 'none' })
        return false;
      }

      if( !product ){
        wx.showToast({ title: '请选择产品！', icon: 'none' })
        return false;
      }
      if( !channel ){
        wx.showToast({ title: '请选择购买渠道！', icon: 'none' })
        return false;
      }
      if( !channel_other ){
        wx.showToast({ title: '请输入详细的购买渠道', icon: 'none' })
        return false;
      }
      
    } 

    if( !tmp_image1 && !tmp_image2 ){
      //不传图
      _this.fnSubForm();
    }else if( tmp_image1 && !tmp_image2 ){
      //只传第一张
      _this.fnUpload1( tmp_image1, tmp_image2, 1 );
    }else if( !tmp_image1 && tmp_image2 ){ 
      //只传第二张
      _this.fnUpload2();
    }else if( tmp_image1 && tmp_image2 ){
      //两张都传
      _this.fnUpload1( tmp_image1, tmp_image2, 2 );
    }
    
  },

  fnSubForm(){
    var type =  this.data.subType;
    var card_no = this.data.card_no;
    var vin = this.data.vin;
    var car_num = this.data.car_num;
    var date = this.data.date;
    var brand = this.data.brand_select;
    var btype = this.data.type_select;
    var product = this.data.product_select;
    var channel = this.data.channel_select;
    var brand_other = this.data.brand_other;
    var channel_other = this.data.channel_other;
    let tmp_image1 = this.data.pic1;
    let tmp_image2 = this.data.pic2; 

    wx.$get({
      url: 'manage.php?action=Umx&card_no=' + card_no + '&vin=' + vin + '&car_num=' + car_num + '&date=' + date 
              + '&brand=' + brand + '&btype=' + btype + '&product=' + product + '&channel=' + channel 
              + '&type=' + type + '&brand_other=' + brand_other + '&channel_other='+channel_other 
              + '&pic1='+tmp_image1+ '&pic2='+tmp_image2 ,
    }).then(res => {
      if( res.code == 1 ){
        // wx.showToast({  title: '操作成功！',icon: 'none'  });
        wx.setStorageSync('tmp_image1','');
        wx.setStorageSync('tmp_image2',''); 
        // this.fnClose
        if( type == 1 ){
          this.fnShowMsg( '质保卡已变更', card_no );
        }else{
          this.fnShowMsg( '质保卡草稿已保存', card_no );
        }
        return;
      }else if( res.code == 2 ){

      }else{
        wx.showToast({
          title: '系统错误，请稍候再试！',
          icon: 'none'
        })
      }
    })
  }, 

  fnUpload1( tmp_image1, tmp_image2, preSubmit ){
    let _this = this;
    wx.uploadFile({
      url: app.globalData.host + 'card.php?action=upload&type=1&openid=' + _this.data.openid,
      filePath: tmp_image1,
      name: 'file',
      success (res){
        console.log(res)
        let _res = JSON.parse(res.data);
        console.log( _res.src )
        _this.setData({  pic1: _res.src  })

        if( preSubmit == 2 ){
          //2 上传第二张并提交表单--------------------
          _this.fnUpload2( tmp_image2 );
        }else{
          //3 开始提交form---------------------------
          _this.fnSubForm();
          //--------------------------------------
        }

      }
    })
  },

  fnUpload2( tmp_image2 ){
    let _this = this;
    //2 开始上传第二张---------------------------
    wx.uploadFile({
      url: app.globalData.host + 'card.php?action=upload&type=2&openid=' + _this.data.openid,
      filePath: tmp_image2,
      name: 'file',
      success (res){
        console.log(res);
        let _res = JSON.parse(res.data);
        _this.setData({ pic2: _res.src  })
        //3 开始提交form---------------------------
        _this.fnSubForm();
        //--------------------------------------
      }
    })
  },

  PickerChange(e) {
    var value = e.detail.value
    // console.log(value)
    // console.log(111111111111)
    this.setData({
        multiIndex: value,
        product_select: this.data.multiArray[0][value[0]] + ' / ' + this.data.multiArray[1][value[1]]
    })
    console.log(this.data.multiArray[0][value[0]], this.data.multiArray[1][value[1]])

    
  },
  PickerColumnChange(e) {
      // 先定义数据，数组里面两个数组，意为两列，当第一列发生改变时侯，给数组重新赋值
      var obj = e.detail
      var multiArray = this.data.multiArray
      if (obj.column == 0 && obj.value == 0) {
          multiArray[1] = this.data.arrColumn0
      }
      if (obj.column == 0 && obj.value == 1) {
          multiArray[1] = this.data.arrColumn1
      }
      this.setData({
          multiArray: multiArray
      })
  },
  PickerChangeBrand(e){
    var value = e.detail.value
    console.log(value)
    if( value == 0 ){
      this.setData({  array_type: this.data.array_type1, brand_select:'Porsche',type_select:'',brand_hide: 'hide' })
    }
    else if( value == 1 ){
      this.setData({  array_type: this.data.array_type2, brand_select:'MercedesBenz',type_select:'',brand_hide: 'hide' })
    }
    else if( value == 2 ){
      this.setData({  array_type: this.data.array_type3, brand_select:'LandRover',type_select:'',brand_hide: 'hide' })
    }
    else if( value == 3 ){
      this.setData({  
        array_type: this.data.array_type4,
        brand_select:'其他品牌',
        type_select: '其他型号',
        brand_hide: ''
      })

    }
  },
  PickerChangeType(e){
    this.setData({  type_select: this.data.array_type[ e.detail.value] })
  },

  fnShowMsg( title, card_no ){
    let type = this.data.subType;
    let msg = '';
    if( type == 1 ){
      msg = '质保卡号：' +card_no+' \n已通过微信发送通知给客户。';
    }else{
      msg = '质保卡号：' +card_no+' \n草稿保存成功。';
    }

    this.setData({   
      box_hide:'',
      box_title: title,
      box_msg: msg, 
    });
  }



})