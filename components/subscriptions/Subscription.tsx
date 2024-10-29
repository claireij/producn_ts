import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs"
import { SubscriptionEnum, SubscriptionPrice } from "@models/subscription"
import { benefits } from "../../consts"
import { Radio } from "@components/_general/form/Radio"
import { Form } from "@components/_general/form/Form"

export enum SubscriptionLevelEnum {
  PRO = "PRO",
  BASIC = "BASIC",
}

interface SubscriptionInterface {
  subscriptionPrices: Array<SubscriptionPrice>
  subscription: SubscriptionLevelEnum
}

export const Subscription = ({
  subscriptionPrices,
  subscription,
}: SubscriptionInterface) => {
  const monthlyPrice =
    subscription === SubscriptionLevelEnum.PRO
      ? subscriptionPrices.find((element) => element.id == "3")?.price || 0
      : subscriptionPrices.find((element) => element.id == "1")?.price || 0
  const yearlyPrice =
    subscription === SubscriptionLevelEnum.PRO
      ? subscriptionPrices.find((element) => element.id == "4")?.price || 0
      : subscriptionPrices.find((element) => element.id == "2")?.price || 0

  const saving = monthlyPrice * 12 - yearlyPrice

  return (
    <div key={subscription}>
      <ul className="mb-2">
        {benefits.map((benefit) => {
          const isAvailable = benefit.available.includes(subscription)

          return (
            <li className="flex gap-2 items-center" key={benefit.name}>
              {isAvailable ? (
                <BsFillCheckCircleFill fill="#4C956C" />
              ) : (
                <BsFillXCircleFill fill="#f87575" />
              )}
              {benefit.name}
            </li>
          )
        })}
      </ul>

      <Form.Item name="subscription_id">
        <Radio.Group>
          <Radio
            value={
              subscription === SubscriptionLevelEnum.PRO
                ? SubscriptionEnum.PRO_MONTHLY
                : SubscriptionEnum.BASIC_MONTHLY
            }
          >
            {monthlyPrice} $ monthly
          </Radio>
          <Radio
            value={
              subscription === SubscriptionLevelEnum.PRO
                ? SubscriptionEnum.PRO_YEARLY
                : SubscriptionEnum.BASIC_YEARLY
            }
            isDefault={subscription === SubscriptionLevelEnum.PRO}
          >
            {yearlyPrice}$ yearly (save {saving}$)
          </Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
