import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductApplicableDiscount {
    public discountRequest;
    constructor(discountRequest){
        this.discountRequest = discountRequest
    }

    setDiscount(discount){
        // Logic to be written for setting the discount
    }

    async getApplicableDiscountsResponse() {
        // Hardcoded for product Optima Restore, policy type Individual
        return {
            "memberDetails": [],
            "cumulativeDiscounts": [
                {
                    "type": "FAMILY_DISCOUNT",
                    "percent": 10
                },
                {
                    "type": "LONG_TERM",
                    "percent": 7.5,
                },
                {
                    "type": "ONLINE",
                    "percent": 5,
                },
                {
                    "type": "EMPLOYEE",
                    "percent": 5,
                }
                // skipping LOYALTY discount because In Individual policy type, the total combined discount offered under 4 discounts i.e. Family discount, Loyalty discount, Online discount and Employee discount should not exceed 20%.
                //note:- clarity is still pending on "Will there be any priorities defined for applicability of discount not to be more than 20% ?" query already raised with Angad
            ]
        }

    }
}