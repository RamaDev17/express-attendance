import { NextFunction, Request, Response } from "express";

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      res.status(401).json({ status: 401, message: "Unauthorized" });
      return;
    }

    if (roles.includes("*")) {
        return next();
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({ status: 403, message: "Forbidden" });
      return;
    }

    next();
  };
};
