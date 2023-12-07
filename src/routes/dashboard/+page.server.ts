import type { Actions, PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();

export const load = (async ({cookies}) => {
    return {
        customerName: cookies.get('customerName'),
        customerID: cookies.get('id')
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    logout: async ({cookies}) => {
        console.log('logout');
        cookies.delete('customerName');
        cookies.delete('id');
    },
    createAccount: async ({request,cookies}) => {
        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type');
        console.log('id: ', id);
        console.log('type: ', type);

        let newAccount = await prisma.account.create({
            data: {
                accountType: type as string,
                balance: 5000,
                customerID: parseInt(id as string)
            }
        });
        if(newAccount) {
            console.log('newAccount: ', newAccount);
            prisma.customer.update({
                where: {
                    customerID: parseInt(id as string)
                },
                data: {
                    accounts: {
                        connect: {
                            accountNumber: newAccount.accountNumber
                        }
                    }
                }
            });
        }

    }
};