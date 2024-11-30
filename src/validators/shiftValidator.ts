import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import extend from "@joi/date";

const extendedJoi = Joi.extend(extend);

const createShiftsSchema = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = extendedJoi.object({
      name: extendedJoi.string().required(),
      start_time: extendedJoi.date().format("HH:mm:ss").required(),
      end_time: extendedJoi.date().format("HH:mm:ss").required(),
    });

    const { error } = schema.validate(data);
    if (error) {
      res.status(400).json({ status: 400, message: error.message });
    } else {
      next();
    }
  };
};

const updateShiftsSchema = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = extendedJoi.object({
      name: extendedJoi.string().optional(),
      start_time: extendedJoi.date().format("HH:mm:ss").optional(),
      end_time: extendedJoi.date().format("HH:mm:ss").optional(),
    });

    const { error } = schema.validate(data);
    if (error) {
      res.status(400).json({ status: 400, message: error.message });
    } else {
      next();
    }
  };
};

export { createShiftsSchema, updateShiftsSchema };
