import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export interface AuthRequest extends Request {
	userId?: string;
}

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization;
	if (!authHeader?.startsWith("Bearer ")) {
		res.status(401).json({ message: "Token missing or malformatted" });
		return;
	}
	const token = authHeader.split(" ")[1];
	try {
		const payload = jwt.verify(token, config.JWT_SECRET) as { userId: string };
		req.userId = payload.userId;
		next();
	} catch {
		res.status(401).json({ message: "Invalid or expired token" });
	}
};
