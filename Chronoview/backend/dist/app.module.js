"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_js_1 = require("./auth/auth.module.js");
const goals_module_js_1 = require("./goals/goals.module.js");
const home_module_js_1 = require("./home/home.module.js");
const tasks_module_js_1 = require("./tasks/tasks.module.js");
const users_module_js_1 = require("./users/users.module.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'database.sqlite',
                autoLoadEntities: true,
                synchronize: true,
            }),
            auth_module_js_1.AuthModule,
            goals_module_js_1.GoalsModule,
            home_module_js_1.HomeModule,
            tasks_module_js_1.TasksModule,
            users_module_js_1.UsersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map