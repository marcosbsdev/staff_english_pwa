import prisma from '../src/lib/prisma';

async function main() {
    console.log('Attempting to connect to database...');
    try {
        await prisma.$connect();
        console.log('Successfully connected to database!');

        // Try a simple query
        const count = await prisma.analysis.count();
        console.log(`Current analysis count: ${count}`);

        // Check if we can disconnect
        await prisma.$disconnect();
        console.log('Disconnected successfully.');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
}

main();
