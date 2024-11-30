import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllOffice = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parsing dan validasi query parameter
    const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1); // Minimal 1
    const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1); // Minimal 1
    const keyword = ((req.query.keyword as string) || "").trim(); // Hilangkan spasi berlebih

    const skip = (page - 1) * limit;

    // Query dengan pagination dan filter
    const [data, total] = await Promise.all([
      prisma.office.findMany({
        skip,
        take: limit,
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        orderBy: {
          name: "asc",
        },
      }),
      prisma.office.count({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      }),
    ]);

    // Respon dengan pagination lengkap
    res.status(200).json({
      status: 200,
      message: "Get all office success",
      data,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
        currentItems: data.length, // Jumlah data di halaman saat ini
      },
    });
  } catch (error) {
    console.error("Error fetching offices:", error);

    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const createOffice = async (req: Request, res: Response): Promise<void> => {
  const { name, latitude, longitude, radius } = req.body;

  try {
    const data = await prisma.office.create({
      data: {
        name: name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: Number(radius),
      },
    });

    res
      .status(200)
      .json({ status: 200, message: "Office created", data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const getDetailOffice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await prisma.office.findUnique({
      where: {
        id,
      },
    });

    res
      .status(200)
      .json({ status: 200, message: "Get detail office success", data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const updateOffice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, latitude, longitude, radius } = req.body;

  try {
    const data = await prisma.office.update({
      where: {
        id,
      },
      data: {
        name: name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: Number(radius),
      },
    });

    res
      .status(200)
      .json({ status: 200, message: "Office updated", data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const deleteOffice = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await prisma.office.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ status: 200, message: "Office deleted" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export {
  getAllOffice,
  createOffice,
  getDetailOffice,
  updateOffice,
  deleteOffice,
};
