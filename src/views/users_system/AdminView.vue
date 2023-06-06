<template>
  <div class="container">
    <div class="profile-container" v-if="isLoaded">
    <div class="div-upper-line"></div>
    <div class="admin">
      <div class="admin__navs">
        <div
          class="admin__navs-button"
          v-for="item in navs"
          :class="{ active: currentroute === item.slug }"
          :key="item"
          @click="$router.push('/admin/' + item.slug)"
        >
          {{ $t(item.title)}}
        </div>
      </div>
      <div class="admin__content">
        <div class="main-container" v-if="currentroute === 'main'">
          <div class="profile__top">
            <div class="profile__top__left">
              <div class="profile__top__left__info">
                <div class="profile__top__left__info__user">
                  <p class="profile__top__left__info__user-p1">
                    {{ $t("hello") }} {{ getUser.fullName }}!
                  </p>
                  <p class="profile__top__left__info__user-p2">
                    {{ $t("profileDesc") }}
                  </p>
                </div>
                <div class="profile__top__left__info__citata">
                  <p>{{ $t("profileCitata") }}</p>
                  <img src="@/assets/icons/kov.png" />
                </div>
              </div>
            </div>
            <div class="profile__top__right">
              <img src="@/assets/icons/avatar.png" />
              <button @click="logoutAccount">{{ $t("leave") }}</button>
            </div>
          </div>
        </div>
        <div
          class="admin__content-statistics"
          v-if="currentroute === 'terapevts'"
        >
          <h2>{{ $t('listTer') }}</h2>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :search-options="{
              enabled: true,
            }"
            :sort-options="{
              enabled: true,
            }"
            theme="polar-bear"
          />
        </div>
        <div class="admin__content-statistics" v-if="currentroute === 'users'">
          <h2>{{ $t('listUser') }}</h2>
          <vue-good-table
            :columns="columns"
            :rows="rows1"
            :search-options="{
              enabled: true,
            }"
            :sort-options="{
              enabled: true,
            }"
            theme="polar-bear"
          />
        </div>
        <div
          class="admin__content-statistics"
          v-if="currentroute === 'statistics'"
        >
          <h2>{{ $t('statistics') }}</h2>
          <div class="lineChartStyle">
            <LineChart class="lineChartStyle__stat" />
          </div>
        </div>
        <div class="admin__content-statistics" v-if="currentroute === 'chat'">
          <h2>{{ $t('chats') }}</h2>
          <vue-advanced-chat
            :current-user-id="getUser.id"
            :rooms="JSON.stringify(rooms)"
            :messages="JSON.stringify(messages)"
            :room-actions="JSON.stringify(roomActions)"
            @fetch-messages="fetchMess"
            @send-message="sendMessage"
            is="vue-advanced-chat"
          />
        </div>
        <div class="admin__content-vebinars" v-if="currentroute === 'vebinars'">
          <div class="admin__content-vebinars-title">
            <p>{{ $t("vebinarsTitle") }}</p>
            <div @click="vebBoolAdd = true">{{ $t("vebinarsButton") }}</div>
          </div>
          <div
            class="admin__content-vebinars-item"
            v-for="(item, idx) in articles"
            :key="item"
          >
            <div class="deleteVebinar" @click="deleteVebinar(item.id)">
              <img src="@/assets/icons/close.png" />
            </div>
            <VebinarCard
              :data="item"
              data-aos="zoom-in"
              data-aos-delay="600"
              data-aos-duration="800"
            />
          </div>
        </div>
        <div class="admin__content-feelings" v-if="currentroute === 'feelings'">
          <div class="admin__content-vebinars-title">
            <p>{{ $t("feelingsTitle") }}</p>
            <div @click="feelBoolAdd = true">{{ $t("feelingsButton") }}</div>
          </div>
          <div class="admin__content-feelings-content" v-if="feeling.length">
            <div
              class="admin__content-feelings-content-item"
              @click="(feelBool = true), (curFeelId = item.id)"
              v-for="item in feeling"
              :key="item"
            >
              <div class="admin__content-feelings-content-item-text">
                <p class="admin__content-feelings-content-item-text-p1">{{ $t('name') }}:</p>
                <p class="admin__content-feelings-content-item-text-p2">{{ item.name }}</p>
              </div>
              <p class="admin__content-feelings-content-item-p2">{{ $t('score') }}: {{ item.score }}</p>
              <p class="admin__content-feelings-content-item-line"></p>
              <p class="admin__content-feelings-content-item-p2">{{ $t('aritc1') }}: {{ item.videos.length }}</p>
              <p class="admin__content-feelings-content-item-line"></p>
              <p class="admin__content-feelings-content-item-p2">{{ $t('aritc2') }}: {{ item.articles.length }}</p>
              <p class="admin__content-feelings-content-item-line"></p>
              <p class="admin__content-feelings-content-item-p2">{{ $t('aritc3') }}: {{ item.exercises.length }}</p>
              <p class="admin__content-feelings-content-item-line"></p>
            </div>
          </div>
          <p v-else>Нет данных</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  <ModalFeeling
    :value="feelBool"
    @fetch="fetFeel()"
    @close="(feelBool = false), (curFeelId = null)"
    :current="curFeelId"
  />
  <ModalAddFeeling
    :value="feelBoolAdd"
    @fetch="fetFeel()"
    @close="feelBoolAdd = false"
  />
  <ModalAddVebinars
    :value="vebBoolAdd"
    @fetch="fetchVeb()"
    @close="vebBoolAdd = false"
  />
