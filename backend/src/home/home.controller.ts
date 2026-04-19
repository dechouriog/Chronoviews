// Por Leidy Obando

// External imports
import { Controller, Get } from '@nestjs/common';

// Internal imports

@Controller()
export class HomeController {
  @Get()
  index(): string {
    return 'API is running';
  }
}