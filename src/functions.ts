import { randomString } from './util';
import { drive } from './drive';

const listFiles = async () => {
  const result = await drive.files.list({
    corpora: 'allDrives',
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
  });
  return result.data;
};

const getFileById = async (args: string[]) => {
  const [fileId] = args;
  const result = await drive.files.get({
    fileId,
    fields: '*',
  });
  return result.data;
};

const createFile = async (args: string[]) => {
  const [name, mimeType, content, parents] = args;
  const result = await drive.files.create({
    requestBody: {
      name,
      mimeType,
      parents: parents?.split(','),
    },
    media: {
      mimeType,
      body: content,
    },
    fields: '*',
  });
  return result.data;
};

const getDriveById = async (args: string[]) => {
  const [driveId] = args;
  const result = await drive.drives.get({
    driveId,
    fields: 'parents',
  });
  return result.data;
};

const createSharedDrive = async (args: string[]) => {
  const [quotaUser, name] = args;
  const result = await drive.drives.create({
    quotaUser,
    requestId: randomString(),
    requestBody: {
      name,
    },
  });
  return result.data;
};

const createFolder = async (args: string[]) => {
  const [name] = args;
  const result = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
    },
    fields: '*',
  });
  return result.data;
};

// cannot transfer ownership
const transferOwnership = async (args: string[]) => {
  const [fileId, emailAddress = 'turtlewig@createintro.com'] = args;
  const result = await drive.permissions.create({
    fileId,
    transferOwnership: true,
    fields: '*',
    requestBody: {
      emailAddress,
      role: 'owner',
      type: 'user',
    },
  });
  return result.data;
};

const makePublic = async (args: string[]) => {
  const [fileId] = args;
  const result = await drive.permissions.create({
    fileId,
    fields: '*',
    requestBody: {
      type: 'anyone',
      role: 'reader',
    },
  });
  return result.data;
};

const functions = {
  listFiles,
  getFileById,
  createFile,
  getDriveById,
  createSharedDrive,
  createFolder,
  transferOwnership,
  makePublic,
};

export default functions;
