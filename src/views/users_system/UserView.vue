<template>
 <create-task-component
   v-if="isShowCreateTask"
   v-on:closeCreateTask="closeCreateReload(false)"
   v-on:closeCreateTaskReload="closeCreateReload(true)"
 />
 <div class="profile-container" v-if="isLoaded">
   <div class="div-upper-line"></div>
   <div class="main-container">
     <div class="profile-data-container">
       <div class="username-container">
         <div class="flex-center">
           <p class="hello-text">{{ $t("HELLO") }}, {{ profile?.fullName }}!</p>
           <p class="hello-hint">{{ $t("SEEYOU") }}</p>
         </div>
         <div class="flex-center" style="text-align: right">
           <div class="info-container">
             <p>“{{ $t("THOUSANDBATTLES") }}”</p>
             <svg
               width="24"
               height="20"
               viewBox="0 0 24 20"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <g clip-path="url(#clip0_106_273)">
                 <path
                   d="M12.9231 11.8182V17.2727C12.9231 18.0303 13.1923 18.6742 13.7308 19.2045C14.2692 19.7348 14.9231 20 15.6923 20H21.2308C22 20 22.6538 19.7348 23.1923 19.2045C23.7308 18.6742 24 18.0303 24 17.2727V7.27273C24 6.28788 23.8053 5.34801 23.4159 4.45312C23.0264 3.55824 22.5 2.78409 21.8365 2.13068C21.1731 1.47727 20.387 0.958807 19.4784 0.575284C18.5697 0.191761 17.6154 0 16.6154 0H15.6923C15.4423 0 15.226 0.0899621 15.0433 0.269886C14.8606 0.449811 14.7692 0.662879 14.7692 0.909091V2.72727C14.7692 2.97348 14.8606 3.18655 15.0433 3.36648C15.226 3.5464 15.4423 3.63636 15.6923 3.63636H16.6154C17.6346 3.63636 18.5048 3.99148 19.226 4.7017C19.9471 5.41193 20.3077 6.26894 20.3077 7.27273V7.72727C20.3077 8.10606 20.1731 8.42803 19.9038 8.69318C19.6346 8.95833 19.3077 9.09091 18.9231 9.09091H15.6923C14.9231 9.09091 14.2692 9.35606 13.7308 9.88636C13.1923 10.4167 12.9231 11.0606 12.9231 11.8182ZM0 11.8182V17.2727C0 18.0303 0.26923 18.6742 0.807692 19.2045C1.34615 19.7348 2 20 2.76923 20H8.30769C9.07692 20 9.73077 19.7348 10.2692 19.2045C10.8077 18.6742 11.0769 18.0303 11.0769 17.2727V7.27273C11.0769 6.28788 10.8822 5.34801 10.4928 4.45312C10.1034 3.55824 9.57692 2.78409 8.91346 2.13068C8.25 1.47727 7.46394 0.958807 6.55529 0.575284C5.64664 0.191761 4.69231 0 3.69231 0H2.76923C2.51923 0 2.30289 0.0899621 2.12019 0.269886C1.9375 0.449811 1.84615 0.662879 1.84615 0.909091V2.72727C1.84615 2.97348 1.9375 3.18655 2.12019 3.36648C2.30289 3.5464 2.51923 3.63636 2.76923 3.63636H3.69231C4.71154 3.63636 5.58173 3.99148 6.30289 4.7017C7.02404 5.41193 7.38461 6.26894 7.38461 7.27273V7.72727C7.38461 8.10606 7.25 8.42803 6.98077 8.69318C6.71154 8.95833 6.38461 9.09091 6 9.09091H2.76923C2 9.09091 1.34615 9.35606 0.807692 9.88636C0.26923 10.4167 0 11.0606 0 11.8182Z"
                   fill="#FFCDCD"
                 />
               </g>
               <defs>
                 <clipPath id="clip0_106_273">
                   <rect width="24" height="20" fill="white" transform="matrix(-1 0 0 1 24 0)" />
                 </clipPath>
               </defs>
             </svg>
           </div>
         </div>
       </div>
       <div class="task-count">
         <div class="task-count-block">
           <p>{{ completed }} {{ $t("TASKSCOMPLETED") }}</p>
           <svg
             width="12"
             height="16"
             viewBox="0 0 12 16"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               d="M10.4351 7.7925C10.3576 8.83459 9.71582 9.56619 8.97482 9.87625C8.18912 10.2049 7.39496 10.0236 6.99846 9.425C6.34929 8.44481 6.79536 7.76263 7.22672 7.10288C7.71583 6.35478 8.27025 5.50684 7.73849 3.85791C7.31871 2.55613 6.49659 1.46322 5.29492 0.609531C4.92032 0.343437 4.56505 0.143312 4.27673 0C4.67942 0.907562 5.20309 2.59641 4.65608 4.46228C4.30915 5.64581 3.39224 6.54269 2.50551 7.41003C1.33761 8.55247 0.129883 9.73378 0.129883 11.6213C0.129883 13.0855 0.680872 14.2519 1.76749 15.0882C2.59035 15.7214 3.43001 15.968 3.43838 15.97H5.44197L5.40003 15.9692C5.3923 15.9637 4.62899 15.4058 4.61584 14.766C4.60971 14.467 4.77921 14.1802 5.1196 13.9135C5.63089 13.5129 5.9119 13.0816 5.97875 12.5949C6.01964 12.2973 5.97831 11.9826 5.85268 11.643C6.70071 11.9723 7.57792 12.6913 7.87518 13.5838C8.14215 14.3853 7.89519 15.2097 7.1617 15.97H9.35443C10.7907 14.9281 11.5993 13.6796 11.7578 12.2591C11.9599 10.4479 11.0656 8.742 10.4351 7.7925Z"
               fill="black"
             />
           </svg>
         </div>
         <div class="task-count-block">
           <p>{{ inProgress }} {{ $t("INPROGRESS") }}</p>
           <svg
             width="17"
             height="16"
             viewBox="0 0 17 16"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               d="M8.61963 0C4.20825 0 0.619629 3.58862 0.619629 8C0.619629 12.4114 4.20825 16 8.61963 16C13.031 16 16.6196 12.4114 16.6196 8C16.6196 3.58862 13.031 0 8.61963 0ZM12.4243 12.1379C12.2943 12.2679 12.1237 12.3334 11.953 12.3334C11.7823 12.3334 11.6116 12.2679 11.4817 12.1379L8.14832 8.80469C8.02295 8.68005 7.953 8.51062 7.953 8.33337V4C7.953 3.63135 8.25159 3.33337 8.61963 3.33337C8.98767 3.33337 9.28625 3.63135 9.28625 4V8.05737L12.4243 11.1953C12.6849 11.4561 12.6849 11.8773 12.4243 12.1379Z"
               fill="#141720"
             />
           </svg>
         </div>
         <div class="task-count-block">
           <p>{{ total }} {{ $t("INTOTAL") }}</p>
           <svg
             width="21"
             height="21"
             viewBox="0 0 21 21"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               opacity="0.2"
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21Z"
               fill="url(#paint0_linear_106_268)"
             />
             <path
               opacity="0.2"
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
               fill="url(#paint1_linear_106_268)"
             />
             <path
               opacity="0.2"
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M10.5 14C12.433 14 14 12.433 14 10.5C14 8.567 12.433 7 10.5 7C8.567 7 7 8.567 7 10.5C7 12.433 8.567 14 10.5 14Z"
               fill="url(#paint2_linear_106_268)"
             />
             <defs>
               <linearGradient
                 id="paint0_linear_106_268"
                 x1="11.55"
                 y1="-3.30556"
                 x2="12.7348"
                 y2="33.8955"
                 gradientUnits="userSpaceOnUse"
               >
                 <stop />
                 <stop offset="1" stop-color="#5B5B5B" />
               </linearGradient>
               <linearGradient
                 id="paint1_linear_106_268"
                 x1="11.25"
                 y1="0.638889"
                 x2="12.0963"
                 y2="27.2111"
                 gradientUnits="userSpaceOnUse"
               >
                 <stop />
                 <stop offset="1" stop-color="#5B5B5B" />
               </linearGradient>
               <linearGradient
                 id="paint2_linear_106_268"
                 x1="10.85"
                 y1="5.89815"
                 x2="11.2449"
                 y2="18.2985"
                 gradientUnits="userSpaceOnUse"
               >
                 <stop stop-color="#111111" />
                 <stop offset="1" stop-color="#272727" />
               </linearGradient>
             </defs>
           </svg>
         </div>
         <div class="task-count-block">
           <!-- <p class="task-finish" @click="this.isShowCreateTask = true">{{ $t("CREATETASK") }}</p> -->
         </div>
       </div>
       <div class="tasks-container" v-if="total !== 0">
         <div class="task-container">
           <div class="task-data-container">
             <img class="task-image" src="@/assets/images/reading.svg" />
             <div class="task-read-data">
               <p class="task-title">{{ tasks[currentTaskIndex].name }}</p>
               <p class="task-hint">{{ $t("BY") }} {{ tasks[currentTaskIndex].author }}</p>
             </div>
           </div>
           <p class="task-finish" @click="finishTask" v-if="!tasks[currentTaskIndex].isFinished">
             {{ $t("FINISH") }}
           </p>
         </div>
         <div class="controller-buttons">
           <svg
             @click="prevTask"
             class="prev-button"
             width="54"
             height="59"
             viewBox="0 0 54 59"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <rect
               x="53.8025"
               width="58.5"
               height="52.9032"
               rx="20"
               transform="rotate(90 53.8025 0)"
               fill="url(#paint0_linear_105_1131)"
             />
             <path
               d="M19.1708 29.8132L20.297 29.8132L36.7251 29.8132C36.9337 29.8132 37.1863 29.6097 37.1863 29.2504C37.1863 28.8912 36.9336 28.6876 36.7251 28.6876L20.297 28.6876L19.1708 28.6876L19.9262 27.8522L24.4366 22.8645L24.4366 22.8645C24.6397 22.6399 24.6397 22.2569 24.4366 22.0322L19.1708 29.8132ZM19.1708 29.8132L19.9262 30.6486M19.1708 29.8132L19.9262 30.6486M19.9262 30.6486L24.4367 35.6363C24.6399 35.8609 24.6399 36.2439 24.4367 36.4686C24.2599 36.6641 23.9959 36.6641 23.8191 36.4686L17.6678 29.6666C17.4647 29.4419 17.4647 29.0589 17.6678 28.8342L17.297 28.4988M19.9262 30.6486L17.297 28.4988M17.297 28.4988L17.6678 28.8342L23.8188 22.0323L17.297 28.4988ZM24.1278 21.8855C24.2296 21.8855 24.3418 21.9275 24.4366 22.0322L23.819 22.0322C23.9138 21.9274 24.026 21.8855 24.1278 21.8855Z"
               fill="#0C0B0B"
               stroke="#0C0B0B"
             />
             <defs>
               <linearGradient
                 id="paint0_linear_105_1131"
                 x1="112.302"
                 y1="0"
                 x2="52.5024"
                 y2="45.216"
                 gradientUnits="userSpaceOnUse"
               >
                 <stop stop-color="#FFEACC" />
                 <stop offset="1" stop-color="#FFCDEC" />
               </linearGradient>
             </defs>
           </svg>
           <svg
             @click="nextTask"
             class="next-button"
             width="53"
             height="59"
             viewBox="0 0 53 59"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <rect
               x="0.0966797"
               y="59"
               width="58.5"
               height="52.9032"
               rx="20"
               transform="rotate(-90 0.0966797 59)"
               fill="url(#paint0_linear_105_1125)"
             />
             <path
               d="M34.7287 29.1868H33.6024H17.1743C16.9658 29.1868 16.7131 29.3903 16.7131 29.7496C16.7131 30.1088 16.9658 30.3124 17.1743 30.3124H33.6024H34.7286L33.9732 31.1478L29.4629 36.1355L29.4629 36.1355C29.2597 36.3601 29.2597 36.7431 29.4628 36.9678L34.7287 29.1868ZM34.7287 29.1868L33.9732 28.3514M34.7287 29.1868L33.9732 28.3514M33.9732 28.3514L29.4627 23.3637C29.2595 23.1391 29.2595 22.7561 29.4627 22.5314C29.6395 22.3359 29.9035 22.3359 30.0803 22.5314L36.2316 29.3334C36.4348 29.5581 36.4348 29.9411 36.2316 30.1658L36.6024 30.5012M33.9732 28.3514L36.6024 30.5012M36.6024 30.5012L36.2316 30.1658L30.0806 36.9677L36.6024 30.5012ZM29.7717 37.1145C29.6698 37.1145 29.5576 37.0725 29.4629 36.9678L30.0804 36.9678C29.9856 37.0726 29.8734 37.1145 29.7717 37.1145Z"
               fill="#0C0B0B"
               stroke="#0C0B0B"
             />
             <defs>
               <linearGradient
                 id="paint0_linear_105_1125"
                 x1="58.5967"
                 y1="59"
                 x2="-1.20338"
                 y2="104.216"
                 gradientUnits="userSpaceOnUse"
               >
                 <stop stop-color="#FFEACC" />
                 <stop offset="1" stop-color="#FFCDEC" />
               </linearGradient>
             </defs>
           </svg>
         </div>
       </div>
     </div>
     <div class="image-container">
       <img class="profile-image" src="/img/profile_image.svg" />
       <p class="log-out-button" @click="logoutAccount()">{{ $t("LOGOUT") }}</p>
     </div>
   </div>
   <div class="statistics">
     <div class="statistics__title">
       <p class="statistics__title-text">Statistics</p>
       <div class="statistics__title-year">
         <svg
           @click="minusYear"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M15 6L9 12L15 18"
             stroke="black"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
         </svg>
         <p>{{ statisticsYear }}</p>
         <svg
           @click="plusYear"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M9 6L15 12L9 18"
             stroke="black"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
           />
         </svg>
       </div>
     </div>
     <div class="statistics__table">
       <!-- <img src="/img/statistics.png" alt="" /> -->
       <div class="lineChartStyle">
         <LineChart class="lineChartStyle__stat"/>
       </div>
     </div>
   </div>
 </div>

 <div id="pricing">
   <div class="price_card alpha">
     <div class="header">
       <span class="price">Free</span>
       <span class="name">{{ $t("WEEKLYSUBSCRIPTION") }}</span>
     </div>
     <ul class="features">
       <li>{{ $t("STATISTICS") }}</li>
       <li>{{ $t("STANDARTFUNC") }}</li>
     </ul>
     <button>Available</button>
   </div>
   <!-- <div class="price_card bravo">
     <div class="header">
       <span class="price">$15</span>
       <span class="name">{{ $t("14DAYS") }}</span>
     </div>
     <ul class="features">
       <li>{{ $t("PREMIUMACCESS") }}</li>
       <li>{{ $t("MOREINFORMATION") }}</li>
       <li>{{ $t("AUDIOMATERIAL") }}</li>
     </ul>
     <button>{{ $t("TRYFORFREE") }}</button>
   </div> -->
   <div class="price_card charlie" v-if="!buyForm">
     <div class="header">
       <span class="price">9 990₸</span>
       <span class="name">{{ $t("MONTHLYSUBSCRIPTION") }}</span>
     </div>
     <ul class="features">
       <li>{{ $t("PREMIUMACCESS") }}</li>
       <li>{{ $t("MOREINFORMATION") }}</li>
       <li>{{ $t("EBOOKS") }}</li>
       <li>{{ $t("PODCAST") }}</li>
     </ul>
     <button @click="buyForm = true">{{ $t("TRYFORFREE") }}</button>
   </div>
   <form v-if="buyForm" @submit.prevent="buy_post" class="buy-form">
     <div class="form-inputs">
       <input
         type="text"
         class="buy-form__num"
         v-model="card_num"
         required
         placeholder="Card number"
       />
       <input
         type="text"
         class="buy-form__date"
         v-model="card_date"
         required
         placeholder="Expiration date"
       />
       <input type="text" class="buy-form__cvv" v-model="card_cvv" required placeholder="CVV" />
     </div>
     <div class="form-inputs">
       <input
         type="text"
         class="buy-form__num owner"
         v-model="card_owner"
         required
         placeholder="Owner"
       />
       <img src="/img/visa.png" alt="" />
     </div>
     <button class="courses__preview-info-btns-buy" type="submit" style="margin-top: 15px">
       Buy now
     </button>
     <p class="success_buy" v-if="successBuy">Purchased successfully</p>
   </form>
 </div>

