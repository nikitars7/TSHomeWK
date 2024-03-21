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
    [K in keyof T as Uppercase<string & K>]: T[K] extends Record<string, unknown> ? UpperCaseKeys<T[K]> : T[K];
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
interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: PropertyDescriptor;
};

interface User2 {
    name: string;
    age: number;
}
const user: ObjectToPropertyDescriptor<User2> = {
    name: {
        configurable: false,
        enumerable: false,
        value: 'John',
        writable: true,
    },
    age: {
        configurable: false,
        enumerable: false,
        value: 25,
        writable: true,
    },
};
