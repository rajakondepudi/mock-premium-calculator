import { Injectable } from "@nestjs/common";
import { AddonApplicableDiscount } from "./addon-applicable-discount";
import { ProductApplicableDiscount } from "./product-applicable-discount";
import { AddOnPremium } from "./addon-premium";
import { ProductDetails, ProductPremiumDetails } from "./dto";
import { ProductPremium } from "./product-premium";
@Injectable()
export class PremiumCalculator {
    private premiumCalculatorRequest: ProductDetails;
    private premiumCalculatorResponse: ProductPremiumDetails

    async calculatePremium(premiumCalculatorRequest: ProductDetails):Promise<ProductPremiumDetails>{
        this.premiumCalculatorRequest = premiumCalculatorRequest
        this.premiumCalculatorResponse = new ProductPremiumDetails()
        this.initializeResponse();

        await this.productPremiumCalculation();
        await this.productDiscountApplication();
        await this.commonPolicyDiscountCalculation();
        await this.addonPremiumCalculation();
        await this.addonDiscountApplication();
        await this.addonCommonPolicyDiscountCalculation();
        return this.premiumCalculatorResponse;
    }

    private initializeResponse() {
        /* This function initializes the response structure for incoming request */

        /* Product premium object initialization started */
        this.premiumCalculatorResponse.productName = this.premiumCalculatorRequest.name
        this.premiumCalculatorResponse.sumInsured = this.premiumCalculatorRequest.sumInsured
        this.premiumCalculatorResponse.totalGrossPremium = 0
        this.premiumCalculatorResponse.totalLineDiscount = 0
        this.premiumCalculatorResponse.totalCumulativeDiscount = 0
        this.premiumCalculatorResponse.totalNetPremium = 0
        this.premiumCalculatorResponse.memberDetails = this.premiumCalculatorRequest.members.map(member => {
            return {
                "member": member.relation,
                "age": member.age,
                "grossPremium": 0,
                "lineDiscountPercent": 0,
                "lineDiscount": 0,
                "netPremium": 0
            }
        })
        this.premiumCalculatorResponse.cumulativeDiscounts = [];
        let primaryInsured = {
            "member": "SELF",
            "age": this.premiumCalculatorRequest.primaryInsured.age,
            "grossPremium": 0,
            "lineDiscountPercent": 0,
            "lineDiscount": 0,
            "netPremium": 0
        };
        this.premiumCalculatorResponse.memberDetails.push(primaryInsured);



        /* Addon validated & object initialized, if present */
        if (this.premiumCalculatorRequest.addOns && this.premiumCalculatorRequest.addOns.length > 0) {
            this.premiumCalculatorResponse.addons = this.premiumCalculatorRequest.addOns.map(addOn => {
                return {
                    "name": addOn.name,
                    "sumInsured": addOn.sumInsured,
                    "totalGrossPremium": 0,
                    "totalLineDiscount": 0,
                    "totalCumulativeDiscount": 0,
                    "totalNetPremium": 0,
                    "memberDetails": [],
                    "cumulativeDiscounts": []
                }
            })
        }

        /* Product premium object initialization completed */
    }

    private async  productPremiumCalculation() {
        /* This function will calculate premium for each member */

        let request = {
            "sumInsured": this.premiumCalculatorRequest.sumInsured,
            "cityType": this.premiumCalculatorRequest.cityType,
            "premiumForAges": [this.premiumCalculatorRequest.primaryInsured.age, ...this.premiumCalculatorRequest.members.map(member => member.age)] //distinct age to be passed
        }
        let productPremium = new ProductPremium(request);
        //productPremium wil be passed in rule engine as a fact before calling getPremiumResponse function

        let premiums = await productPremium.getPremiumResponse() //Premium returned from DT

        //updating premium for each member
        this.premiumCalculatorResponse.memberDetails.forEach((member) => {
            let premiumIndex = premiums.findIndex(premium => member.age == premium.age)
            if (premiumIndex > -1)
                member.grossPremium = premiums[premiumIndex].premium * this.premiumCalculatorRequest.tenure // total premium based on tenure
            member.netPremium = member.grossPremium  // net premium also initialized
            this.premiumCalculatorResponse.totalGrossPremium += member.grossPremium
        })
        this.premiumCalculatorResponse.totalNetPremium = this.premiumCalculatorResponse.totalGrossPremium

    }

    private async productDiscountApplication() {
        /* This function will collect applicable discounts on the product */

        let request = {
            "sumInsured": this.premiumCalculatorRequest.sumInsured,
            "tenure": this.premiumCalculatorRequest.tenure,
            "memberDetails": this.premiumCalculatorResponse.memberDetails
        }
        let productApplicableDiscount = new ProductApplicableDiscount(request);
        //productApplicableDiscount wil be passed in rule engine as a fact before calling getApplicableDiscountsResponse function

        let discounts = await productApplicableDiscount.getApplicableDiscountsResponse() // discounts returned from DT
        
        if(discounts.memberDetails){} // Logic to be written for line level discount

        if(discounts.cumulativeDiscounts){ // cumulative discounts 
            discounts.cumulativeDiscounts.forEach(discount => {

                this.premiumCalculatorResponse.cumulativeDiscounts.push({
                    ...discount,
                    "amount": 0
                })

            })
        }

    }

