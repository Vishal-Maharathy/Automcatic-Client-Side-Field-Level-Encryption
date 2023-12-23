# CSFLE Implementation with Local Key

This repository demonstrates the implementation of Client-Side Field Level Encryption (CSFLE) using a local key in a Node.js application interacting with MongoDB. CSFLE ensures that sensitive data is encrypted on the client side before being sent to the server.

## Prerequisites

Make sure you have the following prerequisites installed:

- Node.js
- MongoDB
- MongoDB Enterprise (for CSFLE)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install dependencies:

   ```bash
   cd your-repo
   npm install
   ```

## Configuration

1. Obtain a MongoDB Atlas connection string and replace `connectionString` in the code with your own.

2. Replace `base64KeyId` with your specific Base64-encoded key identifier.

3. Update the `path` variable with the correct path to your local master key file (`master-key.txt`).

4. Adjust the `patientSchema` object to match your MongoDB schema.

5. Modify the `extraOptions` object as needed, providing the correct `mongocryptdURI`.

## Usage

1. Run the MongoDB Enterprise server:

   ```bash
   mongod --dbpath /path/to/data/directory --fork --logpath /path/to/log/file.log
   ```

2. Start the `mongocryptd` process:

   ```bash
   mongocryptd --pidfilepath /path/to/mongocryptd.pid
   ```

3. Run your Node.js application:

   ```bash
   node your-app.js
   ```

## Example

```javascript
// Insert a patient record
insertPatient(
  'Jon Doe',
  "O+",
  1234567,
);

// Retrieve a patient record
getPatient(1234567);
```

This example demonstrates inserting a patient record into the MongoDB database and retrieving it using CSFLE with a local key. Adjust the parameters in the `insertPatient` and `getPatient` functions as needed for your use case.

Feel free to explore and expand upon this codebase for your specific requirements. For more information on Client-Side Field Level Encryption, refer to the [MongoDB documentation](https://docs.mongodb.com/drivers/security/client-side-field-level-encryption-guide/).
