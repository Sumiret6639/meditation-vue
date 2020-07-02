"use strict";

var outline = document.querySelector(".moving-line circle");
var outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;
var vue = new Vue({
  el: '#app',
  data: {
    isPaused: true,
    currentTime: 0,
    defaultDuration: 600,
    elapsedTime: 0,
    seconds: 0,
    minutes: 0,
    type: "rain",
    outlineLength: outlineLength
  },
  methods: {
    changeSongStatus: function changeSongStatus() {
      var vm = this;

      if (vm.isPaused) {
        vm.$refs.audio.play();
        vm.isPaused = true;
      } else {
        vm.$refs.audio.pause();
        vm.isPaused = false;
      }
    },
    changeSongType: function changeSongType() {
      var vm = this;
      vm.$refs.audio.src = vm.soundType;
      vm.$nextTick(function () {
        vm.isPaused = false;
        vm.$refs.audio.play();
        vm.getTime();
      });
    },
    resetTimeDisplay: function resetTimeDisplay(duration) {
      var vm = this;
      vm.defaultDuration = 0;
      vm.defaultDuration = duration;
      vm.seconds = Math.floor(duration % 60);
      vm.minutes = Math.floor(duration / 60);
    },
    getTime: function getTime() {
      var vm = this;

      vm.$refs.audio.ontimeupdate = function () {
        vm.currentTime = vm.$refs.audio.currentTime;
        vm.elapsedTime = vm.defaultDuration - vm.currentTime;
        vm.seconds = Math.floor(vm.elapsedTime % 60);
        vm.minutes = Math.floor(vm.elapsedTime / 60);

        if (vm.currentTime >= vm.defaultDuration) {
          vm.$refs.audio.pause();
          vm.isPaused = true;
          vm.seconds = 0;
          vm.minutes = 0;
        }
      };
    },
    movingStyle: function movingStyle(time) {
      var vm = this;
      return {
        "stroke-dashoffset": -(time / vm.defaultDuration) * vm.outlineLength
      };
    },
    bgiStyle: function bgiStyle(img) {
      return {
        "background-image": "url(./assets/images/".concat(img, ".jpg)")
      };
    }
  },
  mounted: function mounted() {
    var vm = this;
    vm.$refs.audio.play();
    vm.$refs.audio.pause();
  }
});
//# sourceMappingURL=all.js.map
