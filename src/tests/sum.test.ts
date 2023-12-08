import { expect, test } from 'vitest'
import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

test('Calculates the monthly payment of a loan', () => {
    const interestRate = 0.05
    const amount = 1000
    const timeInMonths = 12
    const interest = amount * interestRate
    const total = amount + interest
    const monthlyPayment = total / timeInMonths
    expect(monthlyPayment).toBe(87.5)
})

test('Computes a transfer between two accounts', async () => {
    // ID's of test accounts in the database
        const from = 3 
        const to = 4
        const amount = 100
        let fromAccount = await prisma.account.findFirst({
            where: {
                accountNumber: from
            }
        });
        let toAccount = await prisma.account.findFirst({
            where: {
                accountNumber: to
            }
        });
        if(fromAccount && toAccount) {
            if(fromAccount.balance >= amount) {
                console.log('transfering funds');
                
                let updatedFromAccount = await prisma.account.update({
                    where: {
                        accountNumber: fromAccount.accountNumber
                    },
                    data: {
                        balance: fromAccount.balance - amount
                    }
                });
                let updatedToAccount = await prisma.account.update({
                    where: {
                        accountNumber: toAccount.accountNumber
                    },
                    data: {
                        balance: toAccount.balance + amount
                    }
                });         
                expect(updatedFromAccount.balance).toBe(fromAccount.balance - amount)
                expect(updatedToAccount.balance).toBe(toAccount.balance + amount)
            }else{
                return
            }
        }
})

test('Pay a bill', () => {
    const account = 1000
    const bill = 100
    const newAccount = account - bill
    expect(newAccount).toBe(900)
})
