import { LoginDto } from "./dto/login.dto.js";
import { RegisterDto } from "./dto/register.dto.js";
import { User } from "../users/entities/user.entity.js";
import { UsersService } from "../users/users.service.js";
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(loginDto: LoginDto): Promise<User>;
    register(registerDto: RegisterDto): Promise<User>;
}
