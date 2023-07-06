# 🤑 SAFU Perks

> Protect Yourself, Unlock Rewards

https://github.com/d0wnlore/urban-spork/tree/d0wnlore_idThon

SAFU Perks rewards crypto explorers that have earned Verifiable Credentials (VCs) related to knowledge of web3 security concepts.

1. Earn your VC through a security or education issuer
2. Unlock the associated role on SAFU Perks
3. ???
4. PROFIT!

![Screenshot of SAFU Perks](https://raw.githubusercontent.com/d0wnlore/urban-spork/d0wnlore_idThon/shot.png)

## Instructions

This dApp is not hosted anywhere, so this needs to be ran locally or deployed with the existing boilerplate instructions at the end of this README. Make sure that the verifier server is publicly accessible using Ngrok or Serveo if deployed locally (or just set the appropriate state flag to `true` in `App.js` to test the unlocked state).

This dApp depends on a “POKAntiPhishing” VC that can be issued using [the demo issuer](https://issuer-demo.polygonid.me/):

1. Click `Create Claims`
2. Select `Custom` for the Schema
3. Enter `https://raw.githubusercontent.com/d0wnlore/urban-spork/d0wnlore_idThon/credential-schema/pok-anti-phishing.json` for the Url
4. Enter `POKAntiPhishing` for the Type
5. Leave Expiration as it is
6. Enter the following for the Data JSON, modifying the `numQuizPassed` value to test different states in the dApp

```
{
    "numQuizPassed": 2
}
```

The idea is that this VC would be issued from a security or education platform that tests the user for their competence of anti-phishing strategies. The issuer would then issue a Proof of Knowledge (POK) VC for anti-phishing knowledge.

The VC only has one value, indicating if the user has passed any anti-phishing quizes, and how many if a number of them were taken at time of issuance.