
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create example user with profile
  const user = await prisma.user.create({
    data: {
      email: 'buyer@example.com',
      name: 'Jane Homebuyer',
      profile: {
        create: {
          buyerType: 'First-time',
          budgetMin: 300000,
          budgetMax: 600000,
          locations: ['Seattle', 'Bellevue']
        }
      },
      mortgage: {
        create: {
          income: 90000,
          debt: 15000,
          creditScore: 720
        }
      },
      savedSearches: {
        create: [
          { location: 'Seattle', budgetMin: 350000, budgetMax: 550000 }
        ]
      },
      offers: {
        create: [
          { propertyId: 'Z123456', offerAmount: 525000, status: 'Draft' }
        ]
      },
      documents: {
        create: [
          { fileName: 'preapproval.pdf', fileUrl: 'https://s3.amazonaws.com/homigo/preapproval.pdf' }
        ]
      },
      buyerTasks: {
        create: [
          { title: 'Get pre-approved', status: 'Complete', dueDate: new Date() },
          { title: 'Schedule home tours', status: 'Pending', dueDate: new Date(Date.now() + 86400000) }
        ]
      }
    }
  });

  // Create some service providers
  await prisma.serviceProvider.createMany({
    data: [
      { name: 'Jane Inspector', type: 'Inspector', phone: '555-1234', email: 'jane@inspectors.com' },
      { name: 'Bob Contractor', type: 'Contractor', phone: '555-5678', email: 'bob@contractors.com' },
      { name: 'Lori Lawyer', type: 'Lawyer', phone: '555-9012', email: 'lori@law.com' }
    ]
  });

  console.log('✅ Seed complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
