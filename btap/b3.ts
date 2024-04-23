function cachingDecorator(target: any, propertKey: string, desciptor: PropertyDescriptor) {
    const originalMethod = desciptor.value;
    const cache: { [key: string]: any } = {};

    desciptor.value = function (...args: any[]) {
        const argString = JSON.stringify(args);
        
        if (cache[argString]) {
            console.log(argString);
            return cache[argString];
        }

        const result = originalMethod.apply(this, args);
        cache[argString] = result;
        console.log(argString);
        return result;
    }

    return desciptor;
}

class Test {
    @cachingDecorator
    sum1(a: number, b: number) {
        return a + b;
    }

    sum2(a: number, b: number) {

        return a + b;
    }
}

let sum1 = new Test();
console.log(sum1.sum1(1, 2));
console.log(sum1.sum1(1, 2)); 
console.log(sum1.sum1(3, 4));
