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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const goal_entity_js_1 = require("./entities/goal.entity.js");
let GoalsService = class GoalsService {
    goalsRepository;
    constructor(goalsRepository) {
        this.goalsRepository = goalsRepository;
    }
    findAll() {
        return this.goalsRepository.find();
    }
    findByUserId(userId) {
        return this.goalsRepository.find({ where: { user: { id: userId } } });
    }
    findOne(id) {
        return this.goalsRepository.findOneBy({ id });
    }
    create(createGoalDto) {
        const { userId, taskId, ...rest } = createGoalDto;
        const goal = this.goalsRepository.create({
            ...rest,
            user: { id: userId },
            task: { id: taskId },
            period: rest.period ?? 'monthly',
        });
        return this.goalsRepository.save(goal);
    }
    async remove(id) {
        await this.goalsRepository.delete(id);
    }
};
exports.GoalsService = GoalsService;
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(goal_entity_js_1.Goal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GoalsService);
//# sourceMappingURL=goals.service.js.map