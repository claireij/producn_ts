import { Button } from "@components/_general/button/Button"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white mt-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p
            className="text-sm bold text-slate-950"
            style={{ fontFamily: "Spartan, Arial, sans-serif" }}
          >
            producn.
          </p>
          <p className="text-sm text-slate-600">
            © {currentYear} Producn — All rights reserved.
          </p>
        </div>

        <nav>
          <ul className="flex flex-wrap items-center gap-6 text-sm text-slate-700">
            <li>
              <a
                href="/imprint"
                className="transition hover:text-black"
              >
                Imprint
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="transition hover:text-black"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            target="_blank"
            href="https://www.facebook.com"
            rel="noreferrer"
            classNames="!w-11 !h-11 !px-0 !py-0 !rounded-full !border-black !bg-white !text-black shadow-sm hover:bg-slate-100 hover:scale-105"
            icon={
              <img
                alt="logo-facebook"
                className="h-4 w-4"
                src="/graphics/social_media/logo-facebook.svg"
              />
            }
          />

          <Button
            target="_blank"
            href="https://www.instagram.com/producn.official/?hl=de"
            rel="noreferrer"
            classNames="!w-11 !h-11 !px-0 !py-0 !rounded-full !border-black !bg-white !text-black shadow-sm hover:bg-slate-100 hover:scale-105"
            icon={
              <img
                alt="logo-instagram"
                className="h-4 w-4"
                src="/graphics/social_media/logo-instagram.svg"
              />
            }
          />

          <Button
            target="_blank"
            href="https://www.youtube.com"
            rel="noreferrer"
            classNames="!w-11 !h-11 !px-0 !py-0 !rounded-full !border-black !bg-white !text-black shadow-sm hover:bg-slate-100 hover:scale-105"
            icon={
              <img
                alt="logo-youtube"
                className="h-4 w-4"
                src="/graphics/social_media/logo-youtube.svg"
              />
            }
          />
        </div>
      </div>
    </footer>
  )
}
