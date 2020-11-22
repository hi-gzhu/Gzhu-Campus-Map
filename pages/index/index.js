import {
  NowWeather,
  SevenWeather,
  Address
} from '../../config/weather.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    SwiperImgList: [{
      'img': '/images/banner/banner2.jpg'
    }, {
      'img': '/images/banner/banner3.png'
    }, {
      'img': '/images/banner/banner4.png'
    }, {
      'img': '/images/banner/banner5.png'
    }],
    cloudRoot: app.globalData.cloudRoot,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    NowWeather: {},
    FutureWeather: [],
    Address: [],
    isLoaded: false,
    loadModal: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(res)
        //赋值经纬度
        const location = res.longitude + ',' + res.latitude
        //   console.log(location)
        Address(location).then(res => {
          _this.setData({
            Address: res.data.location
          })

          // console.log(res.data.location)
        }).catch(err => {

        })
        NowWeather(location).then(res => {
          _this.setData({
            NowWeather: res.data.now
          })
          // console.log(res.data.now)
        }).catch(err => {
          console.log(err)
        })
        SevenWeather(location).then(res => {
          _this.setData({
            FutureWeather: res.data.daily,
            isLoaded: true,
            loadModal: false
          })
          // console.log(res.data.daily)
        }).catch(err => {

        })
      }
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage:function(res){
    return {
      title: '广大校园导览',
      path: '/pages/loading/loading',
      imageUrl: 'https://www.datealive.top/wp-content/uploads/2020/11/banner2-scaled.jpg',
  }
  },
  //分享朋友圈
  onShareTimeline: function () {
    // console.warn(this.data.postId);
    return {
      title: '广大校园导览',
      path: '/pages/loading/loading',
      imageUrl: 'https://www.datealive.top/wp-content/uploads/2020/11/gzhu.png',
    }
  }


})