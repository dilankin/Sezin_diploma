<template>
  <div class="chatML container">
        <p class="chatML-title" data-aos="fade-up" data-aos-delay="650">{{ $t('aiSezin') }}</p>
        <div class="chatML__content" data-aos="zoom-in" data-aos-delay="650">

            <div class="chatML__content__answers">
                <div v-for="(message, index) in conversation" :key="index" :class="{'user-message': message.role === 'user', 'assistant-message': message.role === 'assistant'}">
                    <p v-if="message.role === 'user'">{{ message.content }}</p>
                    <p v-if="message.role === 'assistant'">Sezin: {{ message.content }}</p>
                </div>
            </div>

            <div class="chatML__content__sender">
                <input type="text" :placeholder="$t('yourMessage')" v-model="message"/>
                <div class="chatML__content__sender-img">
                    <img src="@/assets/icons/senderPurple.svg" @click="sendMessage"/>
                </div>
            </div>
        </div>
        <img src="@/assets/icons/robot.png" class="chatML-robot" data-aos="fade-left" data-aos-delay="650">
  </div>
</template>

<script>

import AOS from 'aos';
import 'aos/dist/aos.css';
export default {
  data() {
    return {
    output: "",
    message: "",
    OPENAI_API_KEY: "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",
    model: "gpt-3.5-turbo",
    conversation: [
          {
              role: "system",
              content:
              "You are a psychological assistant - AI Sezin, you answer questions on the topic of psychology and can give a short consultation to a person. Have a meaningful conversation on behalf of a psychologist assistant and try to gently help a person with his problem"
          }
        ]
    };
    },
    mounted() {
        AOS.init();
    },
  methods: {
    sendMessage() {
      const question = this.message.trim();
      
      if (question === "") {
        alert("Здравствуйте! Я - ИИ Sezin, психологический ассистент. Я здесь, чтобы помочь тебе с проблемами, связанными с психологическим здоровьем. Если у тебя есть какие-то вопросы или проблемы, я готов помочь.\n\nЧтобы начать диалог, просто задайте вопрос в этом чате.\n\nЕсли вы хотите, чтобы я запоминал контекст предыдущего сообщения, то поставьте перед своим новым сообщением \"+\"");
        this.message = "";
        return;
      }
      
      const url = "https://api.openai.com/v1/chat/completions";
      
      const data = {
        model: this.model,
        messages: [
          ...this.conversation,
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 1024,
        temperature: 0.5
      };
      
    
      this.conversation.push({
          role: "user",
          content: question
      });

      this.output += `Я: ${question}\n`;
      this.message = "";
      
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.OPENAI_API_KEY}`
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          let responseText = "";
          
          if (result.choices && result.choices.length > 0) {
            const choice = result.choices[0];
            responseText = choice.message ? choice.message.content : choice.text;
          }
          
          if (responseText === "") {
            responseText = "No response";
          } else {
            this.conversation.push({
              role: "assistant",
              content: responseText
            });
          }
          
          this.output += `Sezin: ${responseText}\n`;
        })
        .catch(error => {
          this.output += `Error: ${error.message}\n`;
        });
    }
  }
};
</script>

<style lang="scss" scoped>

.user-message {
    background-color: #611cce;
    padding: 10px;
    display: flex;
    margin-left: auto;
    color: white;
    align-items: flex-end;
    justify-content: end;
    text-align: end;
    margin-bottom: 10px;
    width: fit-content;
    border-radius: 5px;
}

.assistant-message {
    background-color: #ce57cd;
    color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    width: fit-content;
}

.chatML {
    @media screen and (max-width: 768px) {
      margin-top: 110px;
      margin-bottom: 150px;
    }
    position: relative;
    &-title {
        margin-top: 30px;
        text-align: center;
        margin-bottom: 36px;
        font-weight: 400;
        font-size: 28px;
        color: #b6239e;
        @media screen and (max-width: 768px) {
          font-size: 18px;
        }
    }
    &-robot {
        @media screen and (max-width: 768px) {
          display: none;
        }
        position: absolute;
        top: 5%;
        left: 2.2%;
    }
    &__content {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        gap: 32px;
        box-sizing: border-box;
        margin-top: 39px;
        margin-bottom: 40px;
        padding: 60px 103px 60px 103px;
        width: 100%;
        background: linear-gradient(174.48deg, #FF6390 -7.33%, #130B74 118.73%);
        box-shadow: 0 1px 5px rgba(0,0,0,.1);
        border-radius: 12px;
        @media screen and (max-width: 768px) {
          padding: 10px;
        }
        &__answers {
            background: white;
            width: 100%;
            border-radius: 8px;
            height: 500px;
            box-sizing: border-box;
            resize: none;
            box-shadow: 0px 0px 17px 2px rgba(34, 60, 80, 0.2);
            border: none;
            outline: none;
            padding: 16px 12px;
            overflow-x: hidden;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            &::-webkit-scrollbar {
                width: 0px !important;
                height: 100%;
                background: red !important;
                color: red !important;
            }
        }
        &__sender {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 12px;
            border-radius: 8px;
            gap: 10px;
            background: white;
            box-sizing: border-box;
            box-shadow: 0px 0px 17px 2px rgba(34, 60, 80, 0.2);
            input {
                height: 100%;
                width: 100%;
                outline: none;
                border: none;
                background: transparent;
                font-size: 16px;
            }
            &-img {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                transition: all 0.5s ease;
                padding: 3px;
                border-radius: 5px;
                img {
                    width: 22px;
                }
                &:hover {
                    background: black;
                    img {
                        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7476%) hue-rotate(328deg) brightness(115%) contrast(100%);
                    }
                }
            }
        }
    }
}
</style>
