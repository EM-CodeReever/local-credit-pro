import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();

export const actions = {
	login: async ({request,cookies}) => {
		const data = await request.formData();
		const email = data.get('loginEmail');
		const password = data.get('loginPassword');
        cookies.delete('customer');

        let customer = await prisma.customer.findFirst({
            where: {
                emailAddress: email as string,
                password: password as string
            }
        });
        
        if (customer) {
            cookies.set('customerName', `${customer?.name}`, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });
            cookies.set('id', `${customer?.customerID}`, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });
        } else {
            return fail(400, { message: "Invalid login, check your email and password", incorrect: true });
        }

        
        
	},
    register: async ({request}) => {
        const data = await request.formData();
        const email = data.get('registerEmail');
        const password = data.get('registerPassword');
        const name = data.get('name');
        const phone = data.get('phone');
    }
} satisfies Actions;