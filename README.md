# Seeder Etvas APP

This repository is intended to have a quick start for ETVAS Application Integrations.

It contains both the Front-End (React) and the Back-End (NodeJS) applications.

## Instructions

#### 1. Clone (or fork this repo)

```
git clone git@github.com:etvascom/seeder-etvasapp.git
```

#### 2. Change the origin to point to your own repository

```
git remote rm origin
git remote add origin <your_git_repository>.git
git config master.remote origin
git config master.merge refs/head/master
```

#### 3. Change the environment values to reflect your setup

You might want to take a look at the next section prior to this.

```
vim server/.env.development.local
vim client/.env.development.local
```

#### 4. Run it

You have a special script named `bootstrap` that will run install in both client and server. Clever, huh?

```
npm run bootstrap
npm run start
```

## More information

## Security

The communication between Etvas App and Etvas Platform has to include two elements:

- A token (shareable), stored in the Front-End Etvas App
- A secret API KEY (non-shareable), stored exclusively in the Back-End Etvas App
- A context, for correct customer and product or service isolation

### The token

The token is received in the query when the Customer Portal loads the application. You can easily verify the token with our dedicated REST endpoint. The verification also gives the opportunity to extract useful information from the token. Although the token is a standard JWT token, we do not recommend decoding and use information comprised, because it may be subject to change without prior notice.

Please remember the token is valid for one hour.

### The API Key

The API key is generated by Etvas Platform for each Service Partner and must not be used by the Front-End Etvas App. It should be typically stored in an environment variable for the sole use of Back-End Etvas App. We will provide you with an API KEY.

Please consider the API key as a master password for your account with Etvas. Anyone who can read it can make API calls to Etvas Platform in your name.

If you lose you API key, we will issue another one as fast as possible. In the worst case scenario, when your API key is compromised, you have to contact us immediately to issue a new one. Once a new API key is issued for your account, the old one cannot be used anymore. In any of these cases, you must update your environment variables with the new API key. As we expect downtime in the communication between Etvas and your endpoints, a good timing is crucial to minimize this negative impact.

The API key must be present in all your calls to Etvas platform, as a header named `x-api-key`. Our security infrastructure will validate the request as a first-layer operation.

### The context

The context is basically an ID (string) that uniquely identifies the customer, the product and the payment, summarized as a purchase. In fact, in [events](#events), you will use the `purchaseId` as the context. As you might expect, the context changes with every purchase, even if the product and the customer can be the same.

If you think this is an overhead, take into account a particular use case, when the customer [cancels](#product-canceled) the product/service and [purchases](#product-purchased) it again. This is a new purchase and must be consumed basically as a new user, without any data retention.

The main use for the context is sending it in the `x-etvas-context` header with your requests (along with the API key). An important secondary use is when you want to [read or write data](#using-etvas-platform-for-storing-and-retrieving-information), when the data is relevant to the purchase in question.

You can obtain the context by verifying the token. Once the validity of the token (expiry and signature) is verified, you will receive as response an object containing a `context`. You can use the received context to various calls, including getting the customer profile.

> **Note**: Each time a customer uses your product or service, a new shiny fresh token will be generated. When verifying the token, you receive a context. You should be aware of the fact that, for the same customer and the same product/service, the context will always be the same, even though the token is different.

You can find details about the implementation and information flow in the [Documentation](/Documentation.md) file.

The application uses the [etvas-sdk](https://github.com/etvascom/etvas-sdk) for back-end communication and [etvas-kit](https://github.com/etvascom/etvas-kit) for React Components, UI theming and more.

Please consult the corresponding documentation to learn more.
