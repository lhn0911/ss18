function parameterValidator(validationFunc: Function) {
    return function (target: any, propertKey: string, desciptor: PropertyDescriptor) {
        const originalMethod = desciptor.value;
        
        desciptor.value = function (...args: any[]) {
            if (validationFunc(args)) {
                return originalMethod.apply(this, args);
            } else {
                throw new Error("Parameter validation failed.");
            }
        }
        return desciptor;
    }
}

// Validation function
function validateParameters(args: any[]): boolean {
    return args.every(arg => typeof arg === 'number');
}

class Test {
    @parameterValidator(validateParameters)
    sum1(a: number, b: number) {
        return a + b;
    }

    sum2(a: number, b: number) {
        return a + b;
    }
}

let sum1 = new Test();
console.log(sum1.sum1(1, 2));
console.log(sum1.sum1("1", 2));
