<template>
  <div class="content" v-if="!isLoading">
    <p class="title">My Feelings</p>
    <div class="main-content" v-if="feelings.length">
      <div class="first-data block">

        <!-- <div class="list">
          <div v-for="i in feelings.length" :key="i" style="position: relative;">
            <p
              class="list-item"
              @click="selectItem(i - 1)"
              :class="{ 'selected-in-list': i - 1 === selectedItemIndex }"
            >
              {{ feelings[i - 1].name }}
            </p>
            <div v-if="i - 1 === selectedItemIndex" class="save-button">
              <svg
                width="40"
                height="41"
                viewBox="0 0 40 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M37 20.5C37 29.8888 29.3888 37.5 20 37.5C10.6112 37.5 3 29.8888 3 20.5C3 11.1112 10.6112 3.5 20 3.5C29.3888 3.5 37 11.1112 37 20.5ZM20 12.5C20.5523 12.5 21 12.9477 21 13.5V20H27.5C28.0523 20 28.5 20.4477 28.5 21C28.5 21.5523 28.0523 22 27.5 22H21V28.5C21 29.0523 20.5523 29.5 20 29.5C19.4477 29.5 19 29.0523 19 28.5V22H12.5C11.9477 22 11.5 21.5523 11.5 21C11.5 20.4477 11.9477 20 12.5 20H19V13.5C19 12.9477 19.4477 12.5 20 12.5Z"
                  fill="#933EAC"
                />
              </svg>
              <p @click="deleteFeeling">Delete</p>
            </div>
          </div>
        </div> -->


        <div>
              <swiper
               class="scrollHeight"
              :slidesPerView="7"
              slideActiveClass="efef"
              :centeredSlides="true"
              :space-between="10"
              :slides-per-group="1"
              :mousewheel="true"
              :initial-slide="8"
              :direction="'vertical'"
            >
              <swiper-slide
                class="graytext"
                style="width: fit-content; position: relative;"
                v-for="i in feelings.length" :key="i">
                <p
                  class="list-item"
                  @click="selectItem(i - 1)"
                  :class="{ 'selected-in-list': i - 1 === selectedItemIndex }"
                >
                  {{ feelings[i - 1].name }}
                </p>
                <div v-if="i - 1 === selectedItemIndex" class="save-button">
                  <svg
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M37 20.5C37 29.8888 29.3888 37.5 20 37.5C10.6112 37.5 3 29.8888 3 20.5C3 11.1112 10.6112 3.5 20 3.5C29.3888 3.5 37 11.1112 37 20.5ZM20 12.5C20.5523 12.5 21 12.9477 21 13.5V20H27.5C28.0523 20 28.5 20.4477 28.5 21C28.5 21.5523 28.0523 22 27.5 22H21V28.5C21 29.0523 20.5523 29.5 20 29.5C19.4477 29.5 19 29.0523 19 28.5V22H12.5C11.9477 22 11.5 21.5523 11.5 21C11.5 20.4477 11.9477 20 12.5 20H19V13.5C19 12.9477 19.4477 12.5 20 12.5Z"
                      fill="#933EAC"
                    />
                  </svg>
                  <p @click="deleteFeeling">Delete</p>
                </div>

                </swiper-slide
              >
            </swiper>
          </div>

      </div>
      <div class="second-data block" v-if="feelings[selectedItemIndex]">
        <div>
          <div class="image-first" @click="showArticle(feelings[selectedItemIndex]?.articles[0])">
            <img class="inner-image" src="@/assets/images/article.svg" />
            <p class="inner-title">{{ feelings[selectedItemIndex]?.articles[0]?.title }}</p>
          </div>
          <div class="image-second" @click="showVideo(feelings[selectedItemIndex]?.videos[0])">
            <img class="inner-image" src="@/assets/images/video.svg" />
            <p class="inner-title">{{ feelings[selectedItemIndex]?.videos[0]?.title }}</p>
          </div>
        </div>
        <img
          src="@/assets/images/story.svg"
          class="image-first story-image"
          @click="showExercises(feelings[selectedItemIndex]?.exercises)"
        />
      </div>
    </div>
    <div class="main-content" style="margin-top: 20px; font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);" v-else>First add from main page!</div>
    <div style="height: 30px">
      <div class="read-button" @click="this.$router.push('/articles')">
        <p>{{ $t("READALLARTICLES") }}</p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_517_695)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.25 10C1.25 12.3206 2.17187 14.5462 3.81282 16.1872C5.45376 17.8281 7.67936 18.75 10 18.75C12.3206 18.75 14.5462 17.8281 16.1872 16.1872C17.8281 14.5462 18.75 12.3206 18.75 10C18.75 7.67936 17.8281 5.45376 16.1872 3.81282C14.5462 2.17187 12.3206 1.25 10 1.25C7.67936 1.25 5.45376 2.17187 3.81282 3.81282C2.17187 5.45376 1.25 7.67936 1.25 10ZM20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10ZM5.625 9.375C5.45924 9.375 5.30027 9.44085 5.18306 9.55806C5.06585 9.67527 5 9.83424 5 10C5 10.1658 5.06585 10.3247 5.18306 10.4419C5.30027 10.5592 5.45924 10.625 5.625 10.625H12.8663L10.1825 13.3075C10.1244 13.3656 10.0783 13.4346 10.0468 13.5105C10.0154 13.5864 9.99921 13.6678 9.99921 13.75C9.99921 13.8322 10.0154 13.9136 10.0468 13.9895C10.0783 14.0654 10.1244 14.1344 10.1825 14.1925C10.2406 14.2506 10.3096 14.2967 10.3855 14.3282C10.4614 14.3596 10.5428 14.3758 10.625 14.3758C10.7072 14.3758 10.7886 14.3596 10.8645 14.3282C10.9404 14.2967 11.0094 14.2506 11.0675 14.1925L14.8175 10.4425C14.8757 10.3844 14.9219 10.3155 14.9534 10.2395C14.9849 10.1636 15.0011 10.0822 15.0011 10C15.0011 9.91779 14.9849 9.83639 14.9534 9.76046C14.9219 9.68453 14.8757 9.61556 14.8175 9.5575L11.0675 5.8075C11.0094 5.74939 10.9404 5.70329 10.8645 5.67185C10.7886 5.6404 10.7072 5.62421 10.625 5.62421C10.5428 5.62421 10.4614 5.6404 10.3855 5.67185C10.3096 5.70329 10.2406 5.74939 10.1825 5.8075C10.1244 5.86561 10.0783 5.9346 10.0468 6.01052C10.0154 6.08644 9.99921 6.16782 9.99921 6.25C9.99921 6.33218 10.0154 6.41356 10.0468 6.48948C10.0783 6.5654 10.1244 6.63439 10.1825 6.6925L12.8663 9.375H5.625Z"
              fill="#281AC8"
              fill-opacity="0.93"
            />
          </g>
          <defs>
            <clipPath id="clip0_517_695"><rect width="20" height="20" fill="white" /></clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

