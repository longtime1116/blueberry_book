namespace Chapter5_1 {
  if (false) {
    // クラス宣言とnew構文
    // デフォルト値を設定できる
    class User {
      // staticをつけると、静的の名の通り、クラスそのものに属するプロパティとメソッドを定義できる
      // User.adminName のように呼び出せる
      static adminName: string = "root";
      static getAdminUser() {
        return new User(User.adminName, 1000);
      }

      // ↓の冗長と言っているやつ、private age の代わりに #age、this.ageの代わりにthis.#age としてもプライベートプロパティにできる。こレはTSではなくES2015以降の
      // JSの機能なので、ランタイムでもプライベート性が守られる利点がある

      // これは冗長
      // // readonly をつけると、コンストラクタ以降で更新できない
      // readonly name: string = "";
      // private age: number = 0;
      // constructor(name: string, age: number) {
      //   this.name = name;
      //   this.age = age;
      // }

      // なのでこう書ける
      constructor(public readonly name: string = "", private age: number = 0) {}

      isAdult(): boolean {
        return this.age >= 20;
      }
      setAge(newAge: number): void {
        this.age = newAge;
      }
    }
    const taro = new User("taro");
    // private 修飾しがついているのでエラーになる
    // taro.age = 100;
    console.log(taro);
    console.log(taro.isAdult());
    taro.setAge(50);
    console.log(taro.isAdult());
    console.log(taro);

    const root = User.getAdminUser();
    console.log(root);
    root.setAge(10000);
    console.log(root);
  }
}

namespace Chapter5_1_11 {
  if (false) {
    class User<T> {
      name: string;
      #age: number;
      readonly data: T;
      constructor(name: string, age: number, data: T) {
        this.name = name;
        this.#age = age;
        this.data = data;
      }
      public isAdult(): boolean {
        return this.#age >= 20;
      }
    }
    const taro = new User<string>("taro", 18, "additional data");
    console.log(taro.data);
    const jiro = new User("taro", 18, { num: 123 });
    console.log(jiro);
  }
}

namespace Chapter5_2 {
  //
}
