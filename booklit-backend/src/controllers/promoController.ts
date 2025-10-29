import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const validatePromo = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const promo = await prisma.promo.findUnique({ where: { code } });

    if (!promo)
      return res.status(404).json({ valid: false, message: "Invalid promo code" });
    if (new Date(promo.expiry) < new Date())
      return res.status(400).json({ valid: false, message: "Promo expired" });

    res.json({
      valid: true,
      discountType: promo.discountType,
      value: promo.value,
    });
  } catch (error) {
    res.status(500).json({ valid: false, message: "Promo validation failed" });
  }
};
