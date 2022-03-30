import { Schema, model, Types } from "mongoose";

class masterModuleSchema extends Schema {
  constructor() {
    super(
      {
        name: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );
  }
}

const masterModuleModel = model("masterModule", new masterModuleSchema());

export default masterModuleModel;