</template>

<script>
import CreateTaskComponent from "@/components/alert/create_task.vue"
import { useI18n } from "vue-i18n"
import { ref } from "vue"
import LineChart from "@/components/chart_js/LineChart.vue"
import { mapActions } from 'vuex'

export default {
 setup() {
   const buyed = ref(false)

   const buyForm = ref(false)
   const successBuy = ref(false)

   const card_num = ref("")
   const card_date = ref("")
   const card_cvv = ref("")
   const card_owner = ref("")

   const buy_post = () => {
     successBuy.value = true
     setTimeout(() => {
       buyed.value = true
       buyForm.value = false
       card_num.value = ""
       card_date.value = ""
       card_cvv.value = ""
       card_owner.value = ""
     }, 2000)
   }

   const { t, locale } = useI18n({ useScope: "global" })
   return { t, locale, buy_post, buyForm, successBuy, buyed }
 },
 components: { CreateTaskComponent, LineChart },
 data() {
   return {
     profile: null,
     isLoaded: true, // TODO false
     tasks: [],
     total: 0,
     completed: 0,
     inProgress: 0,
     currentTaskIndex: 0,
     isShowCreateTask: false,
     statisticsYear: 2023,
     point: 4.5,
   }
 },
 mounted() {
   this.loadProfile()
   this.loadTasks()
 },
 methods: {
  ...mapActions(["logoutUser"]),
   loadProfile() {
     // api.profile
     //   .getProfile()
     //   .then((response) => {
     //     this.profile = response.data
     //   })
     //   .catch(() => {
     //     this.logoutAccount()
     //   })
   },
   loadTasks() {
     // api.task.getMyTasks().then((response) => {
     //   this.tasks = response.data
     //   this.total = this.tasks.length
     //   this.completed = 0
     //   for (let i = 0; i < this.total; i++) {
     //     if (this.tasks[i].isFinished) {
     //       this.completed++
     //     }
     //   }
     //   this.inProgress = this.total - this.completed
     //   this.isLoaded = true
     // })
   },
   prevTask() {
     if (this.currentTaskIndex === 0) {
       this.currentTaskIndex = this.total - 1
     } else {
       this.currentTaskIndex--
     }
   },
   nextTask() {
     if (this.currentTaskIndex === this.total - 1) {
       this.currentTaskIndex = 0
     } else {
       this.currentTaskIndex++
     }
   },
   finishTask() {
     // api.task
     //   .finishTask({
     //     data: {
     //       id: this.tasks[this.currentTaskIndex].id,
     //     },
     //   })
     //   .then(() => {
     //     this.loadTasks()
     //   })
   },
   closeCreateReload(reload) {
     this.isShowCreateTask = false
     if (reload) {
       this.loadTasks()
     }
   },
   logoutAccount() {
      this.logoutUser()
     this.$router.push("/")
   },
   minusYear() {
     this.statisticsYear--
     this.point = this.point - 0.1
   },
   plusYear() {
     this.statisticsYear++
     this.point = this.point + 0.1
   },
 },
}
</script>

