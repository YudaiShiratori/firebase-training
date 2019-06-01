import firebase from 'firebase/app';

async function getCollectionSample() {
  const users: UserPractice[] = [];
  const items: firebase.firestore.QuerySnapshot = await this.db.collection(UserPractice.path).get();
  items.docs.forEach((item: firebase.firestore.QueryDocumentSnapshot) => {
    if (item.exists) {
      const user = new UserPractice(item.id, item.data());
      users.push(user);
    }
  });
}

class UserPractice {
  public static path: string = 'version/1/userpractice';
  public uid: string;
  public name: string = '';
  public age: number = 0;
  public sex: number = 0;
  public isPublished: boolean = false;
  // public createdAt: Date;
  // public updatedAt: Date;

  public db: firebase.firestore.Firestore;
  public collection: firebase.firestore.CollectionReference;
  constructor(id?: string, data?: any) {
    this.db = firebase.firestore();
    this.collection = this.db.collection(UserPractice.path);
    if (id !== undefined && id !== null) {
      this.uid = id;
    } else {
      this.uid = this.collection.doc().id;
    }

    if (data !== undefined && id !== null) {
      this.name = 'name' in data ? data.name : undefined;
      this.age = 'age' in data ? data.age : 0;
      this.sex = 'sex' in data ? data.sex : 0;
      this.isPublished = 'isPublished' in data ? data.isPublished : false;
      // this.createdAt = 'createdAt' in data ? data.createdAt :undefined;
      // this.updatedAt = 'updatedAt' in data ? data.name : undefined;
    }
  }
  public async save() {
    await this.collection.doc(this.uid).set({
      uid: this.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: this.name,
      age: Number(this.age),  // v-text-fieldで入力するとString型になるためNumber型へ変換
      sex: this.sex,
      isPublished: this.isPublished,
    }, { merge: true });
  }
  public async get(id: string) {
    await this.collection.doc(id).get();
  }
}

export { UserPractice };
