import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export function authorize(roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.role || !roles.includes(req.role)) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    };
}
