import { useState } from "react"
import { Segmented } from "@components/_general/Segmented"
import { Subscription, SubscriptionLevelEnum } from "./Subscription"
import { SubscriptionService } from "@services/subscription.service"
import { useQuery } from "@tanstack/react-query"
import { Loader } from "@components/Loader"

export const SubscriptionsOverview = () => {
  const preSelectedSubscriptionId = "4"

  const [subscription, setSubscription] = useState(SubscriptionLevelEnum.PRO)

  const {
    data: subscriptionPrices,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => SubscriptionService.getSubscriptionPrices(),
  })

  if (isLoading) return <Loader />

  if (isError || !subscriptionPrices)
    return <p>Could not find subscription prices.</p>

  return (
    <div>
      <Segmented
        onChange={(value: string) => {
          setSubscription(value as SubscriptionLevelEnum)
        }}
        name="subscription_id"
        defaultValue={SubscriptionLevelEnum.PRO}
        options={[
          { value: SubscriptionLevelEnum.BASIC, label: "Basic" },
          { value: SubscriptionLevelEnum.PRO, label: "Pro" },
        ]}
      />

      {subscription == SubscriptionLevelEnum.BASIC ? (
        <Subscription
          subscription={SubscriptionLevelEnum.BASIC}
          subscriptionPrices={subscriptionPrices}
          preSelectedSubscription={preSelectedSubscriptionId}
        />
      ) : (
        <Subscription
          subscription={SubscriptionLevelEnum.PRO}
          subscriptionPrices={subscriptionPrices}
          preSelectedSubscription={preSelectedSubscriptionId}
        />
      )}
    </div>
  )
}
