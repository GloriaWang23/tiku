App({
  onLaunch: function() {
    var t = this;
    wx.getSystemInfo({
        success: function(a) {
            t.globalData.StatusBar = a.statusBarHeight;
            var s = wx.getMenuButtonBoundingClientRect();
            s ? (t.globalData.Custom = s, t.globalData.CustomBar = s.bottom + s.top - a.statusBarHeight) : t.globalData.CustomBar = a.statusBarHeight + 50;
        }
    });
},
  checkNewVersion: function () {
    if (wx.canIUse("getUpdateManager")) {
      var e = wx.getUpdateManager();
      e.onCheckForUpdate(function (t) {
        t.hasUpdate && (e.onUpdateReady(function () {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function (t) {
              t.confirm && e.applyUpdate();
            }
          });
        }), e.onUpdateFailed(function () {
          wx.showModal({
            title: "已经有新版本了哟~",
            content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
          });
        }));
      });
    } else wx.showModal({
      title: "提示",
      content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
    });
  },
  globalData: {
    baseurl: ""
  }
});