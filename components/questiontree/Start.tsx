import React from "react"
import { Button } from "@components/_general/button/Button"

interface StartInterface {
  onClickStart: () => void
}

export const Start = ({ onClickStart }: StartInterface) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex gap-7">
         <img
          loading="lazy"
          id="questiontree-start-image"
          src="/images/girl_producn.png"
          alt="Producn girl producing music"
          className="w-[150px]"
        />
        <p>
          Hello!
          <br />
          <br />
          Get a personalized diagnosis for your music production problem. Answer a few questions and we'll pinpoint exactly what's holding you back — and how to fix it.
        </p>
      </div>

      <Button type="primary" onClick={onClickStart}>
        Start!
      </Button>
    </div>
  )
}
