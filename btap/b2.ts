function timingDecorator(target: any, propertKey: string, desciptor: PropertyDescriptor) {
    const originalMethod = desciptor.value;
    desciptor.value = function (...args: any[]) {
        const start = Date.now();
        console.log(propertKey);
        console.log(args);
        const result = originalMethod.apply(this, args);
        const end = Date.now();
        console.log( end - start);
        console.log(result);
        return result;
    }
    return desciptor;
}

class Test {
    @timingDecorator
    sum1(a: number, b: number) {
        let total = 0;
        for (let i = 0; i < 100000000; i++) {
            total += i;
        }
        return total;
    }

    sum2(a: number, b: number) {
        return a + b;
    }
}

let sum1 = new Test();
console.log(sum1.sum1(1, 2));
