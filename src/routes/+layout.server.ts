import type { LayoutServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();

export const load = (async ({cookies}) => {
    let customer = await prisma.customer.findFirst({
        where: {
            customerID: parseInt(cookies.get('id') as string)
        },
        include: {
            accounts: true
        }
    });

    return {
        customerName: cookies.get('customerName'),
        customerID: cookies.get('id'),
        cusomter: customer
    };
}) satisfies LayoutServerLoad;
