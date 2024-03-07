Component({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    title: '',
    illustration: '',
  },
  // properties: {
  //   // dialog标题，这里传入动作
  //   title: {
  //     type: String,
  //     value: '未知动作',
  //   },
  //   // 动作大图
  //   illustration: {
  //     type: String,
  //   },
  // },
  methods: {
    open({ title, illustration }) {
      this.setData({
        show: true,
        title,
        illustration,
      });
    },
    onClose() {
      this.setData({ show: false, title: '', illustration: '' });
    },
  },
});
