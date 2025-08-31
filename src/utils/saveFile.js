import createHttpError from 'http-errors';
import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

const saveFilePlace = {
  cloudinary: saveFileToCloudinary,
  local: saveFileToUploadDir,
};

export const saveFile = async (file) => {
  const strategyName = [getEnvVar('FILE_STORAGE')];
  const saveFilePlaceStrategy = saveFilePlace[strategyName];

  if (!saveFilePlaceStrategy) {
    throw createHttpError(500, `No strategy with ${strategyName} provided`);
  }

  return await saveFilePlaceStrategy(file);
};
