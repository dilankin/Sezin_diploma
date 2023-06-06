<template>
  <div class="background">
    <div class="content">
      <div class="inner-content">
        <div class="in-line">
          <span class="desctop"><p class="block-title">{{ $t("READING") }}</p></span>
          <div class="middle–container">
            <p>{{ $t("CREATEREADINGTASK") }}</p>
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
        <div class="in-line" style="margin-top: 20px">
          <p class="variant-message" @click="selectMessage(0)">{{ variants[0] }}</p>
          <p class="variant-message middle–message" @click="selectMessage(1)">{{ variants[1] }}</p>
          <p class="variant-message" @click="selectMessage(2)">{{ variants[2] }}</p>
        </div>
        <div class="in-line">
          <p class="variant-message" @click="selectMessage(3)">{{ variants[3] }}</p>
          <p class="variant-message middle–message" @click="selectMessage(4)">{{ variants[4] }}</p>
          <p class="variant-message" @click="selectMessage(5)">{{ variants[5] }}</p>
        </div>
        <div class="in-line" style="display: flex; flex-direction: column; ">
          <div class="leQ__bottom__left">
              <p>Вы оставляете как: <span>{{ userName }}</span></p>
              <div class="leQ__bottom__left-gap">
                  <p>Оставить анонимно </p>
                  <label class="checkbox-google">
                      <input type="checkbox" v-model="inputValue"/>
                      <span class="checkbox-google-switch"></span>
                  </label>
              </div>
          </div>
          <!-- <input :placeholder="$t('title')" type="text" v-model="message" style="margin-right: 10px;"/> -->
          <input :placeholder="$t('yourMessage')" v-model="desc"/>
          <p class="login-button" @click="sendMessage">{{ $t("sendSobsh") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useI18n } from "vue-i18n"
import { mapGetters } from 'vuex'

export default {
  setup() {
    const { t, locale } = useI18n({ useScope: "global" })
    return { t, locale }
  },
  name: "leave-message-component",
  data() {
    return {
      userName: "",
      inputValue: '',
      desc: "",
      variants: [
        this.$t("BEKIND"),
        this.$t("YOUAREAWESOME"),
        this.$t("YOUAREAMAZING"),
        this.$t("YOUAREAWESOME"),
        this.$t("GOTTHIS"),
        this.$t("GREAT"),
      ],
    }
  },
  computed: {
      ...mapGetters([ "getUser"]),
  },
  watch: {
    inputValue() {
      this.inputValueMethod();
    }
  },
  mounted() {
      this.inputValueMethod();  
  },
  methods: {
    inputValueMethod() {
      if (!this.inputValue) {
        if (this.getUser.fullName) {
          this.userName = this.getUser.fullName;
        } else {
          this.userName = this.getUser.fullName;
        }
      }
      else {
        this.userName = this.$t('anonim')
      }
    },
    close: function () {
      this.$emit("closeMessage")
    },
    selectMessage(index) {
      this.message = this.variants[index]
    },
    sendMessage() {
      if (this.desc.length !== 0) {
        this.$axios.post('feedback', {
              title: this.userName,
              description: this.desc,
          })
          .then(() => {
            this.close()
            this.$emit("sendedMessage")
          })
          .catch(() => {
            this.close()
          })
      }
    },
  },
}
</script>

<style scoped>
.background {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
}
.content {
  min-width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
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
  color: #7474dd;
  border: 0.5px solid #7474dd;
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
  padding: 5px 0 5px 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
input {
  flex: 1;
  color: black;
  margin-top: 20px;
  border-radius: 20px;
  line-height: 20px;
  background: rgba(239, 232, 255, 1);
  width: 100%;
  font-size: 14px;
  font-family: Poppins-Light, system-ui;
  padding: 15px 20px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: none;
}
::placeholder {
  color: #2f2f2f;
}
input:focus {
  outline: none;
}
.variant-message {
  cursor: pointer;
  flex: 1;
  margin-bottom: 10px;
  background: rgba(248, 240, 255, 1);
  color: black;
  font-family: Poppins-Light, system-ui;
  font-size: 14px;
  padding: 22px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-radius: 20px;
}
.middle–message {
  margin-left: 20px;
  margin-right: 20px;
}
.login-button {
  align-self: center;
  margin-left: 20px;
  margin-top: 20px;
  width: max-content;
  line-height: 30px;
  background: rgba(116, 116, 221, 1);
  color: white;
  font-size: 16px;
  font-family: Poppins-Regular, system-ui;
  padding: 15px 20px;
  cursor: pointer;
  border-radius: 20px;
}

.checkbox-google {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  margin-right: 10px;
  position: relative;
  vertical-align: middle;
  font-size: 14px;
  user-select: none;
}

.checkbox-google .checkbox-google-switch {
  display: inline-block;
  width: 36px;
  height: 14px;
  border-radius: 20px;
  position: relative;
  top: 6px;
  vertical-align: top;
  background: #9f9f9f;
  transition: 0.2s;
}

.checkbox-google .checkbox-google-switch:before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: -3px;
  left: -1px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition: 0.15s;
}

.checkbox-google input[type="checkbox"] {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.checkbox-google input[type="checkbox"]:checked + .checkbox-google-switch {
  background: #282828;
}

.checkbox-google
  input[type="checkbox"]:checked
  + .checkbox-google-switch:before {
  background: #e3e5e6;
  transform: translateX(18px);
}

/* Hover */
.checkbox-google
  input[type="checkbox"]:not(:disabled)
  + .checkbox-google-switch {
  cursor: pointer;
  border-color: rgba(0, 0, 0, 0.3);
}

/* Active/Focus */
.checkbox-google
  input[type="checkbox"]:not(:disabled):active
  + .checkbox-google-switch:before,
.checkbox-google
  input[type="checkbox"]:not(:disabled):focus
  + .checkbox-google-switch:before {
  animation: checkbox-active-on 0.5s forwards linear;
}

@keyframes checkbox-active-on {
  0% {
    box-shadow: 0 0 0 0 rgba(212, 212, 212, 0);
  }

  99% {
    box-shadow: 0 0 0 10px rgba(212, 212, 212, 0.5);
  }
}

.checkbox-google
  input[type="checkbox"]:not(:disabled):checked:active
  + .checkbox-google-switch:before,
.checkbox-google
  input[type="checkbox"]:not(:disabled):checked:focus
  + .checkbox-google-switch:before {
  animation: checkbox-active-off 0.5s forwards linear;
}

@keyframes checkbox-active-off {
  0% {
    box-shadow: 0 0 0 0 rgba(154, 190, 247, 0);
  }

  99% {
    box-shadow: 0 0 0 10px rgba(154, 190, 247, 0.5);
  }
}

/* Disabled */
.checkbox-google input[type="checkbox"]:disabled + .checkbox-google-switch {
  filter: grayscale(60%);
  border-color: rgba(0, 0, 0, 0.1);
}

.checkbox-google
  input[type="checkbox"]:disabled
  + .checkbox-google-switch:before {
  background: #eee;
}
</style>
