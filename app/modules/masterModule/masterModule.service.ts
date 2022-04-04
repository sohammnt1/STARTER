import masterModuleRepo from "./masterModule.repo";

const displayMasterModules = () => masterModuleRepo.getAll();

export default {
  displayMasterModules,
};
