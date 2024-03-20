// 1.Вам потрібно створити тип `DeepReadonly` який буде робити доступними тільки для читання навіть
// властивості вкладених обʼєктів.

type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Record<string, unknown> ? DeepReadonly<T[K]> : T[K];
};

interface User {
    name: string;
    age: number;
    address: {
        street: string;
        city: string;
        region: {
            name: string;
        };
    };
}

const userData: DeepReadonly<User> = {
    name: 'John',
    age: 28,
    address: {
        street: 'unknown',
        city: 'nowhere',
        region: {
            name: 'guess',
        },
    },
};
// userData.address.region.name = 'ff'; error cant reassign reodonly property

// 2. Вам потрібно створити тип `DeepRequireReadonly` який буде робити доступними тільки для читання
// навіть  властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends Record<string, unknown> ? DeepReadonly<T[K]> : T[K];
};

interface OptionalUser {
    name: string;
    age?: number;
    address: {
        street: string;
        city: string;
        region: {
            name: string;
        };
    };
}

const optionalUserData: DeepRequireReadonly<OptionalUser> = {
    name: 'John',
    address: {
        // age is missing
        street: 'unknown',
        city: 'nowhere',
        region: {
            name: 'guess',
        },
    },
};
// optionalUserData.age = 14  // error

// 3. Вам потрібно сворити тип `UpperCaseKeys`, який буде приводити всі ключі до верхнього регістру.

type UserUpperCase = {
    name: string;
    username: string;
    fullname: string;
    address: {
        city: string;
    };
};
type UpperCaseKeys<T> = {
    [K in keyof T & string as Uppercase<K>]: T[K] extends Record<string, unknown> ? UpperCaseKeys<T[K]> : T[K];
};

const userUpperCase: UpperCaseKeys<UserUpperCase> = {
    name: 'john',
    username: 'john_123',
    fullname: 'johnathan',
    ADDRESS: {
        CITY: 'fff',
    },
};

// 4.Створіть тип `ObjectToPropertyDescriptor`, який перетворює звичайний обʼєкт на обʼєкт де кожне `value` є дескриптором.

type UserDescriptor = {
    name: string;
    age: number;
};
const user2 = {
    name: 'Vasya',
    age: 45,
};
const descriptor = Object.getOwnPropertyDescriptors(user2);

// type User 2= {
//    name: string;
//    age:number;
//  }
//  type ToGetter<T extends string> = `get${Capitalize<T>}`;

//  type Getters<T> = {
//    [K in keyof T & string as ToGetter<K>] : () => T[K];
//  }
//  type T = Getters<User>

type ObjectToPropertyDescriptor<T> = {
    [property in keyof T ]: T[property];
};

const user3: ObjectToPropertyDescriptor<UserDescriptor> = {
    name: 'Oleh',
    age: 24,
};

user3.