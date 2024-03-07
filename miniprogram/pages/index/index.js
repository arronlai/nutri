// index.js
// const app = getApp()
const moves = require('../../datasets/categorized-moves.js');
const moveKeyMap = require('../../datasets/moves-key-map.js');
Page({
  data: {
    showUploadTip: false,
    powerList: [],
    haveCreateCollection: false,
  },

  _updatePowerList({ powerList }) {
    try {
      this.setData({ powerList }, () => {
        if (powerList) {
          wx.setStorage({
            key: 'powerList',
            data: powerList,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      this._updatePowerList({
        powerList,
      });
    }
  },

  /**
   * 和每组相关的操作，包括增加一组，删除某一组，标记完成/未完成状态
   */
  addSet(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].item.push({
      weight: 0,
      unit: 'kg',
      times: 0,
      rest: 0,
      completed: false,
    });
    this._updatePowerList({
      powerList,
    });
  },
  deleteSet(e) {
    const index = e.currentTarget.dataset.index;
    const itemIdx = e.currentTarget.dataset.item_idx;
    const powerList = this.data.powerList;
    powerList[index].item.splice(itemIdx, 1);
    this._updatePowerList({
      powerList,
    });
  },
  toggleCompleteSet(e) {
    const index = e.currentTarget.dataset.index;
    const itemIdx = e.currentTarget.dataset.item_idx;
    const powerList = this.data.powerList;
    powerList[index].item[itemIdx] = {
      ...powerList[index].item[itemIdx],
      completed: !powerList[index].item[itemIdx].completed,
    };
    this._updatePowerList({
      powerList,
    });
  },

  /**
   * 输入重量/次数/休息时间
   */
  onInputWeight(e) {
    const index = e.currentTarget.dataset.index;
    const itemIdx = e.currentTarget.dataset.item_idx;
    const powerList = this.data.powerList;
    powerList[index].item[itemIdx].weight = e.detail.value;
    this._updatePowerList({
      powerList,
    });
  },
  onInputCount(e) {
    const index = e.currentTarget.dataset.index;
    const itemIdx = e.currentTarget.dataset.item_idx;
    const powerList = this.data.powerList;
    powerList[index].item[itemIdx].times = e.detail.value;
    this._updatePowerList({
      powerList,
    });
  },

  /**
   * 展示动作详情
   * @param {*} options
   */
  showMoveDetail(event) {
    const { title, illustration } = event.currentTarget.dataset;
    const modal = this.selectComponent('#move-detail-modal');
    modal.open({ title, illustration });
  },
  onLoad(options) {
    const { selectedMoves } = options; // 从moveCollections页面传递过来的选中的运动
    if (selectedMoves) {
      const selectedMoveKeys = JSON.parse(selectedMoves);
      const insertingMoves = [];
      selectedMoveKeys.forEach((key) => {
        const { muscle, equipment } = moveKeyMap[key];
        const move = moves
          .find((m) => m.muscle === muscle)
          .equipments.find((e) => e.key === equipment)
          .moves.find((m) => m.key === key);
        if (move) {
          const { key, label, illustration, illustrationSuffix } = move;
          insertingMoves.push({
            id: key,
            title: label,
            illustration,
            illustrationSuffix,
            showItem: false,
            item: [], // TODO history of this move
          });
        }
      });

      const localPowerList = wx.getStorageSync('powerList');
      // debugger

      this._updatePowerList({
        powerList: (localPowerList || []).concat(insertingMoves),
      });
      // TODO 查询运动详细信息
    }
  },
});
