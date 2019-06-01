<template>
  <div class="top">
    <v-flex xs12 sm6 offset-sm3>
      <h2>メール認証</h2>
      <v-card class="container">
        <v-flex style="margin: 20px 0px;">
          <h3>ログイン</h3>
          <v-text-field
            v-model="loginEmail"
            type="text"
            required
            label="メールアドレス"
            placeholder="" />
          <v-text-field
            v-model="loginPassword"
            label="パスワード（６文字以上）"
            min="6"
            maxlength="32"
            :append-icon="isLoginShowPassword ? 'visibility' : 'visivility_off'"
            @click:append="() => (isLoginShowPassword = !isLoginShowPassword)"
            :type="isLoginShowPassword ? 'text': 'password'"
            required
            placeholder=""
            pattern="[a-zA-Z0-9]*" />
          <v-flex>
            <v-btn
              color="blue"
              class="white--text"
              :loading="isLoading"
              :disabled="isLoading"
              @click="onLogin">ログイン</v-btn>
          </v-flex>
          <v-flex style="margin: 20px 0px;">
            <h3>ログインメッセージ</h3>
            <p style="margin: 10px;" v-html="loginResultMessage"/>
          </v-flex>
        </v-flex>
      </v-card>
      <v-card class="container">     
        <v-flex style="margin: 30px 0px;">
          <h3>アカウント作成</h3>
          <v-text-field
            v-model="signUpEmail"
            label="メールアドレス"
            type="text"
            required
            placeholder=""/>
          <v-text-field
            v-model="signUpPassword"
            label="パスワード（6文字以上）"
            min="6"
            counter="6"
            maxlength="32"
            :append-icon ="isSignUpShowPassword ? 'visibility' : 'visibility_off'"
            @click:append="() => (isSignUpShowPassword = !isSignUpShowPassword)"
            :type="isSignUpShowPassword ? 'text' : 'password'"
            required
            pattern="[a-zA-Z0-9]*"/>
          <v-text-field
            v-model="signUpConfirmPassword"
            label="確認用パスワード（６文字以上）"
            min="6"
            counter="6"
            maxlength="32"
            :append-icon ="isSignUpShowPassword ? 'visibility' : 'visibility_off'"
            @click:append="() => (isSignUpShowPassword = !isSignUpShowPassword)"
            :type="isSignUpShowPassword ? 'text' : 'password'"
            required
            pattern="[a-zA-Z0-9]*"/>
          <v-flex>
            <v-btn
              color="blue"
              class="white--text"
              :loading="isLoading"
              :disabled="isLoading"
              @click="onSignup">サインアップ</v-btn>
          </v-flex>
          <v-flex style="margin: 20px 0px;">
            <h3>サインアップメッセージ</h3>
            <p style="margin: 10px;" v-html="signUpResultMessage"/>
          </v-flex>
        </v-flex>
      </v-card>
    </v-flex>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'
@Component({
  name: 'EmailAuthPage',
})
export default class EmailAuthPage extends Vue {

  isLoading: boolean = false
  isLoginStatus: boolean | null = null

  loginEmail: string = ''
  loginPassword: string = ''
  loginResultMessage: string = ''
  isLoginShowPassword: boolean = false

  signUpEmail: string = ''
  signUpPassword: string = ''
  signUpConfirmPassword: string = ''
  signUpResultMessage: string = ''
  isSignUpShowPassword: boolean = false
  mounted() {
    this.getItems()
  }
  getItems() {
    console.log('getItems')
    /**
     * 認証状態を監視する。
     * 認証状態が変わると処理される
     */
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.isLoginStatus = true
      } else {
        this.isLoginStatus = false
      }
    })
  }
  async onLogin() {
    this.isLoading = true
    await this.login()
    this.isLoading = false
  }
  async onSignup() {
    this.isLoading = true
    await this.signUp()
    this.isLoading = false
  }
  async onLogout() {
    this.isLoading = true
    await this.signOut()
    this.isLoading = false
  }
  async login() {
    try {
      this.loginResultMessage = ''
      const result = await firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      const user = firebase.auth().currentUser
      if (user !== null) {
        await this.updateUser(user.uid)
      }
      this.$router.push({ name: 'sign_in_finish_page'})
    } catch(error) {
      console.error(error)
      this.loginResultMessage = error.message
    }
  }

  async updateUser(userId: string) {
    try {
      const db: firebase.firestore.Firestore = firebase.firestore()
      const batch: firebase.firestore.WriteBatch = db.batch()
      const ref: firebase.firestore.DocumentReference = db.collection('version/3/user').doc(userId)
      const item = await ref.get()
      if (item.exists){
        batch.set(ref, {
          updatedId: new Date()
        }, { merge: true })
        await batch.commit()
      } else {
        throw new Error('ユーザー情報がありません')
      }
    } catch (error) {
      throw error
    }
  }

  async signUp() {
    try {
      this.signUpResultMessage = ''
      const messages = this.validationSignUp()
      if (messages.length !== 0) {
        messages.forEach((item) => {
          this.signUpResultMessage += item + '<br>'
        })
        return
      }
    const result = await firebase.auth().createUserWithEmailAndPassword(this.signUpEmail,  this.signUpPassword);
    const user = firebase.auth().currentUser
    if (user !== null) {
      await user.sendEmailVerification()
      await this.createUser(user.uid)
      this.signUpResultMessage = '本人確認メールを送信しました。ログインしてください'
    }
    } catch (error) {
      console.error(error)
      this.signUpResultMessage = error.message
    }
  } 
  
  validationSignUp(): string[] {
    const messages: string[] = []
    if (this.signUpPassword.length < 6 ) {
      messages.push('パスワードは６文字以上')
    }
    if (this.signUpPassword !== this.signUpConfirmPassword) {
      messages.push('確認用パスワードと一致してません')
    }
    return messages
  }

  async createUser(userId: string) {
    try {
      const db: firebase.firestore.Firestore = firebase.firestore()
      const batch: firebase.firestore.WriteBatch = db.batch()
      const ref: firebase.firestore.DocumentReference = db.collection('version/3/user').doc(userId)
      batch.set(ref, {
        uid: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'ゲスト'
      }, { merge: true })
      await batch.commit()
    } catch (error) {
      console.error(error)
    }
  }
  
  async signOut() {
    try {
      const result = await firebase.auth().signOut()
      this.isLoginStatus = false
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
<style lang="stylus">
.top
  margin 10px
.container
  text-align left 
  margin-top 20px
.subtitle
  padding-left 12px
</style>