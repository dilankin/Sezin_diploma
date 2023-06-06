<template>
    <div class="loginBack animated fadeIn" @click="$store.state.openRegisterModal = false">
        <div class="login animated fadeInLogin" v-scroll @click.stop>
            <p class="login-p1">{{ $t('registerLitttle') }}</p>
            <p class="login-p2">
                {{ $t('welcomeDesc2') }}
            </p>
            <div class="login-input1">
                <input
                    type="text"
                    :placeholder="$t('fio')"
                    v-model="v$.name.$model"
                    @keyup="onlyText()"
                  />
                  <template
                    v-for="(error, index) of v$.name.$errors"
                    :key="index"
                  >
                    <p class="errorValid">{{ error.$message }}</p>
                  </template>
            </div>
            <div class="login-input1">
                <input :placeholder="$t('email')" type="email" v-model="v$.email.$model"/>
                <template
                    v-for="(error, index) of v$.email.$errors"
                    :key="index"
                >
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>

            <div class="login-input2">
                <input
                    :placeholder="$t('password')"
                    type="password"
                    v-model="v$.password.$model"
                />
                <template
                    v-for="(error, index) of v$.password.$errors"
                    :key="index"
                >
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>

            <div class="login-input2">
                <input
                    :placeholder="$t('confirmPassword')"
                    type="password"
                    v-model="v$.passwordConfirm.$model"
                />
                <template
                    v-for="(error, index) of v$.passwordConfirm.$errors"
                    :key="index"
                >
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>

            <button class="login-p3" @click="loginAccount">{{ $t('registerLitttle') }}</button>
            <p class="login-p4">{{ $t('haveAcc') }} <span style="color: red; cursor: pointer;" @click="$store.state.openLoginModal = true, $store.state.openRegisterModal = false">{{ $t('login') }}</span></p>

            <div class="login-close">
                <img src="@/assets/icons/close.png" @click="$store.state.openRegisterModal = false"/>
            </div>
        </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers, email, sameAs } from "@vuelidate/validators";

import { IMaskDirective } from "vue-imask";
import { ref } from 'vue';
import { mapActions } from 'vuex';

export default {
    directives: {
        imask: IMaskDirective,
    },
    data() {
        return {
        v$: useVuelidate(),
            email: "",
            password: "",
            passwordConfirm: "",
            phone: "",
            name: "",
            isShowError: false
        }
    },
    validations() {
        return {
        name: {
            required: helpers.withMessage(this.$t("req1"), required),
            minLength: helpers.withMessage(
            this.$t("req4"),
                minLength(3)
            ),
        },
        email: {
            required: helpers.withMessage(this.$t("req1"), required),
            email: helpers.withMessage(this.$t("req3"), email),
        },
        password: {
            required: helpers.withMessage(this.$t("req1"), required),
            minLength: helpers.withMessage(
            this.$t("req2"),
            minLength(8)
            ),
        },
        passwordConfirm: {
            required: helpers.withMessage((""), required),
            sameAs: helpers.withMessage(
            this.$t("req5"),
            sameAs(this.password)
            ),
        },
        };
    },
    methods: {
        ...mapActions(["requestUser"]),
        reserForm() {
            this.name = "",
            this.email = "",
            this.password = "",
            this.passwordConfirm = "",
            this.v$.$reset()
        },

        onlyText() {
            this.name = this.name.replace(/[^а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺa-zA-Z\-\s.]/gi, "");
            this.name = this.name.replace(/\.{2,}|\s{2,}|\-{2,}/g, function(match) {
                return match.substr(0, 1);
            });
        },
    
        loginAccount() {
            this.v$.$validate();
            if (!this.v$.$invalid) {
                this.$axios.post('auth/registration', {
                    email: this.email,
                    password: this.password,
                    fullName: this.name
                })
                .then(res => {
                    localStorage.setItem("access_token", res.data)
                    this.$toaster.success(this.$t('req7'));
                    this.$store.state.openRegisterModal = false,
                    this.requestUser()
                    setTimeout(() => {
                        let type = localStorage.getItem('type') || false
                        console.log(type);
                        if (type === "USER") {
                        this.$router.push('/profile')
                        } else if (type === "ADMIN") {
                        this.$router.push('/admin')
                        } else if (type === "MANAGER") {
                        this.$router.push('/account')
                        }                    
                    }, 500);
                    this.reserForm()                    
                })
                .catch(err => {
                    console.log(err);
                })
            }
            else {
                this.$toaster.error(this.$t('req6'))
            }
        }
    }
}
</script>
<style lang="scss" scoped>

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
}
.fadeInLogin {
  animation-name: fadeInLogin;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInLogin {
  from {
    opacity: 0;
    top: -10%;
  }
  to {
    opacity: 1;
    top: 0%;
  }
}

.errorValid {
    position: absolute;
    bottom: -30%;
    left: 5%;
    text-align: start;
    font-size: 12px;
    margin-left: 12px;
    color: red;
}


.loginBack {
    color: black;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.login {
    position: relative;
    width: 544px;
    background: #FCFCFD;
    box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.08);
    border-radius: 30px;
    padding: 42px 96px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
        padding: 23px 26px;
    }
    &-p1 {
        font-weight: 500;
        font-size: 24px;
        color: #FD749B;
    }
    &-p2 {
        margin: 12px 0 32px 0;
        color: #72777A;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        width: 100%;
    }
    &-p3 {
        cursor: pointer;
        margin: 32px 0;
        width: 60%;
        color: white;
        height: 48px;
        background: linear-gradient(178.18deg,#fd749b -13.56%,#281ac8 158.3%);
        border-radius: 48px;
        outline: none;
        border: none;
        font-weight: 500;
        font-size: 16px;
    }
    &-p4 {
        color: #353945;
        font-weight: 400;
        font-size: 12px;
    }
    &-input1 {
        width: 110%;
        display: flex;
        justify-content: center;
        position: relative;
        margin-top: 16px;
    }
    &-input2 {
        width: 110%;
        display: flex;
        justify-content: center;
        position: relative;
        margin-top: 16px;
    }
    input {
        background: #FFFFFF;
        border: 1px solid #D1D1D1;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0 20px;
        height: 58px;
        width: 85%;
        outline: red !important;
    }
    &-close {
        cursor: pointer;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: -2%;
        top: -2%;
        width: 32px;
        height: 32px;
        background: #FCFCFD;
        box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.1);
        border-radius: 32px;
        transform: matrix(1, 0, 0, -1, 0, 0);
    }
}
</style>