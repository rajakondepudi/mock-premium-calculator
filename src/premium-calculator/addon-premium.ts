import { Injectable } from "@nestjs/common";

@Injectable()
export class AddOnPremium {
    public addOnPremiumRequest;
    constructor(addOnPremiumRequest){
        this.addOnPremiumRequest = addOnPremiumRequest;
    }

    setPremium($premium){
		// code to perform set product premium logic
    }

	async getPremiumResponse(){

        return {
            "linePremiums":[
                {
                    "relation": "SELF",
                    "age": 45,
                    "premium": 1028 //premium*tenure
                },
                {
                    "relation": "WIFE",
                    "age": 42,
                    "premium": 1028 //premium*tenure
                }
            ],
            "cumulativePremium":{ //  premium which does not fit at line level Ex. IPA addon premium

            }
        }

    }
}