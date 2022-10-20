const grant_type = 'xx'
const client_id = 'xx'
const client_secret = 'xx'
var token = null
//百度云文字识别
Page({
    data: {
        src: "",
        width: 250,
        height: 250,
        max_width: 400,
        max_height: 400,
        token: "", 
        hidden: !0
    },


    onLoad: function(e) {
    
        this.cropper = this.selectComponent("#image-cropper");
    },
    cropperload: function(e) {
        console.log("cropper初始化完成");
    },
    loadimage: function(e) {
        console.log("图片加载完成", e.detail), wx.hideLoading(), this.cropper.imgReset();
    },
    clickcut: function(e) {
        console.log(e.detail), wx.previewImage({
            current: e.detail.url,
            urls: [ e.detail.url ]
        });
    },
  

    onReady: function(res) {
        // get access_token from BaiDu API
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=' + grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret,
          method: 'POST',
          success: function (res) {
            console.log('Token 请求成功！')
            // console.log(res.data)
            token = res.data.access_token;
            console.log('Token is : ' + token);
          },
          fail: function (res) {
            console.log('Fail to request !')
            console.log(res)
          }
        })
      },
    

    submit: function() {
        var e = this;
        
        wx.showLoading({
            title: "正在识字中..."
        }), e.setData({
            hidden: !1
        }), e.cropper.getImg(function(t) {
       
            wx.request({
                url: "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=" + token,
                method: "post",
               
                header: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                data: {
                    image: wx.getFileSystemManager().readFileSync(t.url, "base64")
                },
                success: function(t) {
                    wx.hideLoading();
                    var a = t.data;
                    e.setData({
                        hidden: !0
                    });
                    var o = getCurrentPages();
                    o[o.length - 1], o[o.length - 2].setData({
                        keywords: a.words_result
                    }), wx.navigateBack({
                        delta: 1
                    });
                }
            });
        });
    }
});