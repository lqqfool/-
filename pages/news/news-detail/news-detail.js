var newsData = require('../../data/newsdata.js');

Page({

  /*页面的初始数据 */

  data: {

  },

  /*生命周期函数--监听页面加载 */

  onLoad: function (options) {
    this.setData(newsData.initData[options.newsid]);
    this.setData({
      newsid: options.newsid
    })
    var newsCollect = wx.getStorageSync('newsCollect');
    if (newsCollect) {
      var newCollect = newsCollect[options.newsid];
      this.setData({
        collected: newCollect
      })
    } else {
      var newsCollect = {};
      newsCollect[options.newsid] = false;
      wx.setStorageSync('newsCollect', newsCollect);
    }
  },
  collectTap: function (event) {
    var newsCollect = wx.getStorageSync('newsCollect');
    var newCollect = newsCollect[this.data.newsid];
    newCollect = !newCollect;

    newsCollect[this.data.newsid] = newCollect;
    wx.setStorageSync('newsCollect', newsCollect);

    this.setData({
      collected: newsCollect[this.data.newsid]
    })
    wx.showToast({
      title: newsCollect[this.data.newsid] ? "收藏成功" : "取消收藏",
      icon: 'success',
      duration: 800,
      mask: true
    })
  },
  onShowTap: function (event) {
    wx.showActionSheet({
      itemList: ['分享到微信', '分享到微博', '分享到QQ'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: newsData.initData[this.data.newsid].title,
      path: '/pages/news/news-detail/news-detail'
    }
  }
})