<style scoped>
.statistics__title-year {
 display: flex;
 align-items: center;
 gap: 15px;
}
.statistics__title-year p {
 font-weight: 600;
 font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);
 color: #000000;
}
.statistics__title-year svg {
 cursor: pointer;
}
.statistics__title-text {
 font-weight: 700;
 font-size: 28px;
 color: #b300d7;
}
.statistics__title {
 display: flex;
 align-items: center;
 justify-content: space-between;
}
.statistics {
 padding: 0px 270px;
 margin-top: 70px;
}
#pricing {
 width: 989px;
 margin: 100px auto;
 font-family: "Open Sans", Helvetica;
 display: flex;
 justify-content: center;
}
.price_card button {
 cursor: pointer;
 transition: all 0.3s ease;
}
.price_card button:hover {
 background: rgb(163, 44, 153);
}
.price_card {
 width: 300px;
 background: rgb(255, 255, 255);
 display: inline-table;
 top: 0;
}
.price_card:not(:last-child) {
 margin-right: 40px;
}
.header {
 color: rgb(255, 255, 255);
}
.alpha .header {
 background: linear-gradient(178.18deg, #fd749b -13.56%, #281ac8 158.3%);
}
.bravo .header {
 background: rgb(246, 77, 77);
}
.charlie .header {
 background: linear-gradient(178.18deg, #db2156 -13.56%, #004fd6 158.3%);
}
.price {
 width: 100%;
 font-size: 60px;
 font-weight: 300;
 display: block;
 text-align: center;
 padding: 30px 0 10px;
}
.name {
 width: 100%;
 font-size: 15px;
 font-weight: 700;
 display: block;
 text-align: center;
 padding: 0 0 30px;
}
.features {
 list-style: none;
 text-align: center;
 color: rgb(138, 138, 138);
 margin: 0;
 padding: 0;
}
.features li {
 margin: 0 35px;
 padding: 20px 15px;
 width: 200px;
}
.features li:not(:last-child) {
 border: 1px solid rgb(242, 242, 242);
 border-top: 0;
 border-left: 0;
 border-right: 0;
}
button {
 color: rgb(255, 255, 255);
 border: 0;
 border-radius: 5px;
 height: 40px;
 width: 220px;
 display: block;
 font-weight: 700;
 font-size: 15px;
 text-transform: uppercase;
 margin: 20px auto 35px;
}
.alpha button {
 background: rgb(175, 9, 162);
}
.bravo button {
 background: rgb(246, 77, 77);
}
.charlie button {
 background: rgb(205, 0, 219);
}
.tip {
 font-family: "Indie Flower";
 position: absolute;
 color: rgb(117, 117, 117);
 margin: 10px 5px;
}

.profile-container {
 background: #fafafa;
 width: 100%;
 padding-bottom: 50px;
 margin-bottom: 100px;
}
.div-upper-line {
 background: #ffc6fd;
 width: 100%;
 height: 1px;
}
.main-container {
 margin-top: 30px;
 margin-left: auto;
 margin-right: auto;
 display: flex;
 width: 80%;
}
.profile-image {
 width: 300px;
 height: 300px;
}
.image-container {
 margin-left: -50px;
 align-self: center;
}
.profile-data-container {
 flex: 1;
 background: white;
 border-radius: 30px;
 padding: 40px 60px;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;
}
.username-container {
 padding: 30px 20px;
 background: #ffeaea;
 border-radius: 30px;
 text-align: center;
 display: flex;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;
}
.flex-center {
 flex: 1;
 text-align: center;
}
.hello-text {
 color: black;
 font-family: Poppins-Bold, system-ui;
 font-size: 30px;
 font-weight: 700;
}
.hello-hint {
 margin-top: 10px;
 font-size: 14px;
 font-family: Poppins-Light, system-ui;
 color: black;
 font-weight: 500;
}
.info-container {
 background: white;
 border-radius: 16px;
 padding: 20px 15px;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;
 display: flex;
}
.info-container > p {
 color: #707070;
 flex: 1;
 text-align: start;
 align-self: center;
 font-family: Poppins-Light, system-ui;
 font-size: 14px;
 line-height: 16px;
}
.info-container > svg {
 align-self: center;
}
.task-count {
 width: 100%;
 text-align: center;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;
}
.task-count-block {
 display: inline-block;
 vertical-align: middle;
 margin: 30px 25px;
}
.task-count-block > p {
 color: black;
 font-size: 16px;
 font-family: Poppins-Light, system-ui;
 margin-right: 10px;
 display: inline-block;
 vertical-align: middle;
}
.task-count-block > svg {
 display: inline-block;
 vertical-align: middle;
 width: 16px;
 height: 16px;
}
.tasks-container {
 display: flex;
}
.task-container {
 flex: 1;
 display: flex;
 background: linear-gradient(
   235.64deg,
   rgba(116, 116, 221, 0.3) 0%,
   rgba(255, 210, 238, 0.3) 95.42%
 );
 border-radius: 20px;
 padding: 15px;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;
}
.task-data-container {
 flex: 1;
}
.task-image {
 height: 100px;
 width: 100px;
 border-radius: 20px;
 display: inline-block;
 vertical-align: middle;
}
.task-read-data {
 margin-left: 20px;
 display: inline-block;
 vertical-align: middle;
}
.task-title {
 color: black;
 font-size: 16px;
 font-family: Poppins-Bold, system-ui;
}
.task-hint {
 color: black;
 font-size: 12px;
 margin-top: 12px;
 font-family: Poppins-Light, system-ui;
}
.task-finish {
 color: white !important;
 font-family: Poppins-Bold, system-ui;
 height: max-content;
 align-self: center;
 cursor: pointer;
 font-size: 11px;
 padding: 12px 34px;
 background: linear-gradient(235.64deg, #7474dd 0%, #ffcdec 95.42%);
 border-radius: 20px;
}
.controller-buttons {
 align-self: center;
 text-align: right;
}
.next-button {
 width: 52px;
 height: 58px;
 cursor: pointer;
 margin-left: 20px;
}
.prev-button {
 width: 52px;
 height: 58px;
 margin-left: 20px;
 cursor: pointer;
}
.log-out-button {
 width: max-content;
 margin-left: auto;
 margin-right: auto;
 margin-top: 10px;
 color: rgb(255, 255, 255);
 font-family: Poppins-Bold, system-ui;
 height: max-content;
 align-self: center;
 cursor: pointer;
 font-size: 14px;
 padding: 12px 34px;
 border: rgb(143, 0, 0) solid 1px;
 border-radius: 20px;
 font-weight: 600;
 background: rgb(143, 0, 0);
 transition: all 0.3s ease;
}
.log-out-button:hover {
 background: rgb(255, 255, 255);
 color: rgb(254, 0, 0);
 border: rgb(254, 0, 0) solid 1px;
}
.statistics__table {
 display: flex;
 justify-content: center;
 margin-top: -5px;
 position: relative;
}
.statistics__table-point {
 font-weight: 600;
 font-size: 16px;
 color: #ffffff;
 text-align: center;
 padding: 15px 40px;
 background: rgba(29, 30, 64, 0.86);
 box-shadow: 0px 8px 40px rgba(73, 28, 100, 0.2);
 border-radius: 8px;
 max-height: 40px;
 position: absolute;
 top: 95px;
 right: 235px;
}

.buy-form {
 width: 40%;
 display: flex;
 flex-direction: column;
 gap: 10px;
 margin-top: 25px;
}
.form-inputs {
 display: flex;
 align-items: center;
 justify-content: space-between;
 gap: 10px;
}
.buy-form__num,
.buy-form__date,
.buy-form__cvv {
 width: 100%;
 border: none;
 border-bottom: 1px solid #000000;
 padding: 5px 10px;
 background: transparent;
 outline: none;
 margin: 0 auto;
 color: white;
 font-weight: 500;
 font-size: 16px;
}
.buy-form__date {
 width: 70%;
}
.buy-form__cvv {
 width: 30%;
}
.form-inputs input {
 color: #000000;
}
.form-inputs input::placeholder {
 color: #383838;
 font-weight: 500;
 font-size: 16px;
}
.form-inputs img {
 width: 130px;
}
.owner {
 text-transform: uppercase;
}
.owner::placeholder {
 text-transform: none;
}
.success_buy {
 display: flex;
 align-items: center;
 justify-content: center;
 font-weight: 700;
 font-size: 16px;
 color: #00cb07;
 margin-top: -30px;
}
.courses__preview-info-btns-buy {
 display: flex;
 align-items: center;
 justify-content: center;
 width: 100%;
 padding: 20px 0px;
 background: #028602;
 border-radius: 30px;
 border: none;
 font-weight: 700;
 font-size: 15px;
 color: #ffffff;
 cursor: pointer;
 transition: all 0.3s ease;
}
.courses__preview-info-btns-buy:hover {
 background: #77006d;
}

.lineChartStyle {
 margin-top: 40px;
 background: #FFFFFF;
 box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
 border-radius: 24px;
 padding: 100px 60px 50px 60px;
 width: 100%;
 height: 500px;
 box-sizing: border-box;
}
.lineChartStyle__stat {
 width: 100%;
 height: 100%;
}
</style>
