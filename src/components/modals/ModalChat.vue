<template>
  <div class="chat">
    <div
      class="chat__top"
      @click="$store.state.openChat = true"
      v-if="getUser.isSubscriber == true"
    >
      <img src="@/assets/logoWithout.svg" />
      <p>{{ $t('sendSobsh') }}</p>
    </div>
    <span v-if="$store.state.openChat == true" class="animated fadeIn">
      
      <div class="chat__mid">
        <div v-for="item in terapists" :key="item">
        </div>
        <div class="chat__mid-user">
          <!-- <img src="@/assets/images/tera/user1.png" />
          <p>{{ $t('terapevtUser') }}</p> -->
          <img src="@/assets/icons/profileNone.png"/>
          <select v-model="selectEmail" @change="changeEmail">
            <option value="null">Выберите терапевта из списка</option>
            <option v-for="item in terapists" :key="item.id" :value="item.email">{{ item.fullName }}</option>
          </select>
        </div>
        <p class="chat__mid-p1">{{ $t('mesagSzin') }}</p>
        <p class="chat__mid-p2">{{ dateNow }}</p>
        <div class="chatGpa">
          <div
            class="chat__mid__chat"
            v-for="message in sockmess"
            :key="message.id"
          >
            <div
              class="chat__mid__chat__info"
              :class="{ message: message.user.email === getUser.email }"
            >
              <div class="chat__mid__chat__info-text">
                {{ message.text }}
              </div>
              <div class="chat__mid__chat__info-time" v-if="message.createAt">
                {{ message.createAt.slice(11, 16) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat__bot" v-if="selectEmail !== 'null'">
        <input
          type="text"
          :placeholder="$t('yourMessage')"
          v-model="yourMessage"
        />
        <img src="@/assets/icons/sender.svg" @click="sendMessage" />
      </div>
    </span>
    <div class="close animated fadeIn2" v-if="$store.state.openChat == true">
      <img
        src="@/assets/icons/close.png"
        @click="$store.state.openChat = false"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { io } from 'socket.io-client';
export default {
  data() {
    return {
      dateNow: "",
      yourMessage: "",
      sockmess: [],
      roomIds: null,
      terapists: false,
      selectEmail: "null",
      socket: false,
      interrr: false,
      messages: [
        {
          id: 0,
          text: "Повседневная практика показывает, что начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации новых предложений.",
          time: "12:39",
          isMe: true,
        },
        {
          id: 1,
          text: "Повседневная практика показывает, что начало повседневной работы по формированию позиции влечет за собой процесс внедрения и модернизации новых предложений.",
          time: "12:39",
          isMe: false,
        },
      ],
    };
  },
  methods: {
    changeEmail() {
      clearInterval(this.interrr)
      let socket = io("https://back-sezin.devup.kz/", {
        query: {
          token: localStorage.getItem("access_token"),
        },
      });
      socket.on("rooms", (data) => {
        if (!data.some(item => item.users.some(elem => elem.email === this.selectEmail) === true)) {
            // Создание новой комнаты
            const newRoom = {
                name: this.getUser.fullName,
                email: this.selectEmail
            // Дополнительные свойства комнаты, если необходимо
            };
            console.log('newRoom', newRoom);
            this.socket.emit("create-room", newRoom, (response) => {
                console.log("New Room Created:", response);
            });
        } else {  
          this.roomIds = data.find(item => item.users.some(elem => elem.email === this.selectEmail) === true).id
          console.log('daaaa', data);
        }
      });
      this.createRoom()
      this.interrr = setInterval(() => {
        this.createRoom()
      }, 5000);
      
    },
    sendMessage() {
      if (this.yourMessage) {
        let date = new Date();
        this.sockmess.push({
          id: this.yourMessage.length + 1,
          text: this.yourMessage,
          time: `${date.getHours()}:${date.getMinutes()}`,
            isMe: true,
            roomId: this.roomIds,
            user: {
                email: this.getUser.email
            }
        });
        this.socket.emit("add-message", {
            text: this.yourMessage,
            userId: this.getUser.id,
            roomId: this.roomIds,
        });
        this.yourMessage = "";
      }
    },
      createRoom() {
          this.$axios.get(`chat/${this.roomIds}`)
              .then(res => {
                this.sockmess = res.data.sort((a, b) => a.id - b.id)
              })
              .catch(err => {
                this.sockmess = []
            })
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
  },
  async created() {
    await this.$axios
      .get("user?role=MANAGER")
      .then((res) => {
        this.terapists = res.data.data.map(res => {
          return {
            id: res.id,
            email: res.email,
            fullName: res.fullName
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    const currentDate = new Date().toLocaleDateString();
    this.dateNow = currentDate;
    let socket = io("https://back-sezin.devup.kz/", {
      query: {
        token: localStorage.getItem("access_token"),
      },
    });
    socket.on("connect", () => {
      console.log("Connected");
    });
    // socket.on("rooms", (data) => {
    //     if (!data.length) {
    //         // Создание новой комнаты
    //         const newRoom = {
    //             name: "newroom",
    //             email: this.selectEmail
    //         // Дополнительные свойства комнаты, если необходимо
    //         };

    //         socket.emit("create-room", newRoom, (response) => {
    //             console.log("New Room Created:", response);
    //         });
    //     } else {  
    //       this.roomIds = data[0].id
    //     }
    // });
    socket.on("update",(data)=>{
        console.log('update', data);

     })

    socket.on('message', (message) => {
      console.log("Message Added:", message);
      this.sockmess.push(message);
    });

    // сохраняем socket в компоненте, чтобы его можно было использовать в других методах
      this.socket = socket;

  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>
<style lang="scss" scoped>
.animated {
  transition: all 1s ease;
  animation-duration: 2s;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    top: -10%;
  }
  to {
    opacity: 1;
    top: 3%;
  }
}

.fadeIn2 {
  animation-name: fadeIn;
}
@keyframes fadeIn2 {
  from {
    opacity: 0;
    top: -100%;
  }
  to {
    opacity: 1;
    top: 0%;
  }
}

.close {
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 3%;
  top: 3%;
  width: 32px;
  height: 32px;
  background: #fcfcfd;
  box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.1);
  border-radius: 32px;
  transform: matrix(1, 0, 0, -1, 0, 0);
}

.chatGpa {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.message {
  display: flex;
  align-items: flex-end;
  .chat__mid__chat__info-text {
    background: #445669;
    color: rgb(232, 223, 223) !important;
  }
}
.chat {
  z-index: 998;
  background: #ffffff;
  box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
  border-radius: 20px 20px 0 0;
  width: 350px;
  overflow: hidden;
  position: fixed;
  height: fit-content;
  bottom: 0;
  left: 3%;
  @media screen and (max-width: 768px) {
    bottom: 60px;
    left: 0%;
    width: 100%;
  }
  &__top {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    color: white;
    background: radial-gradient(
      circle,
      rgba(167, 63, 251, 1) 22%,
      rgba(124, 86, 201, 1) 73%
    );
  }
  &__mid {
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0px 26px;
    @media screen and (max-width: 768px) {
      height: 69vh;
    }
    &__chat {
      &__info {
        display: flex;
        flex-direction: column;
        gap: 5px;
        &-text {
          padding: 16px;
          box-sizing: border-box;
          background-color: #f1f0f0;
          border-radius: 12px !important;
          font-size: 14px;
          width: 90%;
          clear: both;
          color: #222d38 !important;
          float: left;
          text-align: left;
        }
        &-time {
          font-size: 12px;
        }
      }
    }
    &-user {
      background: rgb(243, 236, 246);
      display: flex;
      padding: 3px 36px;
      position: relative;
      left: -12%;
      width: 140%;
      box-sizing: border-box;
      margin: auto;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      img {
        width: 40px;
        height: 40px;
      }
      select {
        background: linear-gradient(180deg, #ECC1F3 0%, #CB54DE 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 12px;
        border: none;
        color: white;
        padding: 5px 2px;
        outline: none;
        option {
          background: rgb(179, 97, 195);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          border: none;
          color: white;
          outline: none;
        }
      }
    }
    &-p1 {
      margin-top: 8px;
      margin-bottom: 16px;
      font-size: 13px;
      text-align: end;
      color: #72777a;
    }
    &-p2 {
      margin-bottom: 16px;
      font-size: 14px;
      text-align: center;
      color: #666c70;
    }
  }
  &__bot {
    display: flex;
    padding: 8px 26px 16px 26px;
    border-top: 2px solid rgb(225, 213, 213);
    align-items: center;
    justify-content: space-between;
    input {
      width: 100%;
      outline: none;
      border: none;
    }
    img {
      cursor: pointer;
    }
  }
}
</style>