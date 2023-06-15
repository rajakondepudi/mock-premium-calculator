import { Injectable } from "@nestjs/common";

@Injectable()
export class AddonApplicableDiscount {
    public discountRequest;
    constructor(discountRequest){
        this.discountRequest = discountRequest
    }

    setDiscount(discount){
        // Logic to be written for setting the discount
    }

    async getApplicableDiscountsResponse() {
        // Hardcoded for product Optima Restore, policy type Individual, addon My Health CI,  plan 1:9 illness
        return {
            "memberDetails": [],
            "cumulativeDiscounts": [
                {
                    "type": "FAMILY_DISCOUNT",
                    "percent": 10
                },
                {
                    "type": "EMPLOYEE",
                    "percent": 10
                }
                // skipping LONG_TERM, ONLINE discounts because combined discounts should not exceed 20%
                //note:- clarity is still pending on "Will there be any priorities defined for applicability of discount not to be more than 20% ?" query already raised with Angad
            ]
        }

    }
}