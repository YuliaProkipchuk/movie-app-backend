import { Request } from "express";
import { UserWhereUniqueInput } from "../generated/prisma/models";
import { User } from "../generated/prisma/client";
export interface RequestWithUser extends Request {
  user?: User;
}