// ユニオン型は直和型じゃない、ということを実感するためのコーナー
namespace UnionTest {
  namespace UnionTest1 {
    // 一見直和型っぽく見える例
    const greetingList = ["hello", "hi", "good evening"] as const;
    type Greet = (typeof greetingList)[number];
    function greet(message: Greet): void {
      console.log(message);
    }
    greet(greetingList[0]);
  }

  namespace UnionTest2 {
    // TypeScriptは構造的部分型を採用しているので、以下でUserでもFighterでもないものを引数として渡せてしまう
    type User = {
      name: string;
      email: string;
    };
    type Fighter = {
      name: string;
      weightKg: number;
      heightCm: number;
    };
    type FightableUser = {
      name: string;
      email: string;
      weightKg: number;
      heightCm: number;
    };
    function greetTo(person: User | Fighter): void {
      console.log(`Hello, ${person.name}`);
    }
    const tom: FightableUser = {
      name: "tom",
      email: "tom@email.com",
      weightKg: 66,
      heightCm: 178,
    };
    greetTo(tom);
  }

  namespace UnionTest3 {
    // タグ付きユニオンを使えば解決！
    type User = {
      type: "User";
      name: string;
      email: string;
    };
    type Fighter = {
      type: "Fighter";
      name: string;
      weightKg: number;
      heightCm: number;
    };
    type FightableUser = {
      type: "FightableUser";
      name: string;
      email: string;
      weightKg: number;
      heightCm: number;
    };
    function greetTo(person: User | Fighter): void {
      console.log(`Hello, ${person.name}`);
    }
    const tom: FightableUser = {
      type: "FightableUser",
      name: "tom",
      email: "tom@email.com",
      weightKg: 66,
      heightCm: 178,
    };
    // ちゃんとコンパイルエラーになる！
    // greetTo(tom);
  }
}

namespace Chapter6_1 {
  //
}
