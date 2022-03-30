import masterModuleRepo from "./masterModule.repo";

const displayMasterModules = async () => {
  const result = masterModuleRepo.getAll();
  return result;
};

export default {
  displayMasterModules,
};
