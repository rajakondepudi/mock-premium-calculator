import { Injectable } from '@nestjs/common';
import { PremiumCalculationRequestDto, PremiumCalculationResponse, ProductDetails } from './premium-calculator/dto';
import { PremiumCalculator } from './premium-calculator/premium-calculator-class';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async calculatePremium(premiumCalculationRequestDto: PremiumCalculationRequestDto): Promise<PremiumCalculationResponse>{
    const premiumCalculator = new PremiumCalculator();
    const premiumCalculatorResponse = new PremiumCalculationResponse();
    premiumCalculatorResponse.premiums = [];

    // Premium calculation for each product
    for (let index = 0; index < premiumCalculationRequestDto.products.length; index++) {
      let response = await premiumCalculator.calculatePremium(premiumCalculationRequestDto.products[index]);
      premiumCalculatorResponse.premiums.push(response);
    }

    return premiumCalculatorResponse; // method response returned from service

  }
}
