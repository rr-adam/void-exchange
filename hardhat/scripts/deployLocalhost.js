const deployFixture = require("./deployFixtureLocalhost.js");

deployFixture()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
