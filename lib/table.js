export default {
  props: {
    smartTable: {
      type: Object,
      required: true,
    },
  },
  data(){
    return {
      displayed: []
    };
  },
  created(){
    this.smartTable.onDisplayChange(displayed => this.displayed = displayed);
  },
  serverPrefetch() {
      return new Promise(resolve => {
          this.smartTable.exec();
          setTimeout(resolve, 20);
      });
  },
  destroyed(){
    this.smartTable.off();
  },
  mounted(){
    this.smartTable.exec();
  }
};