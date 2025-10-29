import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { name, email, experienceId, slotId, promoCode, finalPrice } = req.body;

    if (!name || !email || !experienceId || !slotId)
      return res.status(400).json({ error: "Missing required fields" });

    const slot = await prisma.slot.findUnique({ where: { id: slotId } });
    if (!slot) return res.status(404).json({ error: "Slot not found" });
    if (slot.bookedCount >= slot.capacity)
      return res.status(400).json({ error: "Slot sold out" });

    await prisma.booking.create({
      data: { name, email, experienceId, slotId, promoCode, finalPrice },
    });

    await prisma.slot.update({
      where: { id: slotId },
      data: { bookedCount: { increment: 1 } },
    });

    res.json({ message: "Booking successful" });
  } catch (error) {
    res.status(500).json({ error: "Booking failed" });
  }
};
