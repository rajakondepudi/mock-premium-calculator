import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductPremium {
    public productPremiumRequest;
    constructor(productPremiumRequest){
        this.productPremiumRequest = productPremiumRequest;
    }

    setPremium(premium){
		// code to perform set product premium logic
    }

	async getPremiumResponse(){

        return [
            {
                "age":45,
                "premium":11460
            },
            {
                "age":42,
                "premium":11460
            },
            {
                "age":8,
                "premium":7849
            },
            {
                "age":6,
                "premium":7849
            }
        ];

    }
}