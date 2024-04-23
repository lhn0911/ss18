function combineDecorators(...decorators: Function[]) {
    return function (target: any, propertKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let result = originalMethod.apply(this, args);
            decorators.forEach(decorator => {
                result = decorator(result);
            });
            return result;
        };

        return descriptor;
    };
}

function double(result: number): number {
    return result * 2;
}

function addFive(result: number): number {
    return result + 5;
}

class Test {
    @combineDecorators(double, addFive)
    sum1(a: number, b: number): number {
        return a + b;
    }
}

let sum1 = new Test();
console.log(sum1.sum1(3, 5)); 
