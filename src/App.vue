<template>
  <div class="app">
    <Sidebar />
    <Main />
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar';
  import Main from '@/components/Main';

  export default {
    name: 'App',
    components: {
      Sidebar,
      Main
    }
  }
</script>

<style lang="sass">
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap')
  
  *
    margin: 0
    padding: 0
    list-style-type: none
    box-sizing: border-box
    outline: none

  a
    text-decoration: none
    color: black

    &:hover
      color: indianred

  .app
    width: 1170px
    margin: 0 auto
    display: flex
    font-family: Raleway

    @media (max-width: 1199px)
      width: 960px
    
    @media (max-width: 991px)
      width: 720px

    @media (max-width: 767px)
      width: 540px
      flex-direction: column

    @media (max-width: 576px)
      padding: 0 10px
      width: auto
</style>
