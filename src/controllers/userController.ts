import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDetailUser = async (
  req: Request,
  res: Response
): Promise<void>  => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};
