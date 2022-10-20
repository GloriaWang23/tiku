var t = null,
    e = getApp();
Page({
  data: {
    PageCur: "search",
    mask: "none",
    windowOutermost: "none",
    feedbackLand: !1,
    contactAdministratorShow: !1,
    questionVal: "",
    modalHidden: true
  },

 /**
   * 显示弹窗
   */
  buttonTap: function() {
    this.setData({
      modalHidden: false
    })
  },

  /**
   * 点击取消
   */
  modalCandel: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function() {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  1: function() {
    wx.showModal({
        title: "关联小程序",
        content: "欢迎各校园公众号关联小程序\r\n小程序APPID为：\r\n wx98ee7883b26a040e",
        showCancel: !0,
        cancelText: "取消",
        confirmText: "复制",
        success: function(t) {
            t.cancel || wx.setClipboardData({
                data: "wx98ee7883b26a040e",
                success: function(t) {
                  wx.showToast({
                  title: "小程序APPID已复制",
                  icon: "none"
                              });
                }
            });
        }
    });
},
  //复制答案
  Tocopy: function (a) {
    wx.setClipboardData({
      data: a.currentTarget.dataset.msg,
      success: function (a) {
        wx.showToast({
          title: "答案已复制"
        });
      }
    });
  },
  ocr: function() {
    wx.navigateTo({
        url: "../image-detail/image-detail"
    });
  },
  //清空
  clear: function () {
    this.setData({
      questionVal: "",
      result: ""
    });
  },
  //教程
  MustSee: function () {
    wx.navigateTo({
      url: "help/help"
    });
  },
  //粘贴
  paste: function () {
    var t = this;
    wx.getClipboardData({
      success: function (e) {
        t.setData({
          questionVal: e.data
        });
      },
      fail: function (t) {
        console.log(t);
      }
    });
  },
  NavChange: function (t) {
    this.setData({
      PageCur: t.currentTarget.dataset.cur
    });
  },
  getNews: function () {
    var t = this;
    wx.request({
      url: e.globalData.baseurl + "/getNews",
      success: function (e) {
        t.setData({
          title: e.data.title,
          message: e.data.message
        }), t.showModal();
      }
    });
  },
  onLoad: function () {
    var e = Date.parse(new Date());
    e /= 1e3, (!wx.getStorageSync("expiration_time") || wx.getStorageSync("expiration_time") < e) && (wx.setStorageSync("expiration_time", e), wx.createRewardedVideoAd && ((t = wx.createRewardedVideoAd({
      adUnitId: "adunit-3df1e026c81457a7" //激励广告ID

    })).onLoad(function () {}), t.onError(function (t) {}), t.onClose(function (e) {
      if (e && e.isEnded) {
        var n = Date.parse(new Date()),
            a = 86400 + (n /= 1e3);
        wx.setStorageSync("expiration_time", a), wx.showModal({
          title: "温馨提示",
          content: "恭喜获得当天无限次数查题",
          showCancel: !1,
          confirmText: "我知道了"
        });
      } else wx.showModal({
        title: "温馨提示",
        content: "很遗憾没有获取奖励",
        showCancel: !0,
        cancelText: "算了吧",
        confirmText: "获取奖励",
        success: function (e) {
          e.confirm && t.show().catch(function () {
            t.load().then(function () {
              return t.show();
            }).catch(function (t) {
              console.log("激励视频 广告显示失败");
            });
          });
        }
      });
    })));
  },
 
  showModal: function (t) {
    this.setData({
      modalName: "DialogModal"
    });
  },
  hideModal: function (t) {
    this.setData({
      modalName: null
    });
  },
  concatQuestion: function (t) {
    var e = t.currentTarget.dataset.keyword;
    this.setData({
      questionVal: this.data.questionVal.concat(e)
    });
  },
  onShareAppMessage: function () {
    return {
      title: "只为让同学们免费查询网课答案",
      path: "pages/index/index",
      imageUrl: "/images/bj.png",
      success: function (t) {
        console.log("转发成功:" + JSON.stringify(t));
      },
      fail: function (t) {
        console.log("转发失败:" + JSON.stringify(t));
      }
    };
  },
  onShareTimeline: function() {
 
    return {
      title: '只为让同学们免费查询网课答案',
      imageUrl: '/images/bj.png',
      query: 'name=网课答案&age=xxx',
    }
  },

  hideWindows: function () {
    this.setData({
      mask: "none",
      windowOutermost: "none"
    });
  },
  onShow: function () {},
  help: function () {
    wx.navigateTo({
      url: "../help/help"
    });
  },
  bindFormSubmit: function (n) {
    var a = this,
        o = Date.parse(new Date());
     //激励开始
    /*if (o /= 1e3, !wx.getStorageSync("expiration_time") || wx.getStorageSync("expiration_time") < o) return wx.showModal({
            title: "温馨提示",
            content: "查看一次广告，获得当天无限查题次数",
            showCancel: !0,
            success: function(e) {
                e.cancel || t.show().catch(function() {
                    t.load().then(function() {
                        return t.show();
                    }).catch(function(t) {
                        console.log("激励视频 广告显示失败");
                    });
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        }),*/
//激励 结束
    !1;
    var i = n.detail.value.question;
    if (!i) return wx.showToast({
      title: "输入不能为空",
      icon: "none"
    }), !1;
    wx.showLoading({
      title: "正在检索中..."
    }), a.setData({
      mask: "block"
    }), 
    console.log(i),
     wx.request({
      url: "接口",
      data: {
         
          tm: i,
      
      },
      success: function (t) {
        wx.showToast({
          title: "查询成功",
          icon: "success"
        }), a.setData({
          questionVal: "",
          mask: "none",
          result: t.data
        }), wx.hideLoading();
      }
    });
  }
});