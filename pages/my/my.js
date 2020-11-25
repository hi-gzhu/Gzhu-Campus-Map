// pages/my/my.js
const app=getApp();
const cloudRoot=app.globalData.cloudRoot
Page({

  /**
   * 页面的初始数据
   */
  data: {
		imgUrls:[
			{
        'img':cloudRoot+'/images/banner/校门.png'
      },{
        'img':cloudRoot+'/images/banner/图书馆.jpg'
      },{
        'img':cloudRoot+'/images/banner/演艺中心.jpg'
      },{
        'img':cloudRoot+'/images/banner/水面.jpg'
      }
		],
		logoUrl:"/res/img/gzhu.jpg",
		SchoolName:"广州大学",
		SchoolAddress:"大学城校区：广东省广州市大学城外环西路230号\n&nbsp;&nbsp;&nbsp;&nbsp;桂花岗校区：广东省广州市越秀区桂花岗东1号",
		SchoolPhone:"020-39366232",
		SchoolDesc:"&nbsp;&nbsp;&nbsp;&nbsp;大学与城市共生共荣共成长。广州大学是以国家重要中心城市“广州”命名的综合性大学，于2000年合并组建，有着90多年的办学传统。学校紧紧抓住国家推进“双一流”建设、广东省和广州市高水平大学建设机遇，坚持面向国际学术前沿、面向国家重大战略需求、面向国家和区域经济社会需求，主动对接广州和粤港澳大湾区建设、创新和开放，按照内涵建设、创新引领、特色发展、开放办学的发展理念，聚焦新工科、新师范、新文科建设，积极探索新医科发展，是广东省高水平大学重点学科建设高校、广州市高水平大学建设高校。\n",
    VideoOwner:"CHANGE_A",
    VideoSrc:"",
    calendar:['/res/img/calendar.png','/res/img/schoolmap.jpg'],
		Longitude:113.372033,//中心经度
    Latitude: 23.041583,//中心纬度,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
	navigateTo(e) {
    switch (e.target.id) {
      case "address":
      case "navigate":
        wx.openLocation({
          latitude: Number(this.data.Latitude),
          longitude: Number(this.data.Longitude),
          name: this.data.SchoolName,
          scale: 15
        });
        break;
      case "phone":
        wx.makePhoneCall({
          phoneNumber: this.data.SchoolPhone
				});
        break;
      case "discover":
        /*
        wx.navigateTo({
          url: '/pages/web-view/web-view',
        })*/
        wx.showToast({
          title: '由于个人小程序受限，无法打开',
          icon:'none',
          duration:2000
        })
        break;
      default:
        break;
    }
  },
  preview:function(event) {
    //console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})