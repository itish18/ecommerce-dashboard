const { PrismaClient } = require("@prisma/client");

let prisma;

if (!prisma) {
  prisma = new PrismaClient();
}

// if (process.env.NODE_ENV !== "production") {
//   console.warn(
//     "This is the 10th instance of Prisma Client being started. Make sure this is intentional."
//   );
// }

module.exports = prisma;
