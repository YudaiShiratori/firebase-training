<template>
  <div class="home">
    <h1>Firebase-Practice</h1>
    <ul>
      <li><router-link :to="{ name: 'createFormPage'}">フォームページ </router-link></li>
      <li><router-link :to="{ name: 'RosterListPage'}">リスト</router-link></li>
      <li><router-link :to="{ name: 'ShopItemBuyPage'}">購入ページ</router-link></li>
      <li><router-link :to="{ name: 'AnonymouslyPage'}">匿名ログイン</router-link></li>    
      <li><router-link :to="{ name: 'email_auth_page'}">メールログイン</router-link></li>
      <li><router-link :to="{ name: 'security_rule_lesson_page'}">セキュリティルール</router-link></li>
      <li><router-link :to="{ name: 'Social_login'}">ソーシャルログイン</router-link></li>
      <li><router-link :to="{ name: 'ImageOperationPage'}">写真アップ・モデル化</router-link></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
