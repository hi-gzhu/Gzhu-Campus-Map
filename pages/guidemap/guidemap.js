// pages/guidemap/guidemap.js
const app = getApp();
//是否显示 默认不显示
var isShow = false,
	//动画对象实例
	animation,
	//获取当前设备的高度
	height = wx.getSystemInfoSync().windowHeight;
Page({
	data: {
		scrollLeft: 0,
		loadModal:true,
		Showtobarbtn:false,
		allMarkers: [],
		sideBarItem: [],
		scale: 15, //缩放级别
		coreLongitude: 113.372033, //中心经度
		coreLatitude: 23.041583, //中心纬度,
		islocation: true,
		CustomBar: app.globalData.CustomBar,
		TabCur: 0,
		catIndex: 0,
		showCats: true,
		bounding: wx.getMenuButtonBoundingClientRect(),
		StatusBar: app.globalData.StatusBar, //状态栏高度
		hidden: true, //默认为隐藏
		isShow,
		//默认为圆形    宽高为设备高度÷15      
		myStyle: "border-radius: " +
			height + "px;height: " +
			height / 15 + "px;width: " +
			height / 15 + "px;",
		nav: [{
			navigation: [{
					name: '搜索',
					src: '/res/img/guide.png'
				},
				{
					name: '学校简介',
					src: '/res/img/xuexiao.png'
				},

			],
		},]
	},
	onLoad: function () {
		var _this = this
		//云函数调用
		wx.cloud.callFunction({
				// 云函数名称
				name: 'loadMarkers',
				// 传给云函数的参数
				data: {
					base: 'markers'
				},
			})
			.then(res => {
				//console.log(res) // 3
				_this.setData({
					allMarkers: res.result.data,
					loadModal: false,
					Showtobarbtn:true
				})
			})
			.catch(console.error)	
		//初始化动画
		animation = wx.createAnimation({
			duration: 300,
			timingFunction: 'linear',
		})
	},
	onReady: function () {
		var _this=this
		wx.cloud.callFunction({
			// 云函数名称
			name: 'loadMarkers',
			// 传给云函数的参数
			data: {
				base: 'markers'
			},
		})
		.then(res => {
			//console.log(res) // 3
			_this.setData({
				sideBarItem: res.result.data[0].data
			})
		})
		.catch(console.error)
		//console.log(this.data.sideBarItem)
	},
	toggleCats() {
		this.setData({
			showCats: !this.data.showCats
		});
	},
	tabSelect(e) {
		const Id = e.currentTarget.dataset.id
		const allMarkers=this.data.allMarkers
		//console.log(Id)
		this.setData({
			TabCur: Id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
			sideBarItem: allMarkers[Id].data,
			catIndex: 0,
			scale:16
		})
		// console.log(this.data.sideBarItem)
	},
	selectCat(e) {
		this.setData({
			catIndex: e.target.dataset.id
		})
		const Detaildatas = this.data.sideBarItem[e.target.dataset.id]
		wx.navigateTo({
			url: '/pages/gmapdetail/gmapdetail?Detaildatas=' + JSON.stringify(Detaildatas),
		})
	},
	getLocation() {
		var that = this;
		wx.getLocation({
			type: 'gcj02',
			isHighAccuracy: true,
			success(res) {
				const latitude = res.latitude
				const longitude = res.longitude
				//console.log(latitude+''+longitude)
				that.setData({
					scale: 16,
					coreLatitude: latitude,
					coreLongitude: longitude,
				})
			}
		})
	},
	markerTap(e) {
		//console.log(e)
		const Detaildatas = this.data.sideBarItem[e.detail.markerId - 1]
		wx.navigateTo({
			url: '/pages/gmapdetail/gmapdetail?Detaildatas=' + JSON.stringify(Detaildatas),
		})

	},
	onClickAdd: function (e) {
		var menuStyle = ''
		var that = this
		that.animation = animation
		that.setData({
			hidden: false, //隐藏白色面板(ripple)
			menuStyle: menuStyle, //设置底部加号按钮style
		})
		//判断是否显示
		if (!isShow) {
			//未显示 则执行动画 缩放设备高度÷15高度
			that.animation.scale(height / 15).step()
			//加号按钮执行打开动画
			menuStyle = 'menuOpen'
		} else {
			//已显示 则执行动画 缩放回0
			that.animation.scale(0).step()
			//加号按钮执行关闭动画
			menuStyle = 'menuClose'
		}
		isShow = !isShow //存储显示状态
		that.setData({
			animationData: that.animation.export(), //动画赋值
			menuStyle: menuStyle, //加号按钮style赋值
		})
		//如果显示状态为true 延时200毫秒后执行内容显示 否则立即隐藏
		isShow ?
			setTimeout(function () {
				that.setData({
					isShow
				})
			}, 200) : that.setData({
				isShow
			})
	},
	ChooseNav(e) {
		const SwitchId = e.currentTarget.dataset.id
		switch (SwitchId) {
			case 1:
				wx.navigateTo({
					url: '/pages/search/search',
				})
				break;
			case 2:
				wx.switchTab({
					url: '/pages/my/my',
				})
				break;

		}
	}
})