<template>
    <div class="funQues container">
        <p class="funQues-title">{{ $t('function') }}</p>
        <div class="funQues__content">
            <div class="funQues__content__box" v-for="(item, idx) in functions" :key="idx">
                <div class="funQues__content__box__block1">
                    <p>{{ $t(item.title) }}</p>
                    <img src="@/assets/icons/minus.svg" v-if="openDesc == idx" @click="openBox(idx)"/>
                    <img src="@/assets/icons/plus.svg" v-else @click="openBox(idx)"/>
                </div>
                <div class="funQues__content__box__block2" v-if="openDesc == idx">
                    <p>{{ $t(item.desc) }}</p>
                    <div v-for="itemIN in item.image" :key="itemIN" class="funQues__content__box__block2__image">
                        <img :src="require('@/assets/images/functionsImage/' + itemIN.images + '.png')" v-if="itemIN.images"/>
                    </div>
                </div>
                <div class="funQues__content__box-line"></div>
            </div>
        </div>
    </div>
</template>
<script>
import functions from '@/data/functions.json'
export default {
    data() { 
        return {
            openDesc: 0,
            functions: functions.functions
        }
    },
    methods: {
        openBox(value) {
            if (this.openDesc >= 0 && this.openDesc == value) {
                this.openDesc = -(this.openDesc = value);
            }
            else {
                this.openDesc = (this.openDesc = value);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.funQues {
    margin-right: auto;
    margin-left: auto;
    margin-top: 60px;
    margin-bottom: 60px;
    @media screen and (max-width: 768px)  {
        margin-top: 100px;
        margin-bottom: 157px;
    }
    &-title {
        font-size: 32px;
        font-weight: 800;
        @media screen and (max-width: 768px) {
            font-size: 22px;
        }
    }
    &__content {
        color: #000;
        line-height: 30px;
        box-sizing: border-box;
        margin-top: 39px;
        padding: 60px 103px 180px 103px;
        width: 100%;
        background: #fff;
        box-shadow: 0 1px 5px rgba(0,0,0,.1);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        @media screen and (max-width: 768px) {
            padding: 10px;
        }
        &__box {
            display: flex;
            flex-direction: column;
            gap: 16px;
            &__block1 {
                font-weight: 700;
                font-size: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                @media screen and (max-width: 768px) {
                    font-size: 15px;
                }
                img {
                    cursor: pointer;
                    filter: brightness(0) saturate(100%) invert(23%) sepia(20%) saturate(6316%) hue-rotate(259deg) brightness(91%) contrast(84%);
                }
            }
            &__block2 {
                color: #787A80;
                font-weight: 400;
                font-size: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                @media screen and (max-width: 768px) {
                    font-size: 14px;
                }
                &__image {
                    // border: 1px solid red;
                    width: fit-content;
                    height: fit-content;
                    img {
                        border-radius: 15px;
                        border: 1px solid purple;
                        box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
                         @media screen and (max-width: 768px) {
                            width: 100%;
                         }
                    }
                }
            }
            &-line {
                height: 1px;
                background: #E5E8ED;
                width: 100%;
            }
        }
    }
}
</style>