function decorMethod(target: any, propertKey: string, desciptor: PropertyDescriptor) {
    const originalMethod = desciptor.value;
    desciptor.value = function (a: number, b: number) {
        console.log(`Function Name: ${propertKey}`);
        console.log(`Args: ${a}, ${b}`);
        const result = originalMethod.apply(this, [a, b]);
        console.log(`Result: ${result}`);
        return result;
    }
    return desciptor;
}

class Test {
    // viết phương thức cho class Test
    // tạo function tính tổng
    @decorMethod
    sum1(a: number, b: number) {
        return a + b;
    }

    sum2(a: number, b: number) {
        return a + b;
    }
}

let sum1 = new Test();
console.log(sum1.sum1(1, 2));