import { useI18n } from "vue-i18n"
import { Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; 

import SwiperCore, { A11y, Autoplay } from "swiper";
import { Navigation, Pagination } from 'swiper';
import "swiper/swiper.min.css";
SwiperCore.use([Navigation, Pagination, A11y, Autoplay])

export default {
  setup() {
    const { t, locale } = useI18n({ useScope: "global" })
    return { t, locale }
  },
  components: {Swiper, SwiperSlide},
  name: "feeling-component",
  data() {
    return {
      isLoading: false,
      feelings: [],
      selectedItemIndex: 0,
      localFeel: []
    }
  },
  mounted() {
    this.loadAllFeelings()
  },
  methods: {
    loadAllFeelings() {
      this.feelings = JSON.parse(localStorage.getItem('myFeelings')) || []
    },
    deleteFeeling() {
      const idToDelete = this.feelings[this.selectedItemIndex].id; // Замените на нужный идентификатор объекта
      const savedData = JSON.parse(localStorage.getItem('myFeelings'));

      const updatedData = savedData.filter(item => item.id !== idToDelete);
      this.feelings = updatedData
      localStorage.setItem('myFeelings', JSON.stringify(updatedData));
      this.$toaster.success('Success');
    },
    selectItem(index) {
      this.selectedItemIndex = index
    },
    showArticle: function (article) {
      this.$emit("showArticle", article)
    },
    showVideo: function (video) {
      this.$emit("showVideo", video)
    },
    showExercises: async function (exercises) {
      this.$emit("showExercises", exercises)
      
        await this.$axios.put(`user/exercise/start/${exercises[0]?.id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
        .then(res => {
            this.$toaster.success('Задача при выполнении');
        })
    },
  },
}
</script>

<style scoped lang="scss">
.graytext {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100% !important;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
}
.scrollHeight {
  height: 500px;
  @media screen and (max-width: 768px) {
    height: 300px;
  }
}
.save-button {
  @media screen and (max-width: 768px) {
    position: absolute;
    top: -25%;
    left: 0;
    padding: 0;
    display: flex !important;
    p {
      font-size: 12px !important;
    }
  }
}

.save-button {
  @media screen and (max-width: 768px) {
    position: absolute;
    top: -25%;
    display: flex !important;
    p {
      font-size: 12px !important;
    }
  }
}

.content {
  width: 84%;
  background: #faf2ff;
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin: 66px auto 60px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding: 49px 81px 49px 81px;
}
.main-content {
  margin-bottom: 10px;
}
.title {
  color: #cd5fa5;
  font-size: 30px;
  line-height: 40px;
  font-family: Poppins-Regular, system-ui;
}
.list {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  @media screen and (max-width: 768px) {
  display: flex;
  gap: 16px;
  overflow: scroll;
  div {
    width: 100%;
    p {
      width: 100% !important;
    }
  }
  }
}
.list-item {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  text-align: center;
  color: #333333;
  font-size: 20px;
  line-height: 70px;
  font-family: Poppins-Light, system-ui;
}
.selected-in-list {
  color: black;
  font-size: 30px;
  background: linear-gradient(
    90deg,
    rgba(143, 115, 221, 0) 0%,
    rgba(149, 115, 221, 0.7) 24.48%,
    #9b73dd 48.77%,
    rgba(155, 115, 221, 0.7) 76.61%,
    rgba(181, 115, 221, 0) 100%
  );
  font-family: Poppins-Regular, system-ui;
}
.block {
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  margin-top: 12px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.inner-image {
  width: 100%;
  height: 100%;
}
.inner-title {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  font-size: 14px;
  line-height: 20px;
  font-family: Poppins-Light, system-ui;
  color: #333333;
  padding: 4px 17px;
  background: #fdf2f2;
  border-radius: 20px;
}
.image-first {
  position: relative;
  width: 48%;
  height: auto;
  margin-right: 2%;
  display: inline-block;
  vertical-align: middle;
}
.image-second {
  position: relative;
  width: 48%;
  height: auto;
  margin-left: 2%;
  display: inline-block;
  vertical-align: middle;
}
.story-image {
  margin-top: 20px;
}
.first-data {
}
.second-data {
}
.save-button {
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  width: max-content;
  transition: 0.3s;
}
.save-button:hover {
  background: rgba(155, 115, 221, 0.3);
}
.save-button svg {
  margin-left: 20px;
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
.save-button p {
  margin-right: 20px;
  font-family: Poppins-Regular, system-ui;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  color: #933eac;
  font-size: 23px;
  line-height: 25px;
}
img {
  cursor: pointer;
}
.read-button {
  margin-bottom: 20px;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  float: right;
  width: max-content;
  transition: 0.3s;
}
.read-button:hover {
  background: rgba(155, 115, 221, 0.3);
}
.read-button p {
  color: #281ac8ed;
  font-family: Poppins-Regular, system-ui;
  font-size: 16px;
  margin-left: 10px;
  line-height: 23px;
  display: inline-block;
  vertical-align: middle;
}
.read-button svg {
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

@media screen and (max-width: 1000px) {
  .content {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
}

@media screen and (max-width: 750px) {
  .block {
    width: 100%;
    display: block;
  }
}
</style>
