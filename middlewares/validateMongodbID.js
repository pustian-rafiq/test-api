import mongoose from "mongoose";

export const validateMongoDbID = (id) => {
  const isVaid = mongoose.Types.ObjectId.isValid(id);
  if (!isVaid) return false;
  return true;
};

// module.exports = validateMongoDbID;
