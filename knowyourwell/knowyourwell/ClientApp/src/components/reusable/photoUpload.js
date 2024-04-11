// const { DefaultAzureCredential } = require("@azure/identity");
// const { BlobServiceClient } = require("@azure/storage-blob");
import { BlobServiceClient } from "@azure/storage-blob";

export default async function uploadPhotos(file) {
  const AZURE_STORAGE_CONNECTION_STRING = "BlobEndpoint=https://knowyourwell.blob.core.windows.net/;QueueEndpoint=https://knowyourwell.queue.core.windows.net/;FileEndpoint=https://knowyourwell.file.core.windows.net/;TableEndpoint=https://knowyourwell.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-04-30T16:31:47Z&st=2024-03-29T08:31:47Z&spr=https&sig=p0n52uL62ApmdV2Fry%2FT9q8xXemuZApIGGO9Ig6Pbdk%3D";

  if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error('Azure Storage Connection string not found');
  }
  try{
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");
    const AZURE_STORAGE_CONNECTION_STRING = "BlobEndpoint=https://knowyourwell.blob.core.windows.net/;QueueEndpoint=https://knowyourwell.queue.core.windows.net/;FileEndpoint=https://knowyourwell.file.core.windows.net/;TableEndpoint=https://knowyourwell.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-05-30T16:04:45Z&st=2024-03-29T08:04:45Z&spr=https&sig=DzJDElMlVzXS4Cz2ALsz6FwKjNB2gCkOr44MIU0a35w%3D";
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error('Azure Storage Connection string not found');
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

    const containerName = 'photo-upload-test';
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = file.name; //Change This 
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const data = 'Hello World!'; //Change This
    alert('Before Blob Response');
    // debugger;
    const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file).then((value) => {
      alert(value); // 'Success!'
      debugger;
    }).catch((error) => {
      alert('Error: ' + error);
    });

    alert(uploadBlobResponse);
    alert(`Blob was uploaded successfully. requestId: ${uploadBlobResponse}`);
  } catch (err) {
    alert(`Error: ${err.message}`);
    throw err;
  }
  
}