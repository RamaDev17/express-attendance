import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllOffice = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await prisma.office.findMany();

    res
      .status(200)
      .json({ status: 200, message: "get all office success", data: data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

const createOffice = async (req: Request, res: Response): Promise<void> => {
  const { name, latitude, longitude, radius } = req.body;

  try {
    const data = await prisma.office.create({
      data: {
        name: name,
        latitude: latitude,
        longitude: longitude,
        radius: radius,
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
        latitude: latitude,
        longitude: longitude,
        radius: radius,
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
