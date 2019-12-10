// miniprogram/pages/post_messageDetail/post_messageDetail.js
const buttons = [{
  openType: 'getUserInfo',
  label: '点赞',
  icon:'123456',
},
{
  openType: 'share',
  label: '评论',
  icon: '',
},
{
  openType: 'contact',
  label: '收藏',
  icon: '',
},
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogDetail:{},
    buttons
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getBlogDetail(options.blogID)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**大图浏览 */
  onPreview(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.filelist.map((n) => n.url),
    })
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 3) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },
  /**
   * 获取帖子详情
   */
  getBlogDetail(ID){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counters').where({
      _id: ID
    }).get({
      success: res => {
        res.data[0].createTime = this.dateConversion(res.data[0].createTime)
        this.setData({
          blogDetail: res.data[0]
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**时间转换 */
  dateConversion(value) {
    var d = new Date(value);
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return date;
  },

})