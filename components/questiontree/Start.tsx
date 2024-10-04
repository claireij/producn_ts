import React from "react"
import { Button } from "@components/_general/button/Button"

interface StartInterface {
  onClickStart: () => void
}

export const Start = ({ onClickStart }: StartInterface) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <p>
        Hello!
        <br />
        <br />
        You're about to use our question tree to solve your music production
        problems. Your answers will be carefully analysed and you'll learn about
        the plausible reasons for your problems and what solution we think would
        work best to resolve them!
      </p>
      <img
        loading="lazy"
        id="questiontree-start-image"
        src="/images/girl_producn.png"
        alt="Producn girl producing music"
        className="w-[150px]"
      />

      <Button type="primary" onClick={onClickStart}>
        Start!
      </Button>
    </div>
  )
}
