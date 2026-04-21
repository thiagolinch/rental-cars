import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { resolve } from "path"
import mime from "mime"
import fs from "fs"

import upload from "../../../../../config/upload";

import { IStorageProvider } from "../IStorageProvider";


class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    await this.client
      .send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: `${folder}/${file}`,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      }));

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .send(new DeleteObjectCommand({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      }));
  }
}

export { S3StorageProvider };