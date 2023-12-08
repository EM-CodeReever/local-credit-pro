import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();

export const load = (async ({cookies,parent}) => {
    await parent()
}) satisfies PageServerLoad;

export const actions: Actions = {
    logout: async ({cookies}) => {
        cookies.delete('customerName');
        cookies.delete('id');
    },
    createAccount: async ({request,cookies}) => {
        const data = await request.formData();
        const id = data.get('id');
        const type = data.get('type');

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

    },
    transferFunds : async ({request,cookies}) => {
        const data = await request.formData();
        const from = data.get('from');
        const to = data.get('to');
        const amount = data.get('amount');
        if(isNaN(parseInt(from as string)) || isNaN(parseInt(to as string)) || isNaN(parseInt(amount as string))) {
            return fail(400, { message: "Invalid request, check your input"});
        }
        let fromAccount = await prisma.account.findFirst({
            where: {
                accountNumber: parseInt(from as string)
            }
        });
        let toAccount = await prisma.account.findFirst({
            where: {
                accountNumber: parseInt(to as string)
            }
        });
        if(fromAccount && toAccount) {
            if(fromAccount.balance >= parseInt(amount as string)) {
                console.log('transfering funds');
                
                let updatedFromAccount = await prisma.account.update({
                    where: {
                        accountNumber: fromAccount.accountNumber
                    },
                    data: {
                        balance: fromAccount.balance - parseInt(amount as string)
                    }
                });
                let updatedToAccount = await prisma.account.update({
                    where: {
                        accountNumber: toAccount.accountNumber
                    },
                    data: {
                        balance: toAccount.balance + parseInt(amount as string)
                    }
                });         
            }else{
                return fail(401, { message: "Insufficient funds to make transfer"});
            }
        }
    },
    payBill: async ({request,cookies}) => {
        const data = await request.formData();
        const from = data.get('from');
        const amount = data.get('amount');
        if(isNaN(parseInt(from as string)) || isNaN(parseInt(amount as string))) {
            return fail(400, { message: "Invalid request, check your input"});
        }
        let fromAccount = await prisma.account.findFirst({
            where: {
                accountNumber: parseInt(from as string)
            }
        });
        if(fromAccount) {
            if(fromAccount.balance >= parseInt(amount as string)) {
                console.log('paying bill');
                
                let updatedAccount = await prisma.account.update({
                    where: {
                        accountNumber: fromAccount.accountNumber
                    },
                    data: {
                        balance: fromAccount.balance - parseInt(amount as string)
                    }
                });      
            }else{
                return fail(401, { message: "Insufficient funds to pay bill"});
            }
        }
    }
};