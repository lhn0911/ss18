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
function typeCheckDecorator(target, propertKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
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
    };
    return descriptor;
}
class Test {
    sum1(a, b) {
        return a + b;
    }
    sum2(a, b) {
        return a + b;
    }
}
__decorate([
    typeCheckDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], Test.prototype, "sum1", null);
let sum1 = new Test();
console.log(sum1.sum1(3, 5));
console.log(sum1.sum1("3", 5));
