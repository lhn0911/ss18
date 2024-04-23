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
function combineDecorators(...decorators) {
    return function (target, propertKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let result = originalMethod.apply(this, args);
            decorators.forEach(decorator => {
                result = decorator(result);
            });
            return result;
        };
        return descriptor;
    };
}
function double(result) {
    return result * 2;
}
function addFive(result) {
    return result + 5;
}
class Test {
    sum1(a, b) {
        return a + b;
    }
}
__decorate([
    combineDecorators(double, addFive),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Number)
], Test.prototype, "sum1", null);
let sum1 = new Test();
console.log(sum1.sum1(3, 5));
