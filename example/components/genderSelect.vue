<template>
  <label>
    Gender
    <select v-model="genderValue" name="gender">
      <option value="">-</option>
      <option value="female">female</option>
      <option value="male">male</option>
    </select>
  </label>
</template>

<script>
  import filter from '../../lib/filter';
  import {debounce} from './helper';

  const commit = debounce((dir, val) => {
    dir.filter(val);
  }, 300);

  export default {
    mixins: [filter],
    data: function () {
      return {genderValue: ''};
    },
    created(){
      this.commit = debounce((val) => this.filter(val), 300)
    },
    watch: {
      genderValue: function (val) {
        this.commit(val);
      }
    }
  }
</script>