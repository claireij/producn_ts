import { Button } from "@components/_general/button/Button"

export const Footer = () => {
  return (
    <footer className="bg-white z-49 flex justify-between p-7 border-t border-grey mt-5 relative left-0 right-0">
      <div id="footer-copyright">
        <figcaption className="darkwriting">
          Producn &#169; {new Date().getFullYear()}
          <br />
          All rights reserved.
        </figcaption>
      </div>

      <div id="footer-legal">
        <ul id="footer-legal-list">
          <a href="/imprint">
            <li>Imprint</li>
          </a>
          <a href="/privacy-policy">
            <li>Privacy Policy</li>
          </a>
        </ul>
      </div>

      <div className="flex gap-2">
        <Button
          target="_blank"
          href="https://www.facebook.com"
          rel="noreferrer"
          icon={
            <img
              alt="logo-facebook"
              src="/graphics/social_media/logo-facebook.svg"
            />
          }
        ></Button>

        <Button
          target="_blank"
          href="https://www.instagram.com/producn.official/?hl=de"
          rel="noreferrer"
          icon={
            <img
              alt="logo-instagram"
              src="/graphics/social_media/logo-instagram.svg"
            />
          }
        ></Button>

        <Button
          target="_blank"
          href="https://www.youtube.com"
          rel="noreferrer"
          icon={
            <img
              alt="logo-youtube"
              src="/graphics/social_media/logo-youtube.svg"
            />
          }
        ></Button>
      </div>
    </footer>
  )
}
