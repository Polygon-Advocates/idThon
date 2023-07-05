import "./App.css";
import { useState } from "react";
import PolygonIDVerifier from "./PolygonIDVerifier";
import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";

function App() {
  const [provedBornBefore2000, setProvedBornBefore2000] = useState(false);

  return (
    <Center className="vc-check-page">
      <Container>
        <Card>
          <CardBody style={{ paddingBottom: 0 }}>
            <p>
              Prove you were born before January 1, 2000 and see where Childish
              Gambino got his inspiration for Redbone, stay woke! 👀
            </p>

            <PolygonIDVerifier
              publicServerURL={
                process.env.REACT_APP_VERIFICATION_SERVER_PUBLIC_URL
              }
              localServerURL={
                process.env.REACT_APP_VERIFICATION_SERVER_LOCAL_HOST_URL
              }
              credentialType={"KYCAgeCredential"}
              issuerOrHowToLink={
                "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
              }
              onVerificationResult={setProvedBornBefore2000}
            />
            {provedBornBefore2000 ? (
              <Image
                src="/1900s.gif"
                alt="Prince performing 1999"
                borderRadius="lg"
                style={{
                  aspectRatio: "4/3",
                  width: "100%",
                }}
              />
            ) : (
              <Image
                src="/2000s.webp"
                alt="Childish Gambino performing Redbone"
                borderRadius="lg"
                style={{
                  aspectRatio: "16/9",
                  width: "100%",
                }}
              />
            )}
          </CardBody>
        </Card>
      </Container>
    </Center>
  );
}

export default App;
