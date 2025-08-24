import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

// export const isValidId = (req, res, next) => {
//   const isValidParams = Object.entries(req.params).filter(
//     ([paramKey, paramValue]) =>
//       paramKey
//         .toLowerCase()
//         .endsWith('id')
//         .some(([paramKey, paramValue]) => {
//           if (isValidObjectId(paramValue)) return true;
//           return false;
//         }),
//   );
//   try {
//     if (isValidParams) {
//       throw createHttpError(400, 'ContactId must be a valid MongoDB ObjectId');
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'ContactId must be a valid MongoDB ObjectId');
  }
  next();
};
