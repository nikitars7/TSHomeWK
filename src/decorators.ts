// 1. 1. Cтворити декоратор Memoize для методу класу,

// який буде на основі отриманих аргументів метода повертати закешоване значення
interface MemoizeValues {
    [key: number]: number;
}
function WithMemoize() {
    const cache: MemoizeValues = {};
    return function <T, R>(
        originalMethod: (value: number) => R,
        context: ClassMethodDecoratorContext<T, (value: number) => R>,
    ) {
        if (context.kind !== 'method') throw new Error('Method-only decorator');
        function replaceWithValue(this: T, value: number): R {
            if (value in cache) {
                return console.log('Returned from cache', cache[value] as R) as R;
            } else {
                let calculate = 2 * value;
                cache[value] = calculate;
                return originalMethod.apply(this, [value]);
            }
        }
        return replaceWithValue;
    };
}

export class Memoization {
    @WithMemoize()
    multipleByTwo(value: number): number {
        return value * 2;
    }
}

// const memoize = new Memoization();
// memoize.multipleByTwo(5);

// 2.  Cтворити декоратор Debounce для методу класу,

// який за отриманим значенням буде відтерміновувати запуск методу

function WithDebounce(t: number = 0) {
    let timer: ReturnType<typeof setTimeout>;

    return function <T, A extends any[], R>(
        originalMethod: (...args: A) => R,
        context: ClassMethodDecoratorContext<T, (...args: A) => R>,
    ) {
        if (context.kind !== 'method') throw new Error('Method-only decorator');
        function replaceWithValue(this: T, ...args: A): R | void {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                return originalMethod.apply(this, args);
            }, t);
        }
        return replaceWithValue;
    };
}

// Попробовал с confirm

function WithConfirmation<T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext<T, (...args: A) => R>,
) {
    if (context.kind !== 'method') throw new Error('Method-only decorator');
    function replaceMethod(this: T, ...args: A): R | void {
        let result = confirm('Are you ready?');
        if (result) {
            return originalMethod.apply(this, args);
        } else {
            console.log('Cancelled');
        }
    }
    return replaceMethod;
}
export class Debounced {
    @WithDebounce(3000)
    logAfterPause(): void {
        console.log('Debounced');
    }
    @WithConfirmation
    readyToStart(): void {
        console.log('Yes');
    }
}
