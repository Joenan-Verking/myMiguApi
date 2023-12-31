"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 自搭建的一个缓存机制
const dayjs = require('dayjs');
class Cache {
    constructor() {
        this.map = {};
        this.timeMap = {};
        this.lastClear = 0;
    }
    clear() {
        const nowKey = dayjs().format('YYYYMMDDHHmm');
        if (this.lastClear === nowKey) {
            return;
        }
        const clearTime = Object.keys(this.timeMap).filter((v) => v <= nowKey);
        clearTime.forEach((timeKey) => {
            this.timeMap[timeKey].forEach((k) => {
                delete this.map[k];
            });
            delete this.timeMap[timeKey];
        });
        this.lastClear = nowKey;
    }
    get(key) {
        this.clear();
        return this.map[key];
    }
    set(key, value, time = 90) {
        this.clear();
        const timeKye = dayjs().add(time, 'minutes').format('YYMMDDHHmm');
        this.map[key] = value;
        this.timeMap[timeKye] = this.timeMap[timeKye] || [];
        this.timeMap[timeKye].push(key);
    }
}
exports.default = new Cache();
