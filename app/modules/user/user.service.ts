import { hash, compare } from "bcryptjs";
import userRepo from "./user.repo";
import { generateToken } from "../../utility/jwt";
import { IUser } from "./user.types";
import { generate } from "generate-password";
import * as shortid from "shortid";
import sgMail from "@sendgrid/mail";

const createUser = async (user: IUser) => {
  try {
    let password = generate({ length: 10, numbers: true });
    let employeeId = shortid.generate();
    const hashedPassword = await hash(password, 12);
    const userData = {
      ...user,
      ["password"]: hashedPassword,
      employeeId: employeeId,
      deleted: false,
    };
    const result = await userRepo.create(userData);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    const msg = {
      from: "testingformail797@gmail.com",
      to: userData.email,
      subject: "Account Sucessfully Created",
      text: `Dear,${userData.name}. Your Account has been created.\nHere are the login credentials.\nEmployeeId: ${userData.employeeId} Password:${password}`,
    };
    await sgMail.send(msg);
    return result;
  } catch (error) {
    throw error;
  }
};

const authenticateUser = async (employeeId: string, password: string) => {
  try {
    const user = await userRepo.getOne(employeeId);
    if (!user) throw new Error("User doesn't exists");
    const doMatch = await compare(password, user.password);
    if (!doMatch) throw new Error("Invalid Password");
    const token = generateToken(user);
    const role = user.role;

    return { token, role };
  } catch (error) {
    throw error;
  }
};

const displayUsers = async (roles: string) => {
  if (roles) {
    const result = await userRepo.getbyRole(roles);
    return result;
  } else {
    const result = await userRepo.getAll();
    return result;
  }
};

const editUser = (updated_data: IUser) => userRepo.update(updated_data);

const deleteUser = (employeeId: string) => userRepo.deleteOne(employeeId);

export default {
  createUser,
  authenticateUser,
  displayUsers,
  editUser,
  deleteUser,
};
