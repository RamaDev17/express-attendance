import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const checkUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!checkUser) {
    res.status(401).json({ message: "Login failed" });
    return;
  }

  const checPassword = await bcrypt.compare(password, checkUser.password);

  if (!checPassword) {
    res.status(401).json({ message: "Login failed" });
    return;
  }

  const token = Jwt.sign(
    { id: checkUser.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  // Set cookie dengan token
  res.cookie("auth_token", token, {
    httpOnly: true, 
    secure: false,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 200,
    message: "Login success",
    token,
    data: {
      email: checkUser.email,
      name: checkUser.name,
    },
  });
};
