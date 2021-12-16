<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <dragon/>
        </div>
        <div class="col text-center">
            <p>
                Hey there!
                <br>
                Thanks for using this calculator and showing an interest in contributing.
                If you want to request new features, report bugs, or fork yourself feel free to do so on the 
                <a href="https://github.com/aerickson1337/dndcustomfighthelper" target="_blank">GitHub</a>
            </p>
        </div>
        <div class="col">
          <dragon/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dragon from "@/components/dragon.vue";
export default {
  components: {
    dragon,
  },
};
</script>
