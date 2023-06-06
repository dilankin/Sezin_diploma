<template>
  <div class="background" v-if="exercises">
    <div class="content">
      <div class="inner-content">
        <div class="in-line">
          <span class="desctop"><p class="block-title">exercise</p></span>
          <div class="middle–container">
            <p>Stress release</p>
          </div>
          <div class="close-button" @click="close">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6864 14.7962L25.4945 5.64264C25.6686 5.43141 25.7595 5.15971 25.7492 4.88181C25.7389 4.60392 25.628 4.34031 25.4388 4.14367C25.2496 3.94702 24.9959 3.83182 24.7285 3.82109C24.4611 3.81035 24.1996 3.90488 23.9964 4.08577L15.1883 13.2393L6.38014 4.07473C6.18007 3.86681 5.90871 3.75 5.62576 3.75C5.34282 3.75 5.07146 3.86681 4.87139 4.07473C4.67132 4.28264 4.55892 4.56464 4.55892 4.85868C4.55892 5.15273 4.67132 5.43472 4.87139 5.64264L13.6901 14.7962L4.87139 23.9497C4.76017 24.0487 4.66983 24.1705 4.60606 24.3075C4.54228 24.4445 4.50644 24.5937 4.50079 24.7458C4.49514 24.8978 4.5198 25.0495 4.57321 25.1912C4.62663 25.3329 4.70765 25.4615 4.8112 25.5692C4.91474 25.6768 5.03858 25.761 5.17492 25.8165C5.31127 25.872 5.45718 25.8976 5.60351 25.8917C5.74984 25.8859 5.89341 25.8486 6.02523 25.7823C6.15705 25.7161 6.27426 25.6222 6.36951 25.5066L15.1883 16.3531L23.9964 25.5066C24.1996 25.6875 24.4611 25.782 24.7285 25.7713C24.9959 25.7605 25.2496 25.6453 25.4388 25.4487C25.628 25.2521 25.7389 24.9884 25.7492 24.7106C25.7595 24.4327 25.6686 24.161 25.4945 23.9497L16.6864 14.7962Z"
                fill="#1C194E"
              />
            </svg>
          </div>
        </div>
        <div class="in-line">
          <p style="flex: 1" class="header-text">Total {{ totalTime }}</p>
          <p class="middle–container header-text" style="flex: 2">
            {{ current }} out of {{ totalCount }}
          </p>
          <div style="flex: 1"></div>
        </div>
        <div>
          <div class="main-content">
            <div class="buttons-container" style="text-align: start">
              <svg
                v-if="current > 1"
                @click="current--"
                class="controller-button"
                width="60"
                height="54"
                viewBox="0 0 60 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M39.8004 8.42468L20.5769 26.8534C20.3716 27.0503 20.3716 27.3785 20.5769 27.5753L39.8004 46.0041"
                  stroke="#5353C9"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <img class="image" v-if="exercises[current - 1]?.imageUrl" :src="$cdn + exercises[current - 1].imageUrl" />
            <div class="buttons-container">
              <svg
                v-if="current < exercises?.length"
                @click="endCurrent"
                class="controller-button"
                width="60"
                height="54"
                viewBox="0 0 60 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1996 46.0043L39.4231 27.5756C39.6284 27.3787 39.6284 27.0505 39.4231 26.8537L20.1996 8.42493"
                  stroke="#5353C9"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
          <div>
            <p class="primary-title">{{ exercises[current - 1]?.name }}</p>
            <p class="primary-title" style="margin-top: 14px">
              {{ exercises[current - 1]?.seconds }} seconds
            </p>
            <p class="content-text">{{ exercises[current - 1]?.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exercise-component",
  props: {
    exercises: Array,
  },
  watch: {
    exercises: function () {
      this.initData()
    },
  },
  data() {
    return {
      totalTime: "",
      current: 1,
      totalCount: 0,
    }
  },
  async mounted() {
    this.initData()
  },
  watch: {
    async exercises() {
      this.totalCount = this.exercises.length
      let cu = this.current 
      console.log(this.exercises);
      if (this.exercises.length == 1) {
        await this.$axios.put(`user/exercise/end/${this.exercises[0].id}`, {}, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then(res => {
            this.$toaster.success('Задача при выполнении');
        })
          
        }
      }
  },
  methods: {
    close: function () {
      this.$emit("close")
    },
    async endCurrent() {
      this.current++
      let cu = this.current
      if (cu - 1 === this, this.exercises.length) {
      await this.$axios.put(`user/exercise/end/${this.exercises[0].id}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(res => {
          this.$toaster.success('Задача выполнено!');
      })
        
      }

    },
    initData() {
      if (this.exercises != null) {
        this.totalCount = this.exercises.length
        let totalSeconds = 0
        for (let i = 0; i < this.exercises.length; i++) {
          totalSeconds += this.exercises[i].seconds
        }
        if (totalSeconds >= 60) {
          this.totalTime = Math.floor(totalSeconds / 60).toString() + " minutes"
          if (totalSeconds % 60 > 0) {
            this.totalTime += " " + (totalSeconds % 60).toString() + " seconds"
          }
        } else {
          this.totalTime = totalSeconds.toString() + " seconds"
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.background {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
}
.content {
  min-width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  background: white;
  max-width: 600px;
  border-radius: 30px;
  text-align: center;
  padding: 40px 60px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  max-height: 95vh;
  overflow: scroll;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @media screen and (max-width: 768px) {
  padding: 10px 10px;
    height: 70%;
    width: 95% !important;
  }
}
.content::-webkit-scrollbar {
  display: none;
}
.in-line {
  display: flex;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin-bottom: 40px;
}
.block-title {
  width: max-content;
  color: #72cad8;
  border: 0.5px solid #72cad8;
  border-radius: 20px;
  padding: 7px 16px;
  font-size: 16px;
  line-height: 28px;
  font-family: Poppins-Light, system-ui;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.middle–container {
  flex: 1;
  padding-top: 5px;
  padding-right: 20px;
  text-align: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.middle–container > p,
.middle–container > svg {
  display: inline-block;
  vertical-align: middle;
}
.middle–container > svg {
  margin-left: 10px;
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.middle–container > p {
  font-size: 24px;
  font-family: Poppins-Light, system-ui;
  color: #1c194e;
}
.close-button {
  cursor: pointer;
  margin-left: 50px;
  padding: 5px 0 5px 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.content-text {
  margin-top: 10px;
  color: #1c194e;
  font-size: 16px;
  font-family: Poppins-Regular, system-ui;
  line-height: 160%;
  margin-bottom: 30px;
  display: block;
  text-align: left;
}
.header-text {
  color: #1c194e;
  font-size: 16px;
  font-family: Poppins-Light, system-ui;
}
.main-content {
  display: flex;
  vertical-align: middle;
}
.buttons-container {
  text-align: end;
  flex: 1;
  align-self: center;
  display: inline-block;
  vertical-align: middle;
}
.image {
  width: 566px;
  height: 300px;
  border-radius: 30px;
  display: inline-block;
  vertical-align: middle;
  @media screen and (max-width: 768px) {
    width: 75%;
    height: 100%;
  }
}
.controller-button {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.primary-title {
  font-size: 16px;
  color: black;
  font-family: Poppins-SemiBold, system-ui;
  margin-top: 20px;
}
</style>
