const moves = require('../../datasets/categorized-moves.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moves,
    pageContainerHeight: 0,
  },
  onLoad: function () {
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const tabBarHeight = menuButtonInfo.bottom + menuButtonInfo.height / 2;
    const systemInfo = wx.getSystemInfoSync();
    const windowHeight = systemInfo.windowHeight;
    this.setData({
      pageContainerHeight: windowHeight - tabBarHeight,
    });
  },
});
