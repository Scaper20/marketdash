import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create Merchant 1
  const m1 = await prisma.merchant.create({
    data: {
      name: "Fresh Foods Supermarket",
      description: "Your daily fresh groceries and essentials. Delivered fast.",
      status: "ACTIVE",
      user: {
        create: {
          phone: "merchant_1",
          password: "hashed_mock_password",
          role: "MERCHANT_ADMIN"
        }
      },
      locations: {
        create: {
          address: "123 Market Street, Downtown",
          latitude: 40.7128,
          longitude: -74.0060,
        }
      },
      catalogItems: {
        create: [
          { name: "Organic Bananas (1kg)", price: 2.99, description: "Fresh organic bananas" },
          { name: "Whole Milk (1L)", price: 1.49, description: "Daily fresh whole milk" },
          { name: "Sourdough Bread", price: 4.50, description: "Freshly baked artisan bread" },
          { name: "Free-range Eggs (12pk)", price: 3.99, description: "Large free range eggs" }
        ]
      }
    }
  });

  // Create Merchant 2
  const m2 = await prisma.merchant.create({
    data: {
      name: "Corner Mini-Mart",
      description: "Snacks, drinks, and late night cravings.",
      status: "ACTIVE",
      user: {
        create: {
          phone: "merchant_2",
          password: "hashed_mock_password",
          role: "MERCHANT_ADMIN"
        }
      },
      locations: {
        create: {
          address: "456 Night Owl Ave",
          latitude: 40.7138,
          longitude: -74.0050,
        }
      },
      catalogItems: {
        create: [
          { name: "Potato Chips (Family Size)", price: 3.50, description: "Classic salted chips" },
          { name: "Cola (2L)", price: 2.00, description: "Chilled cola" },
          { name: "Chocolate Bar", price: 1.25, description: "Milk chocolate" },
        ]
      }
    }
  });

  console.log('Seeding complete! Added 2 mock merchants with catalogs.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
