import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createOfficeSchema = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      radius: Joi.number().required(),
    });

    const { error } = schema.validate(data);
    if (error) {
      res.status(400).json({ status: 400, message: error.message });
    } else {
      next();
    }
  };
};

const updateOfficeSchema = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = Joi.object({
      name: Joi.string().optional(),
      latitude: Joi.number().optional(),
      longitude: Joi.number().optional(),
      radius: Joi.number().optional(),
    });

    const { error } = schema.validate(data);
    if (error) {
      res.status(400).json({ status: 400, message: error.message });
    } else {
      next();
    }
  };
};

export { createOfficeSchema, updateOfficeSchema };
