import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PremiumCalculationResponse } from './premium-calculator/dto';
import { premiumCalculatorRequestDto } from './premium-calculator/mock-request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('calculate-premium')
  async calculatePremium():Promise<PremiumCalculationResponse>{
    return await this.appService.calculatePremium(premiumCalculatorRequestDto);
  }
}
