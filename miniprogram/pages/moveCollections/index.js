const moves = require('../../datasets/categorized-moves.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moves,
    pageContainerHeight: 0,
    selectedMoves: [],
    currentEquipment: 0,
    currentMuscle: 0,
    timer: null,
    scrollIntoView: '',
  },
  onMuscleTabChange(e) {
    const active = e.detail;
    if (this.data.timer)  {
      clearTimeout(this.data.timer);
    }
    this.setData({ currentMuscle: active.index, currentEquipment: 0, scrollIntoView: '', timer: null});
  },
  /**
   * UI相关，sidebar和scroll-view之间的联动
   */
  calculateCurrentEquipment: function (e) {
    const currentMuscle = this.data.moves[this.data.currentMuscle];
    const { equipments } = currentMuscle;
    let found = false;
    for (let i = 0; i < equipments.length; i++) {
      if (found) {
        return;
      }
      const query = wx.createSelectorQuery();
      const equipment = equipments[i];
      query
        .select(`#equipment-${currentMuscle.muscle}-${equipment.key}`)
        .boundingClientRect();
      query.exec((res) => {
        const rect = res[0];
        if (rect && rect.bottom >= 45 && rect.top <= 45) {
          // 顶部tab 44，bottom = 44时这一个group不在scroll-view内
          console.log('activeEquipment', equipment.key, res);
          if (i !== this.data.currentEquipment) {
            this.setData({ currentEquipment: i });
            found = true;
            return;
          }
        }
      });
    }
  },
  onScroll: function (e) {
    // 计算滚动位置对应的 active 值
    if (this.data.timer) {
      clearTimeout(this.data.timer);
      this.setData({ timer: null });
    }
    this.data.timer = setTimeout(() => {
      this.calculateCurrentEquipment(e);
    }, 100);
  },
  onChangeSidebar: function (e) {
    // 滚动 scroll-view 到对应的位置
    const active = e.detail;
    this.setData({ currentEquipment: active });
    const currentMuscle = this.data.moves[this.data.currentMuscle];
    const { equipments } = currentMuscle;
    const equipment = equipments[active];
    // 设置 scrollIntoView 的值为要滚动到的元素的 ID
    this.setData({
      scrollIntoView: `equipment-${currentMuscle.muscle}-${equipment.key}`,
    });
  },
  /**
   * 选中运动改变，更新数据，van-checkbox-group 事件回调
   * @param {*} event
   */
  onChange(event) {
    this.setData({
      selectedMoves: event.detail,
    });
  },
  /**
   * 点击move item回调，更新checkbox状态
   * @param {*} event
   */
  toggle(event) {
    const { index, equipment_idx, key } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(
      `.checkboxes-${key}-${equipment_idx}-${index}`
    );
    checkbox.toggle();
  },
  /**
   * 提交按钮回调，找到当前选中的运动详细信息并返回前一页
   * TODO: 如果登录了查找上次运动记录
   */
  submit() {
    wx.navigateTo({
      url: `/pages/index/index?selectedMoves=${JSON.stringify(
        this.data.selectedMoves
      )}`,
    });
  },
  cancel() {
    wx.navigateBack();
  },
  noop() {},

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
