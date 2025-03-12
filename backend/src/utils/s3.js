import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const createS3Folder = async (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: "",
  };
  await s3.send(new PutObjectCommand(params));
};

const saveS3File = async (key, content) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: content,
    ContentType: "text/plain",
  };
  await s3.send(new PutObjectCommand(params));
};

const getFileContent = async (key) => {
  const params = { Bucket: process.env.S3_BUCKET, Key: key };
  const { Body } = await s3.send(new GetObjectCommand(params));
  const result = await streamToString(Body);
  return result;
};

const listFiles = async (key) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Prefix: key,
  };
  const { Contents } = await s3.send(new ListObjectsV2Command(params));
  return Contents ? Contents.map((obj) => obj.Key) : [];
};

const deleteS3File = async(key) => {
  const params = {
    Bucket : process.env.S3_BUCKET,
    Key : key,
  }
  await s3.send(new DeleteObjectCommand(params));
}

const deleteS3Folder = async (key) => {
  const files = await listFiles(key);
  const params = {
    Bucket: process.env.S3_BUCKET,
    Delete: { Objects: files.map((Key) => ({ Key })) },
  };
  await s3.send(new DeleteObjectsCommand(params));
}

const streamToString = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
};

export { createS3Folder, saveS3File, getFileContent, listFiles, deleteS3File, deleteS3Folder };