    private async commonPolicyDiscountCalculation() {
        //Calculation of cumulative discounts
        this.premiumCalculatorResponse.cumulativeDiscounts.forEach(discount => {
            discount.amount = (this.premiumCalculatorResponse.totalGrossPremium * discount.percent * 0.01);
        })
        this.premiumCalculatorResponse.totalCumulativeDiscount = +(this.premiumCalculatorResponse.cumulativeDiscounts.reduce((n, {amount}) => n + amount, 0)).toFixed(2) //summation of cumulative discounts       
        this.premiumCalculatorResponse.totalNetPremium = this.premiumCalculatorResponse.totalGrossPremium - this.premiumCalculatorResponse.totalCumulativeDiscount

        // Line discount to be calculated if applicable
    }

    private async addonPremiumCalculation(){

        for (let index = 0; index < this.premiumCalculatorRequest.addOns.length; index++) {
        
            /* This function will calculate addon premium for each member */
            let primaryInsured = {"relation":"SELF", ...this.premiumCalculatorRequest};
            let request = {
                "sumInsured": this.premiumCalculatorRequest.addOns[index].sumInsured,
                "tenure": this.premiumCalculatorRequest.tenure,
                "members": [...this.premiumCalculatorRequest.members, primaryInsured]
            }
            let addOnPremium = new AddOnPremium(request);
            //addOnPremium wil be passed in rule engine as a fact before calling getPremiumResponse function

            let premiums = await addOnPremium.getPremiumResponse() //Premium returned from DT
            if(premiums.linePremiums.length){ 
                premiums.linePremiums.forEach(premium => {
                    let linePremium = premium.premium;
                    this.premiumCalculatorResponse.addons[index].totalGrossPremium += linePremium;
                    this.premiumCalculatorResponse.addons[index].memberDetails.push({
                        "member": premium.relation,
                        "age": premium.age,
                        "grossPremium": premium.premium,
                        "lineDiscountPercent": 0,
                        "lineDiscount": 0,
                        "netPremium": premium.premium
                    })
                });
                this.premiumCalculatorResponse.addons[index].totalNetPremium = this.premiumCalculatorResponse.addons[index].totalGrossPremium
            }   // calculate the line premium if applicable/exist

            if(premiums.cumulativePremium){} // calculate the cumulative premium if applicable/exist
        }

    }

    private async addonDiscountApplication(){
        /* This function will collect applicable discounts on the addon */
        
        for (let index = 0; index < this.premiumCalculatorRequest.addOns.length; index++) {
            let request = {
                "sumInsured": this.premiumCalculatorRequest.addOns[index].sumInsured,
                "tenure": this.premiumCalculatorRequest.tenure,
                "memberDetails": this.premiumCalculatorResponse.addons[index].memberDetails
            }
            let addonApplicableDiscount = new AddonApplicableDiscount(request);
            //addonApplicableDiscount wil be passed in rule engine as a fact before calling getApplicableDiscountsResponse function

            let discounts = await addonApplicableDiscount.getApplicableDiscountsResponse() // discounts returned from DT
            
            if(discounts.memberDetails){} // Logic to be written for line level discount

            if(discounts.cumulativeDiscounts){ // cumulative discounts 
                discounts.cumulativeDiscounts.forEach(discount => {

                    this.premiumCalculatorResponse.addons[index].cumulativeDiscounts.push({
                        ...discount,
                        "amount": 0
                    })

                })
            }
        }
    }

    private async addonCommonPolicyDiscountCalculation() {
        for (let index = 0; index < this.premiumCalculatorResponse.addons.length; index++) {

            //Calculation of cumulative discounts
            this.premiumCalculatorResponse.addons[index].cumulativeDiscounts.forEach(discount => {
                discount.amount = ( this.premiumCalculatorResponse.addons[index].totalGrossPremium * discount.percent * 0.01);
            })
            this.premiumCalculatorResponse.addons[index].totalCumulativeDiscount = +(this.premiumCalculatorResponse.addons[index].cumulativeDiscounts.reduce((n, {amount}) => n + amount, 0)).toFixed(2) //summation of cumulative discounts       
            this.premiumCalculatorResponse.addons[index].totalNetPremium =  this.premiumCalculatorResponse.addons[index].totalGrossPremium - this.premiumCalculatorResponse.addons[index].totalCumulativeDiscount

            // Line discount to be calculated if applicable
        }

    }

}