<template>
  <tr>
    <td>{{item.name.last}}</td>
    <td>{{item.name.first}}</td>
    <td>{{item.gender}}</td>
    <td>{{item.birthDate.toLocaleDateString()}}</td>
    <td>{{item.size}}</td>
  </tr>
</template>

<script>
  export default {
    props:['item']
  };
</script>