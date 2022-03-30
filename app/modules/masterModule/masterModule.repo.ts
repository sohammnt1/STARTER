import masterModuleModel from "./masterModule.schema";

const getAll = () => masterModuleModel.find();

export default {
  getAll,
};
