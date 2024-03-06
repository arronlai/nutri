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
    this.setData({
      powerList,
    });
  },
  deleteSet(e) {
    const index = e.currentTarget.dataset.index;
    const itemIdx = e.currentTarget.dataset.item_idx;
    const powerList = this.data.powerList;
    powerList[index].item.splice(itemIdx, 1);
    this.setData({
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
    this.setData({
      powerList,
    });
  },

  onLoad(options) {
    const { selectedMoves } = options; // 从moveCollections页面传递过来的选中的运动
    if (selectedMoves) {
      // this.setData({
      //   selectedMoves: JSON.parse(selectedMoves),
      // });
      const selectedMoveKeys = JSON.parse(selectedMoves);
      const insertingMoves = [];
      selectedMoveKeys.forEach((key) => {
        const { muscle, equipment } = moveKeyMap[key];
        const move = moves
          .find((m) => m.muscle === muscle)
          .equipments.find((e) => e.key === equipment)
          .moves.find((m) => m.key === key);
        if (move) {
          insertingMoves.push({
            id: move.key,
            title: move.label,
            pic: `${move.illustration}.th${move.illustrationSuffix}`,
            showItem: false,
            item: [], // TODO history of this move
          });
        }
      });

      this.setData({
        powerList: this.data.powerList.concat(insertingMoves),
      });
      // TODO 查询运动详细信息
    }
  },
});
