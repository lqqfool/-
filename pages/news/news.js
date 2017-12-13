var newsData = require("../data/newsdata.js");
Page({
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    circular:true,
    useData:[]
  },
 //onLoad是生命周期函数
  onLoad:function(options){
// 页面初始化 options为页面跳转所带来的参数
//this.setData可以让view重绘
    this.setData({
      useData:newsData.initData
    })
  },
  // 跳转详情页
  goNewsDetail:function(event){
    var newsid = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url:'./news-detail/news-detail?newsid='+newsid
    })
  },
  onShareAppMessage: function () {
    return {
      title: "时尚新闻",
      path: '/pages/news/news'
    }
  }
})