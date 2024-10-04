import { SubscriptionEnum } from "@models/subscription"
import { SubscriptionLevelEnum } from "./components/subscriptions/Subscription"

export const paypalSDK = `https://www.paypal.com/sdk/js?client-id=${
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
}&debug=false&components=buttons&vault=true&intent=subscription`

export const dateFormat = "MMM Do YYYY"

export const benefits = [
  {
    name: "Question tree categories: Recording, Mixing, Mastering",
    available: [SubscriptionLevelEnum.PRO, SubscriptionLevelEnum.BASIC],
  },
  {
    name: "Question tree categories: Songwriting, Sounddesign",
    available: [SubscriptionLevelEnum.PRO],
  },
  { name: "Access to quizzes", available: [SubscriptionLevelEnum.PRO] },
]

export const paypalSubscriptionPlans = [
  {
    subscription_id: SubscriptionEnum.BASIC_MONTHLY,
    plan_id: process.env.NEXT_PUBLIC_PAYPAL_SUBSCRIPTION_PLAN_BASIC_MONTHLY,
  },
  {
    subscription_id: SubscriptionEnum.BASIC_YEARLY,
    plan_id: process.env.NEXT_PUBLIC_PAYPAL_SUBSCRIPTION_PLAN_BASIC_YEARLY,
  },
  {
    subscription_id: SubscriptionEnum.PRO_MONTHLY,
    plan_id: process.env.NEXT_PUBLIC_PAYPAL_SUBSCRIPTION_PLAN_PRO_MONTHLY,
  },
  {
    subscription_id: SubscriptionEnum.PRO_YEARLY,
    plan_id: process.env.NEXT_PUBLIC_PAYPAL_SUBSCRIPTION_PLAN_PRO_YEARLY,
  },
]

export const firstQuestionId = "1"

export const maxArticlesPerPage = 6

export const cancelReasons = [
  {
    reason: "Cost",
    description:
      "Wait! We may have a lower-priced membership level that suits you...",
    button: "Explore Pricing Options",
  },
  {
    reason: "Difficulty of Use",
    description: "You need some help? We are here for you!",
    button: "Send us an email",
  },
  {
    reason: "Missing Functionality",
    description:
      "Wait! We have so many features, one can be easily overlooked. Let's double check!",
    button: "Send us an email",
  },
  {
    reason: "Not Using it",
    description:
      "We'd love to help you get the most out of your Producn subscription and show you how it can improve your tracks!",
    button: "Help me",
  },
  {
    reason: "Something else",
    description:
      "Please tell us why you want to cancel your Producn subscription.",
    button: "Contact support",
  },
]
