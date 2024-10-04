import {
  Html,
  Text,
  Section,
  Container,
  Img,
  Link,
  Hr,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface WelcomeEmailInterface {
  firstname: string
  emailConfirmationString: string
}

export default function WelcomeEmail({
  firstname,
  emailConfirmationString,
}: WelcomeEmailInterface) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/email-confirmation?emailConfirmationString=${
    emailConfirmationString
  }`

  return (
    <Tailwind>
      <Html>
        <Section style={main}>
          <Container style={container}>
            <Img
              className="object-contain"
              src="https://www.producn.com/resources/images/logo.png"
              alt="Producn Logo"
              width="120"
              height="120"
              style={logo}
            />
            <Text style={heading}>Dear {firstname},</Text>
            <Text style={paragraph}>
              We're happy you signed up for Producn.
              <br />
              To explore all our features, please confirm your email address by
              clicking on the link below:
              <br />
              <a href={url}>Click here to confirm your email.</a>
              <br />
              <br />
              Welcome to Producn!
              <br />
              Your Producn-Team
            </Text>

            <Hr className="mt-20 mb-20" />

            <Section style={footer} className="text-center flex justify-center">
              <Link
                href={`${process.env.BASE_URL}/questiontree`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Questiontree
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link
                href={`${process.env.BASE_URL}/private-policy`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Policies
              </Link>
              &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <Link href={`${process.env.BASE_URL}/blog`} target="_blank">
                Producn Blog
              </Link>
              <Text>
                ©2023 Producn, make music easy. <br />
                Marchgrabenplatz 3, 80805 Munich, Germany <br />
                <br />
                All rights reserved.
              </Text>
            </Section>
          </Container>
        </Section>
      </Html>
    </Tailwind>
  )
}

const main = {
  backgroundColor: "#f5f5f5",
  width: "100%",
}

const container = {
  margin: "0 auto",
  padding: "20px",
  width: "580px",
  backgroundColor: "#ffffff",
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
}

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
}

const logo = {
  margin: "0 auto",
}

const footer = {
  margin: "auto 0",
}
