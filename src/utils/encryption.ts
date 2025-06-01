import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY || '';

export function decrypt(encryptedData: string): string {
  try {
    const buff = Buffer.from(encryptedData, 'base64');
    const iv = buff.slice(0, 16);
    const encrypted = buff.slice(16);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'base64'), iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'base64'), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return Buffer.concat([iv, encrypted]).toString('base64');
} 