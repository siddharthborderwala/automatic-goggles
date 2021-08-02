import { log } from './util';
import functions from './functions';

const callFunction = (name: string | undefined) => {
  switch (name) {
    case functions.createFile.name:
      return functions.createFile;
    case functions.getDriveById.name:
      return functions.getDriveById;
    case functions.createSharedDrive.name:
      return functions.createSharedDrive;
    case functions.getFileById.name:
      return functions.getFileById;
    case functions.createFolder.name:
      return functions.createFolder;
    case functions.transferOwnership.name:
      return functions.transferOwnership;
    case functions.makePublic.name:
      return functions.makePublic;
    default:
      return functions.listFiles;
  }
};

// we can take an email which will be the owner for all the files
const main = () => {
  const name = process.argv[2];
  const args = process.argv.slice(3);
  callFunction(name)(args).then((data) => {
    log(data);
    process.exit(0);
  });
};

process.on('unhandledRejection', (e) => {
  console.log('Error 💥:');
  log(e);
});

main();
