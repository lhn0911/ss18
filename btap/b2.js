"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function timingDecorator(target, propertKey, desciptor) {
    const originalMethod = desciptor.value;
    desciptor.value = function (...args) {
        const start = Date.now();
        console.log(propertKey);
        console.log(args);
        const result = originalMethod.apply(this, args);
        const end = Date.now();
        console.log(end - start);
        console.log(result);
        return result;
    };
    return desciptor;
}
class Test {
    sum1(a, b) {
        let total = 0;
        for (let i = 0; i < 100000000; i++) {
            total += i;
        }
        return total;
    }
    sum2(a, b) {
        return a + b;
    }
}
__decorate([
    timingDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], Test.prototype, "sum1", null);
let sum1 = new Test();
console.log(sum1.sum1(1, 2));
