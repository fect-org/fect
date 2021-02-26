<template>
  <div class="home">
    <Button size="mini" @click="handleTest">I am button</Button>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '../../packages/Button'

export default {
  components:{
    Button,
  },
  methods:{
    handleTest(e){
      console.log(e)
    },
  },
  name: 'Home',
 
};
</script>
