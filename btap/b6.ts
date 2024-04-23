function typeCheckDecorator(target: any, propertKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertKey);
        if (paramTypes.length !== args.length) {
            throw new Error('Invalid number of parameters.');
        }
        for (let i = 0; i < paramTypes.length; i++) {
            if (paramTypes[i] !== typeof args[i]) {
                throw new Error(`Invalid parameter type for parameter at position ${i + 1}. Expected ${paramTypes[i]}, but got ${typeof args[i]}.`);
            }
        }
        return originalMethod.apply(this, args);
    }
    return descriptor;
}

class Test {
    @typeCheckDecorator
    sum1(a: number, b: number) {
        return a + b;
    }

    sum2(a: number, b: number) {
        return a + b;
    }
}

let sum1 = new Test();
console.log(sum1.sum1(3, 5)); 
console.log(sum1.sum1("3", 5)); 
