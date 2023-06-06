<template>
    <div class="tera container">
        <p class="tera-title">{{ $t('therapist') }}</p>
        <div class="tera__content">
            <div class="tera__content__left">
                <div class="tera__content__left-input"> 
                    <input type="search" :placeholder="$t('nameTerapist')"/>
                    <img src="@/assets/icons/seacrh.png"/>
                </div>
                <div class="tera__content__cards">
                    <div v-for="(item, idx) in newTerapish" :tera="item" :key="idx" class="tera__content__cards__in">
                        <TeraCard :tera="item"  :idxCustom="idx"/>
                        <div class="tera__content__cards-line" v-if="newTerapish.length > ++idx"></div>
                    </div>
                </div>
            </div>
            <div v-if="articles.length" class="tera__content__right">
                <p class="tera__content__right-title">{{ $t('recomentArticle') }}</p>
                <FillingCard v-for="(item, idx) in articles" @showArticle="showArticle" :key="item" :feeling="filling[idx]" :data="item" customClass="articSize"/>
            </div>
        </div>
    </div>
    <ArticleComponent
        v-if="isShowArticle"
        :article="article"
        @close="hideArticle"
    />
</template>
<script>
import FillingCard from '@/components/FillingCard.vue';
import ArticleComponent from "@/components/alert/article.vue";
import TeraCard from '@/components/TeraCard.vue';
import filling from '@/data/filling.json'
import terapevt from '@/data/terapevt.json'
export default {
    components: { FillingCard, TeraCard, ArticleComponent },
    data() {
        return {
            filling: filling.filling,
            terapevt: terapevt.terapevt,
            articles: [],
            isShowArticle: false,
            article: false,
            newTerapish: []
        }
    },
    mounted() {
        this.$axios.get('user?role=MANAGER&lang=ru')
        .then(res => {
            this.newTerapish = res.data.data
        })
        .catch(err => {
            
        });
        this.$axios.get("article")
            .then(res => {
                this.articles = res.data
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {        
        showArticle(article) {
            this.article = article;
            this.isShowArticle = true;
        },
        hideArticle() {
            this.isShowArticle = false;
        },
    }
    
}
</script>
<style lang="scss" scoped>
.tera {
    margin-top: 56px;
    margin-bottom: 76px;
    @media screen and (max-width: 768px) {
        margin-top: 80px;
        margin-bottom: 136px;
        padding: 20px 0;
    }
    &-title {
        color: #1C194E;
        font-weight: 700;
        font-size: 36px;
        text-align: center;
    }
    &__content {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 16px;
        }
        &__cards {
            margin-top: 32px;
            &__in {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            &-line {
                margin-bottom: 16px;
                width: 100%;
                height: 1px;
                background: #7A728980;
            }
        }
        &__left {
            width: 70%;
            background: #FFFFFF;
            height: fit-content;
            padding: 32px;
            box-sizing: border-box;
            box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
            border-radius: 20px;
            @media screen and (max-width: 768px) {
                width: 100%;
            }
            &-input {
                width: 50%;
                display: flex;
                align-items: center;
                padding: 3px 8px;
                background: #FFFFFF;
                border: 1px solid #E3E5E6;
                border-radius: 8px;
                @media screen and (max-width: 768px) {
                    width: 100%;
                }
                input {
                    outline: none;
                    border: none;
                    width: 100%;
                }
            }
        }
        &__right {
            width: 25%;
            box-sizing: border-box;
            background: #FFFFFF;
            padding: 32px;
            box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            @media screen and (max-width: 768px) {
                width: 100%;
                display: none;
                flex-direction: inherit;
            }
            &-title {
                font-weight: 700;
            }
            
        }
    }
}
</style>