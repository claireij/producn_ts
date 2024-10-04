import { GenderEnum } from "@models/user"

interface AvatarInterface {
  src?: string
  gender?: GenderEnum
}

const getDefaultProfilPic = (gender?: string) => {
  switch (gender) {
    case GenderEnum.FEMALE:
      return "/images/girl_producn.png"
    case GenderEnum.MALE:
      return "/images/man_producn.png"
    default:
      return "/images/divers_producn.png"
  }
}

export const Avatar = ({ src, gender }: AvatarInterface) => {
  return (
    <figure className="w-20">
      <img
        className="rounded-full border-grey border"
        src={src || getDefaultProfilPic(gender)}
      />
    </figure>
  )
}
