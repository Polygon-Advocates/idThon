// You can edit this code!
// Click here and start typing.
package main

import (
	"fmt"
	"log"

	"github.com/iden3/go-schema-processor/merklize"
	"github.com/iden3/go-schema-processor/utils"
)

const (
	jsonLDContext = "https://raw.githubusercontent.com/wefa-tech/idThon/Oba-One_idThon/schemas/proof-of-plant-care.jsonld" // JSONLD schema for credential
	typ           = "ProofOfPlantCare"                                                                                     // credential type
	fieldName     = "canClaimCredit"                                                                                       // field name in form of field.field2.field3 field must be present in the credential subject
	schemaJSONLD  = `{
 "@context": [
    {
      "@version": 1.1,
      "@protected": true,
      "id": "@id",
      "type": "@type",
      "ProofOfPlantCare": {
        "@id": "https://raw.githubusercontent.com/wefa-tech/idThon/Oba-One_idThon/schemas/proof-of-plant-care.jsonld#ProofOfPlantCare",
        "@context": {
          "@version": 1.1,
          "@protected": true,
          "id": "@id",
          "type": "@type",
          "vocab": "https://github.com/wefa-tech/idThon/blob/Oba-One_idThon/schemas/proof-of-plant-care-vocab.md#",
          "xsd": "http://www.w3.org/2001/XMLSchema#",
          "plantDid": {
            "@id": "vocab:plantDid",
            "@type": "xsd:string"
          },
          "spaceDid": {
            "@id": "vocab:spaceDid",
            "@type": "xsd:string"
          },
          "canClaimCredit": {
            "@id": "vocab:canClaimCredit",
            "@type": "xsd:boolean"
          },
          "health": {
            "@id": "vocab:health",
            "@type": "xsd:integer"
          },
          "image": {
            "@id": "vocab:image",
            "@type": "xsd:string"
          },
          "plantDate": {
            "@id": "vocab:plantDate",
            "@type": "xsd:integer"
          },
          "scientificName": {
            "@id": "vocab:scientificName",
            "@type": "xsd:string"
          },
          "longitude": {
            "@id": "vocab:longitude",
            "@type": "xsd:integer"
          },
          "latitude": {
            "@id": "vocab:latitude",
            "@type": "xsd:integer"
          }
        }
      }
    }
  ]
}`
)

func main() {

	// content of json ld schema

	schemaID := fmt.Sprintf("%s#%s", jsonLDContext, typ)
	querySchema := utils.CreateSchemaHash([]byte(schemaID))
	fmt.Println("schema hash")
	fmt.Println(querySchema.BigInt().String())
	path, err := merklize.NewFieldPathFromContext([]byte(schemaJSONLD), typ, fieldName)
	if err != nil {
		log.Fatal(err)
	}
	err = path.Prepend("https://www.w3.org/2018/credentials#credentialSubject")
	if err != nil {
		log.Fatal(err)
	}
	mkPath, err := path.MtEntry()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("claim path key")
	fmt.Println(mkPath.String())
}
