import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllShift = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parsing dan validasi query parameter
    const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1);
    const keyword = ((req.query.keyword as string) || "").trim();

    const skip = (page - 1) * limit;

    // Query dengan pagination dan filter
    const [data, total] = await Promise.all([
      prisma.shift.findMany({
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
      prisma.shift.count({
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
      message: "Get all shift success",
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
    console.error("Error fetching shifts:", error);

    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

const createShift = async (req: Request, res: Response): Promise<void> => {
  const { name, start_time, end_time } = req.body;

  try {
    const data = await prisma.shift.create({
      data: {
        name: name,
        start_time: start_time,
        end_time: end_time,
      },
    });

    res
      .status(200)
      .json({ status: 200, message: "Shift created", data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const getDetailShift = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await prisma.shift.findUnique({
      where: {
        id,
      },
    });

    res
      .status(200)
      .json({ status: 200, message: "Get detail shift success", data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const updateShift = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, start_time, end_time } = req.body;

  try {
    const data = await prisma.shift.update({
      where: {
        id,
      },
      data: {
        name: name,
        start_time: start_time,
        end_time: end_time,
      },
    });

    res
      .status(200)
      .json({ status: 200, message: "Shift updated", data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const deleteShift = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await prisma.shift.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ status: 200, message: "Shift deleted" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export {
  getAllShift,
  createShift,
  getDetailShift,
  updateShift,
  deleteShift,
};
