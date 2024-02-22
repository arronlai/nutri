// index.js
// const app = getApp()

Page({
  data: {
    showUploadTip: false,
    powerList: [
      {
        id: 0, // 动作id
        title: '杠铃卧推', // 动作名称
        pic: 'https://img.net/1.gif', // 动作图
        showItem: false,
        item: [
          {
            weight: 10,
            unit: 'kg',
            times: 10,
            rest: 60,
            completed: false,
          },
        ],
      },
    ],
    haveCreateCollection: false,
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    const selectedItem = powerList[index];
    selectedItem.showItem = !selectedItem.showItem;
    if (selectedItem.link) {
      wx.navigateTo({
        url: `../web/index?url=${selectedItem.link}&title=${selectedItem.title}`,
      });
    } else if (selectedItem.page) {
      wx.navigateTo({
        url: `/pages/${selectedItem.page}/index`,
      });
    } else if (
      selectedItem.title === '数据库' &&
      !this.data.haveCreateCollection
    ) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList,
      });
    }
  },
});
