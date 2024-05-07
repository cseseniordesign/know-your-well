const samlify = require('samlify') ;
const fs = require('fs');
const validator = require('@authenio/samlify-node-xmllint');


samlify.setSchemaValidator(validator);

// Configure identity provider from metadata, currently using https://samltest.id/ as idp
const idp = samlify.IdentityProvider({
    metadata: fs.readFileSync(__dirname + '/../metadata/idp.xml'),
    wantLogoutRequestSigned: true
});


let hitemplate = `<samlp:AuthnRequest 
xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"     
xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" 
ID="{ID}" 
Version="2.0" 
IssueInstant="{IssueInstant}" 
Destination="https://idp.nebraskacloud.org/simplesaml/saml2/idp/SSOService.php" 
ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" 
AssertionConsumerServiceURL="https://knowyourwell.azurewebsites.net/saml/acs">

<saml:Issuer>https://knowyourwell.azurewebsites.net/</saml:Issuer>
<samlp:NameIDPolicy 
    Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
    AllowCreate="false"/>
    
</samlp:AuthnRequest>`;

    const path = require('path');
    const filePath = path.join(__dirname, 'customLoginRequest.xml');
// Configure service provider from this app's metadata
const sp = samlify.ServiceProvider({
    loginRequestTemplate: {
        context: hitemplate,
      },
    metadata: fs.readFileSync(__dirname + '/../metadata/sp.xml'),
});

// Creates idp and sp objects
const assignEntity = (req, res, next) => {
    req.idp = idp;
    req.sp = sp;

    return next();
};

module.exports = assignEntity;

//adapted code from https://github.com/authenio/react-samlify/blob/d36744c53f979e376b6380ae5368dd1ed70172a4/middleware/index.ts