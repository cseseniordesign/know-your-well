// const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

export default async function uploadPhoto(file, container, name, fileName) {
  try{
    const AZURE_STORAGE_CONNECTION_STRING = "BlobEndpoint=https://knowyourwell.blob.core.windows.net/;QueueEndpoint=https://knowyourwell.queue.core.windows.net/;FileEndpoint=https://knowyourwell.file.core.windows.net/;TableEndpoint=https://knowyourwell.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-05-30T16:04:45Z&st=2024-03-29T08:04:45Z&spr=https&sig=DzJDElMlVzXS4Cz2ALsz6FwKjNB2gCkOr44MIU0a35w%3D";
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error('Azure Storage Connection string not found');
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = "wellid-"+container;
    const containerClient = blobServiceClient.getContainerClient(containerName);

    try{
      await containerClient.createIfNotExists();
    } catch (err) {

    }
    const blobName = name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file)
  } catch (err) {
    alert(`Error: ${err.message}`);
    throw err;
  }
  
}