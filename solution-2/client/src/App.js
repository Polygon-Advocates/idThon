import "./App.css";
import { useState } from "react";
import PolygonIDVerifier from "./PolygonIDVerifier";
import { Center, Card, Image, CardBody, Container } from "@chakra-ui/react";

function App() {
  // if you're developing and just want to see the dapp without going through the Polygon ID flow,
  // temporarily set this to "true" to ignore the Polygon ID check and go straight to the dapp page
  const [provedBornBefore2000, setProvedBornBefore2000] = useState(false);
  return (
    <Center className="vc-check-page">
      <Container>
        <Card
          style={{
            border: "2px solid #805AD5",
          }}
        >
          <CardBody style={{ paddingBottom: 0 }}>
            <p>Prove you were born before January 1, 2000 to use the dapp</p>

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
