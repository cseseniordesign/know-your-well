const samlify = require('samlify') ;
const fs = require('fs');
const validator = require('@authenio/samlify-node-xmllint');

const binding = samlify.Constants.namespace.binding;

samlify.setSchemaValidator(validator);

// configure okta idp
const idp = samlify.IdentityProvider({
  metadata: fs.readFileSync(__dirname + '/../metadata/metadata.xml'),
  wantLogoutRequestSigned: true
});

// const oktaIdpEnc = samlify.IdentityProvider({
//   metadata: fs.readFileSync(__dirname + '/../metadata/okta-enc.xml'),
//   isAssertionEncrypted: true,
//   messageSigningOrder: 'encrypt-then-sign',
//   wantLogoutRequestSigned: true,
// });

// configure our service provider (your application)
// const sp = samlify.ServiceProvider({
//   entityID: 'http://localhost:8080/metadata',
//   authnRequestsSigned: false,
//   wantAssertionsSigned: true,
//   wantMessageSigned: true,
//   wantLogoutResponseSigned: true,
//   wantLogoutRequestSigned: true,
//   privateKey: fs.readFileSync(__dirname + '/../key/sign/privkey.pem'),
//   privateKeyPass: 'VHOSp5RUiBcrsjrcAuXFwU1NKCkGA8px',
//   isAssertionEncrypted: false,
//   assertionConsumerService: [{
//     Binding: binding.post,
//     Location: 'http://localhost:8080/sp/acs',
//   }]
// });

// encrypted response
// const spEnc = samlify.ServiceProvider({
//   entityID: 'http://localhost:8080/metadata?encrypted=true',
//   authnRequestsSigned: false,
//   wantAssertionsSigned: true,
//   wantMessageSigned: true,
//   wantLogoutResponseSigned: true,
//   wantLogoutRequestSigned: true,
//   privateKey: fs.readFileSync(__dirname + '/../key/sign/privkey.pem'),
//   privateKeyPass: 'VHOSp5RUiBcrsjrcAuXFwU1NKCkGA8px',
//   encPrivateKey: fs.readFileSync(__dirname + '/../key/encrypt/privkey.pem'),
//   assertionConsumerService: [{
//     Binding: binding.post,
//     Location: 'http://localhost:8080/sp/acs?encrypted=true',
//   }]
// });

const assignEntity = (req, res, next) => {

  req.idp = oktaIdp;
  console.log("running");
//   req.sp = sp;

//   if (req.query && req.query.encrypted) {
//     req.idp = oktaIdpEnc;
//     req.sp = spEnc; 
//   }

  return next();
};

module.exports = assignEntity;

//adapted code from https://github.com/authenio/react-samlify/blob/d36744c53f979e376b6380ae5368dd1ed70172a4/middleware/index.ts