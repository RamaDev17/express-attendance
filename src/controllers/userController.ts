import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Roles } from "../utils/roles";

const prisma = new PrismaClient();

export const getDetailUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    const detailUser = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
      where: {
        id: user?.id,
      },
    });
    res.status(200).json({ status: 200, data: detailUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
    res.status(200).json({ status: 200, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: "employee"
      },
    });
    res.status(200).json({
      status: 200,
      message: "User created",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
