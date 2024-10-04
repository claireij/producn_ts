interface DividerInterface {
  text: string
}

export const Divider = ({ text }: DividerInterface) => {
  return (
    <div className="divider w-full flex mb-3 mt-5">
      {" "}
      <div className="px-1 font-bold whitespace-nowrap">{text}</div>
    </div>
  )
}
