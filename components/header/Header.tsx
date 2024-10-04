import Link from "next/link"
import { useState } from "react"
import { GrMenu } from "react-icons/gr"

import { LoginButton } from "./LoginButton"
import { Menu } from "@components/_general/Menu"
import Head from "next/head"
import Image from "next/image"
import { Drawer } from "@components/_general/Drawer"
import { Button } from "@components/_general/button/Button"
import { Avatar } from "@components/_general/Avatar"
import { paypalSDK } from "../../consts"
import { useSession } from "next-auth/react"

interface HeaderInterface {
  title: string
}

export const Header = ({ title }: HeaderInterface) => {
  const [open, setOpen] = useState(false)

  const { data: session } = useSession()

  const userPicture = session?.user?.image
    ? session?.user?.image
    : "/images/girl_producn.png"

  const menuItems = [
    {
      key: "questiontree",
      label: (
        <Link href="/questiontree" className="header-nav-link">
          Question Tree
        </Link>
      ),
    },
    {
      key: "blog",
      label: (
        <Link href="/blog" className="header-nav-link">
          Blog
        </Link>
      ),
    },
    {
      key: "faq",
      label: (
        <Link href="/faqs" className="header-nav-link">
          FAQs
        </Link>
      ),
    },
    {
      key: "login",
      label: <LoginButton />,
    },
  ]

  return (
    <div>
      <Head>
        <title>{title || "Producn"}</title>
        <script defer src={paypalSDK} />
      </Head>

      <header className="p-7 flex justify-between mb-5 border-b border-grey bg-white">
        <div className="flex gap-2 items-center ">
          <Link href="/" legacyBehavior>
            <figure className="header__logo">
              <Image
                src="/images/logo.png"
                height={34}
                width={100}
                alt="Producn Logo"
              />
            </figure>
          </Link>

          <GrMenu
            onClick={() => {
              setOpen(!open)
            }}
            className="cursor-pointer"
          />
        </div>

        <Drawer
          open={open}
          onClose={() => {
            setOpen(!open)
          }}
        >
          <Menu items={menuItems} />
        </Drawer>

        <div className="flex gap-3 items-center">
          <Button type="primary" href="/questiontree">
            Question Tree
          </Button>

          {session?.user ? (
            <Link href="/profil">
              <Avatar src={userPicture}></Avatar>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </header>
    </div>
  )
}
