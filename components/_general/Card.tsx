import { MouseEventHandler } from "react"

interface CardInterface {
  onClick: MouseEventHandler<HTMLDivElement>
  title: string
  description: string
  imageSrc?: string
}

export const Card = ({
  onClick,
  title,
  description,
  imageSrc = "/images/home.jpg",
}: CardInterface) => {
  return (
    <div
      className="shrink-0 w-[300px] cursor-pointer hover:shadow-xl p-2"
      onClick={onClick}
    >
      <figure className="mb-3">
        <img loading="lazy" src={imageSrc} />
      </figure>
      <div className="">
        <h3 className="font-bold">{title}</h3>
        <p className="">{description}</p>
      </div>
    </div>
  )
}