</template>
   
   <script>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import { register } from "vue-advanced-chat";
import LineChart from "@/components/LineChart.vue";
import VebinarCard from "@/components/VebinarCard.vue";
import ModalFeeling from "@/components/modals/ModalFeeling.vue";
import ModalAddFeeling from "@/components/modals/ModalAddFeeling.vue";
import ModalAddVebinars from "@/components/modals/ModalAddVebinars.vue";
import { io } from "socket.io-client";
register();

export default {
  setup() {
    const buyed = ref(false);

    const buyForm = ref(false);
    const successBuy = ref(false);

    const card_num = ref("");
    const card_date = ref("");
    const card_cvv = ref("");
    const card_owner = ref("");

    const buy_post = () => {
      successBuy.value = true;
      setTimeout(() => {
        buyed.value = true;
        buyForm.value = false;
        card_num.value = "";
        card_date.value = "";
        card_cvv.value = "";
        card_owner.value = "";
      }, 2000);
    };

    const { t, locale } = useI18n({ useScope: "global" });
    return { t, locale, buy_post, buyForm, successBuy, buyed };
  },
  components: {
    LineChart,
    VebinarCard,
    ModalFeeling,
    ModalAddFeeling,
    ModalAddVebinars,
  },
  data() {
    return {
      profile: null,
      isLoaded: true, // TODO false
      tasks: [],
      feelBool: false,
      feelBoolAdd: false,
      vebBoolAdd: false,
      curFeelId: null,
      total: 0,
      completed: 0,
      inProgress: 0,
      currentTaskIndex: 0,
      isShowCreateTask: false,
      statisticsYear: 2023,
      currentUserId: "1234",
      rooms: [],
      articles: [],
      feeling: [],
      messages: [],
      roomActions: [
        { name: "inviteUser", title: "Invite User" },
        { name: "removeUser", title: "Remove User" },
        { name: "deleteRoom", title: "Delete Room" },
      ],
      point: 4.5,
      navs: [
        {
          slug: "main",
          title: "main",
        },
        {
          slug: "terapevts",
          title: "therapist",
        },
        {
          slug: "users",
          title: "users",
        },
        {
          slug: "feelings",
          title: "feelingsTitle",
        },
        {
          slug: "vebinars",
          title: "vebinarsTitle",
        },
        {
          slug: "statistics",
          title: "statistics",
        },
        {
          slug: "chat",
          title: "chats",
        },
      ],
      currentroute: "main",
      columns: [
        {
          label: "Id",
          field: "id",
        },
        {
          label: this.$t('fullName'),
          field: "fullName",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: this.$t('score'),
          field: "score",
          type: "number",
        },
        {
          label: this.$t('isSubs'),
          field: "isSubscriber",
        },
      ],
      rows: [],
      rows1: [],
      pagesUsers: 1,
    };
  },
  async created() {
    this.fetchVeb();
    this.$axios
      .get("user?role=MANAGER")
      .then((res) => {
        this.rows = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.fetFeel();
    await this.$axios
      .get("user?role=USER")
      .then((res) => {
        this.rows1 = res.data.data;
        let result = res.data.count / 10;
        result = Math.floor(result);
        result %= 10;
        this.pagesUsers = result + 1;
      })
      .catch((err) => {
        console.log(err);
      });
    for (let index = 2; index <= this.pagesUsers; index++) {
      this.$axios.get(`user?role=USER&page=${index}`).then((res) => {
        this.rows1 = [...this.rows1, ...res.data.data];
      });
    }
    this.fetFeel();

    this.currentroute = this.$route?.params?.slug || "main";
    this.loadProfile();
    this.loadTasks();
  },
  mounted() {
    const socket = io("https://back-sezin.devup.kz/", {
      query: {
        token: localStorage.getItem("access_token"),
      },
    });

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("rooms", (data) => {
      console.log("Rooms:", data);
      this.rooms = data.map((room, index) => {
        return {
          roomId: room.id, // Изменяем поле "id" на "roomId"
          roomName: `room${index + 1}`, // Добавляем поле "roomName" с соответствующим значением
          createAt: room.createAt,
          updatedAt: room.updatedAt,
          combination: room.combination,
          users: room.users.map((user) => {
            return {
              _id: user.id, // Изменяем поле "id" на "_id"
              email: user.email,
              username: user.fullName, // Изменяем поле "fullName" на "username"
              // Остальные поля пользователя, если есть
            };
          }),
        };
      });
    });
    
    socket.on("update", (data) => {
      console.log("update", data);
    });

    socket.on("message", (message) => {
      console.log("Message Added:", message);
      this.sockmess.push(message);
    });

    // сохраняем socket в компоненте, чтобы его можно было использовать в других методах
    this.socket = socket;
  },
  watch: {
    "$route.params.slug"() {
      this.currentroute = this.$route.params.slug;
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
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
    fetchMess(room, options) {
      console.log(room.detail[0].room.roomId);
      this.$axios
        .get(`chat/${room.detail[0].room.roomId}`)
        .then((res) => {
          this.messages = res.data.map((message) => {
            return {
              _id: message.id, // Изменяем поле "id" на "_id"
              content: message.text,
              createAt: message.createAt,
              updatedAt: message.updatedAt,
              senderId: message.user.id, // Добавляем поле "senderId" равное значению "user.id"
              user: {
                _id: message.user.id, // Изменяем поле "id" на "_id" в объекте "user"
                email: message.user.email,
                fullName: message.user.fullName,
                score: message.user.score,
                isSubscriber: message.user.isSubscriber,
                // Остальные поля пользователя, если есть
              },
            };
          });
        })
        .catch((err) => {
          this.messages = [];
        });
    },
    sendMessage(roomId) {
      this.socket.emit("add-message", {
        text: roomId.detail[0].content,
        userId: this.getUser.id,
        roomId: roomId.detail[0].roomId,
      });
      this.messages.push({
        content: 3213,
        sellerId: this.getUser.id,
        roomId: roomId.detail[0].roomId,
      })
    },
    createRoom() {
      this.$axios.get(`chat/${this.roomIds}`).then((res) => {
        this.sockmess = res.data;
      });
      this.socket.emit("create-room", { email: "diana@gmail.com" });
    },
    addMessage() {
      this.socket.emit("add-message", {
        text: "привет",
        userId: this.getUser.id,
        roomId: this.roomIds,
      });
    },
    joinRoom() {
      this.socket.emit("join-room", { data: this.roomIds });
    },
    leaveRoom() {
      this.socket.emit("leaveRoom", this.roomIds);
    },
    async fetFeel() {
      await this.$axios
        .get("feeling")
        .then((res) => {
          this.feeling = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchVeb() {
      this.$axios
        .get("vebinar")
        .then((res) => {
          this.articles = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteVebinar(value) {
      this.$axios
        .delete(`vebinar/${value}`)
        .then((res) => {
          this.fetchVeb();
          this.$toaster.success("Success");
        })
        .catch((err) => {
          console.log(err);
        });
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
        this.currentTaskIndex = this.total - 1;
      } else {
        this.currentTaskIndex--;
      }
    },
    nextTask() {
      if (this.currentTaskIndex === this.total - 1) {
        this.currentTaskIndex = 0;
      } else {
        this.currentTaskIndex++;
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
      this.isShowCreateTask = false;
      if (reload) {
        this.loadTasks();
      }
    },
    logoutAccount() {
      this.logoutUser();
      this.$router.push("/");
    },
    minusYear() {
      this.statisticsYear--;
      this.point = this.point - 0.1;
    },
    plusYear() {
      this.statisticsYear++;
      this.point = this.point + 0.1;
    },
  },
};
</script>
   
   <style lang="scss" scoped>
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
  background: white;
  width: 100%;
  padding-bottom: 50px;
  margin-bottom: 100px;
  @media screen and (max-width: 768px) {
      margin-top: 80px;
      margin-bottom: 136px;
  }
}
.div-upper-line {
  background: #ffc6fd;
  width: 100%;
  height: 1px;
}

.admin {
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 2%;
  margin: 0 auto;
  margin-top: 50px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
  &__navs {
    width: 18%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    &-button {
      padding: 20px 30px;
      border: 2px solid #fd749b;
      border-radius: 10px;
      text-align: center;
      font-size: min(max(13px, calc(0.8125rem + ((1vw - 4.2px) * 0.4902))), 18px);
      transition: all 0.5s ease;
      @media screen and (max-width: 768px) {
        padding: 5px 30px;
      }
      &:hover {
        cursor: pointer;
        background: linear-gradient(178.18deg, #fd749b -13.56%, #281ac8 158.3%);
        color: white;
        transform: scale(1.03);
      }
    }
    .active {
      background: linear-gradient(178.18deg, #fd749b -13.56%, #281ac8 158.3%);
      color: white;
    }
  }
  &__content {
    width: 80%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    h2 {
      font-family: Mulish-Bold, system-ui;
      margin-top: 0;
    }
    &-vebinars {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 2%;
      &-item {
        width: 32%;
        @media screen and (max-width: 768px) {
          width: 48%;
        }
        &:hover {
          cursor: pointer;
          .deleteVebinar {
            display: flex;
          }
        }
      }
      &-title {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        p {
          color: #b247a7;
          font-weight: 300;
          font-size: min(max(19px, calc(1.1875rem + ((1vw - 4.2px) * 1.6667))), 36px);
        }
        div {
          line-height: 30px;
          background: linear-gradient(
            178.18deg,
            #fd749b -13.56%,
            #281ac8 158.3%
          );
          color: #fff;
          font-size: 16px;
          font-family: Poppins-Regular, system-ui;
          padding: 6px 40px;
          cursor: pointer;
          border-radius: 14px;
          transition: all 0.5s ease;
          &:hover {
            cursor: pointer;
            transform: scale(1.03);
          }
        }
      }
    }
    &-feelings {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 20px;
      &-content {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        row-gap: 16px;
        column-gap: 1.3%;
        &-item {
          background: url('@/assets/images/backgroundFill.jpg');
          width: 28%;
          border-radius: 15px;
          color: white;
          padding: 20px;
          border: 1px solid #252525;
          transition: all 0.5s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
          @media screen and (max-width: 768px) {
            width: 38%;
          }
          &-text {
            text-align: center;
            &-p1 {
              font-size: 11px;
            }
            &-p2 {
              font-size: 22px;
            }
          }
          &-line {
            height: 2px;
            width: 100%;
            background: rgb(216, 189, 212);
          }
          &-p2 {

          }
          &:hover {
            cursor: pointer;
            transform: scale(1.04);
          }
        }
      }
    }
  }
}
.main-container {
  // margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 100%;
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
  background: #ffffff;
  box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
  border-radius: 24px;
  padding: 100px 60px 50px 60px;
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    height: 300px;
  padding: 20px 10px 20px 10px;
  }
}
.lineChartStyle__stat {
  width: 100%;
  height: 100%;
}

.profile {
  margin-bottom: 76px;
  &__top {
    // margin-top: 54px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }
    &__left {
      width: 74.8%;
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 13.0709px 13.0709px 104.567px rgba(63, 39, 102, 0.1);
      backdrop-filter: blur(13.0709px);
      border-radius: 31.3701px;
      padding: 30px 70px;
      box-sizing: border-box;
      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 10px 10px;
      }
      &__progress {
        margin-top: 38px;
        display: flex;
        justify-content: space-around;
        &__box {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      }
      &__info {
        background: #ffeaea;
        padding: 35px 80px;
        border-radius: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 768px) {
          padding: 16px 10px;
        }
        &__user {
          &-p1 {
            font-weight: 600;
            font-size: 36px;
          }
          &-p2 {
            font-weight: 400;
            font-size: 16px;
          }
        }
        &__citata {
          color: #707070;
          font-weight: 400;
          font-size: 14px;
          width: 50%;
          background: white;
          border-radius: 16px;
          display: flex;
          padding: 15px;
          align-items: center;
        }
      }
    }
    &__right {
      width: 28%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      left: -4%;
      z-index: 1;
      gap: 16px;
      @media screen and (max-width: 768px) {
        flex-direction: initial;
        left: 0%;
        width: 100%;
      }
      img {
        width: 85%;
        @media screen and (max-width: 768px) {
          width: 32%;
        }
      }
      button {
        cursor: pointer;
        background: #8f0000;
        color: white;
        height: 48px;
        font-weight: 600;
        width: 50%;
        margin: auto;
        border-radius: 18px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        transition: all 0.5s ease;
        border: 2px solid transparent;
        &:hover {
          background: white;
          color: #8f0000;
          border: 2px solid #8f0000;
        }
      }
    }
  }
}

.admin__content-vebinars-item {
  position: relative;
}
.deleteVebinar {
  background: red;
  height: 23px;
  width: 23px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2%;
  right: 2%;
  z-index: 2;
  transition: all 0.5s ease;
  img {
    filter: brightness(0) saturate(100%);
  }
  &:hover {
    transform: scale(1.03);
  }
}
</style>
   