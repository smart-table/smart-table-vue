export default {
  props: ['smartTable'],
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