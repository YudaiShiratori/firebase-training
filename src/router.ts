import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import CreateFormPage from '@/components/CreateFormPage.vue';
import RosterListPage from '@/components/RosterListPage.vue';
import ShopItemBuyPage from '@/components/ShopItemBuyPage.vue';
import AnonymouslyPage from '@/components/AnonymouslyPage.vue';
import SignInFinishPage from '@/components/SignInFinishPage.vue';
import EmailAuthPage from '@/components/EmailAuthPage.vue';
import SecurityRuleLessonPage from '@/components/SecurityRuleLessonPage.vue';
import SocialLoginPage from '@/components/SocialLoginPage.vue';
import ImageOperationPage from '@/components/ImageOperationPage.vue';
import ImageOperationFirestorePage from '@/components/ImageOperationFirestorePage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/create-form-page',
      name: 'createFormPage',
      component: CreateFormPage,
    },
    {
      path: '/roster-list-page',
      name: 'RosterListPage',
      component: RosterListPage,
    },
    {
      path: '/shop-item-buy-page',
      name: 'ShopItemBuyPage',
      component: ShopItemBuyPage,
    },
    {
      path: '/anonymously-page',
      name: 'AnonymouslyPage',
      component: AnonymouslyPage,
    },
    {
      path: '/sign-in-finish-page',
      name: 'sign_in_finish_page',
      component: SignInFinishPage,
    },
    {
      path: '/email-auth-page',
      name: 'email_auth_page',
      component: EmailAuthPage,
    },
    {
      path: '/security-rule-lesson-page',
      name: 'security_rule_lesson_page',
      component: SecurityRuleLessonPage,
    },
    {
      path: '/social-login',
      name: 'Social_login',
      component: SocialLoginPage,
    },
    {
      path: '/image-operation-page',
      name: 'ImageOperationPage',
      component: ImageOperationPage,
    },
    {
      path: '/image-operation-firestore',
      name: 'ImageOperationFirestorePage',
      component: ImageOperationFirestorePage,
    },
  ],
});
