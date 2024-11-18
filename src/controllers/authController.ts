import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, remember } = req.body;

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
      expiresIn: remember ? "7d" : "1d",
    }
  );

  // Set cookie dengan token
  res.cookie("auth_token", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: remember ? 24 * 60 * 60 * 7000 : 24 * 60 * 60 * 1000,
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

export const validateToken = (req: Request, res: Response): void => {
  const token = req.cookies?.auth_token; // Ambil token dari cookie

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // Verifikasi token
    Jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).json({ message: "Valid token" });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logout success" });
};

