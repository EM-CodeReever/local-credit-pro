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
    register: async ({request,cookies}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const name = data.get('name');
        const username = data.get('username');
        const phone = data.get('phoneNumber');
        if(!email || !password || !name || !username || !phone) {
            return fail(400, { message: "Please fill out all fields"});
        }
        
        let newCustomer = await prisma.customer.create({
            data: {
                emailAddress: email as string,
                password: password as string,
                name: name as string,
                username: username as string,
                phoneNumber: phone as string
            }
        });
        if(newCustomer) {
            cookies.set('customerName', `${newCustomer?.name}`, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });
            cookies.set('id', `${newCustomer?.customerID}`, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });
        }else{
            return fail(400, { message: "Something went wrong, we couldn't create your account"});
        }
    }
} satisfies Actions;