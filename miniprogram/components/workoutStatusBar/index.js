Component({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    startTime: new Date().getTime(),
    duration: 0,
    autoCount: true, // 是否自动计时
    editingData: {
      startTime: new Date().getTime(),
      duration: 0,
      autoCount: true, // 是否自动计时
    },
  },
  properties: {
    // 初始化开始时间，只从属性读取一次
    initStartTime: {
      type: number,
      value: new Date().getTime(),
    },
    // 初始时长，只从属性读取一次
    initDuration: {
      type: number,
    },
  },
  methods: {
    open() {
      this.setData({
        show: true,
      });
    },
    close() {
      this.setData({
        show: false,
      });
    },
    onEditConfirm() {},
  },
  attached() {
    this.setData({
      duration: this.properties.initDuration,
      startTime: this.properties.initStartTime,
    });
  },
});
