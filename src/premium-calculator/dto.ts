//--------------Request------------
export class AddOnDetails {
    name: string;
    sumInsured: number;
    planName:string;
}

export class OtherPolicyDetails {
    name: string;
    annualPremium: number;
    isActive: boolean;
}

export class MemberDetails {
    age: number;
    relation: string;
}

export class PrimaryInsuredDetails {
    age: number;
    isEmployee: boolean;
}

export class ProductDetails {
    name: string;
    policyType: string;
    cityType: string;
    sumInsured: number;
    tenure: number;
    premiumPaymentOption: string;
    isOnline: boolean;
    primaryInsured: PrimaryInsuredDetails;
    members: MemberDetails[];
    otherPolicies: OtherPolicyDetails[];
    addOns: AddOnDetails[];
}

export class PremiumCalculationRequestDto {
    products: ProductDetails[];
}
//---------------------------------

//------------Response-------------
export class MemberPremiumDetails {
    member: string;
    age: number;
    grossPremium: number;
    lineDiscountPercent: number;
    lineDiscount: number;
    netPremium: number;
}

export class CumulativeDiscountDetails {
    type: string;
    percent: number;
    amount: number;
}

export class BasePremiumDetails {
    totalGrossPremium: number;
    totalLineDiscount: number;
    totalCumulativeDiscount: number;
    totalNetPremium: number;
    memberDetails: MemberPremiumDetails[];
    cumulativeDiscounts: CumulativeDiscountDetails[];
}

export class AddonPremiumDetails extends BasePremiumDetails {
    name: string;
}

export class ProductPremiumDetails extends BasePremiumDetails {
    productName: string;
    sumInsured: number;
    addons: AddonPremiumDetails[];
}

export class PremiumCalculationResponse {
    premiums: ProductPremiumDetails[];
}
//---------------------------------