import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMerchants = async (req: Request, res: Response) => {
  try {
    const merchants = await prisma.merchant.findMany({
      where: { status: 'ACTIVE' },
      include: {
        locations: true,
      }
    });
    res.json({ merchants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch merchants' });
  }
};

export const getMerchantCatalog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const catalog = await prisma.merchantCatalogItem.findMany({
      where: {
        merchantId: id,
        isAvailable: true
      }
    });
    
    const merchant = await prisma.merchant.findUnique({
      where: { id },
      include: { locations: true }
    });
    
    if (!merchant) {
      return res.status(404).json({ error: 'Merchant not found' });
    }
    
    res.json({ merchant, catalog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch catalog' });
  }
};
