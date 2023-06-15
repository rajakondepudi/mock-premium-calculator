export const premiumCalculatorRequestDto = {
    "products": [
      {
        "name": "Optima Restore",
        "policyType": "INDIVIDUAL",
        "cityType": "TIER_1",
        "sumInsured": 500000,
        "tenure": 2,
        "premiumPaymentOption": "YEARLY",
        "isOnline": true,
        "primaryInsured": {
          "age": 45,
          "isEmployee": true
        },
        "members": [
          {
            "age": 42,
            "relation": "WIFE"
          },
          {
            "age": 8,
            "relation": "SON"
          },
          {
            "age": 6,
            "relation": "DAUGHTER"
          }
        ],
        "otherPolicies": [
          {
            "name": "Motor Policy 1",
            "annualPremium": 5000,
            "isActive": true
          },
          {
            "name": "Motor Policy 2",
            "annualPremium": 6000,
            "isActive": true
          }
        ],
        "addOns": [
          {
            "name": "My Health Critical Illness",
            "planName":"Plan 1:9",
            "sumInsured": 100000
          }
        ]
      }
    ]
  }