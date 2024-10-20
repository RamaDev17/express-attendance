import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface JwtPayload {
  id: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(403).json({ message: "Access denied. No token provided." });
    return; // Pastikan tidak ada return response
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Cari user berdasarkan id di token
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });

    // Jika user tidak ditemukan
    if (!req.user) {
      res.status(404).json({ message: "User not found" });
      return; // Pastikan response diakhiri dengan return
    }

    // Lanjutkan ke handler berikutnya
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
    return; // Tambahkan return setelah mengirim respons
  }
};
