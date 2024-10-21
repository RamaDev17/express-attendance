import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createUserSchema = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(data);
    if (error) {
      res.status(400).json({ status: 400, message: error.message });
    } else {
      next();
    }
  };
};

export { createUserSchema }