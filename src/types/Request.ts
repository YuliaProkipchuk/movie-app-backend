import { Request } from "express";
import { UserWhereInput } from "../generated/prisma/models";
export type AuthRequest = Request & {user:Partial<UserWhereInput>;}
