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
  destroyed(){
    this.smartTable.off();
  },
  mounted(){
    this.smartTable.exec();
  }
};