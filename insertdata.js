const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function insertData() {
  try {
    const oldData = await fs.readFile('books.json');
    const showData = JSON.parse(oldData);

    await prisma.book_data.createMany({
      data: showData,
    });

    console.log('successfully inserted the data');
  } catch (error) {
    console.error('Error inserting', error);
  }
}

insertData()
  .catch((error) => {
    console.error('Error:', error);
  });