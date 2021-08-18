export default function (directive, proxyEvent, delegateMethods = [], propsToConf = ({smartTable}) => ({table: smartTable})) {
  const output = {
    data: function () {
      return {
        stDirective: directive(propsToConf(this)),
        stState: {}
      };
    },
    created(){
      if (typeof this.stDirective.state === 'function') {
        this.stState = this.stDirective.state();
      }
      this.stDirective[proxyEvent](state => {
        this.stState = state;
      })
    },
    destroyed(){
      this.stDirective.off();
    },
    methods: {}
  };

  for (let method of delegateMethods) {
    output.methods[method] = function (...args) {
      return this.stDirective[method](...args)
    };
  }

  return output;
}