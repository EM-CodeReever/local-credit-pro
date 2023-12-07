import { expect, test } from 'vitest'

test('Calculates the monthly payment of a loan', () => {
    const interestRate = 0.05
    const amount = 1000
    const timeInMonths = 12
    const interest = amount * interestRate
    const total = amount + interest
    const monthlyPayment = total / timeInMonths
    expect(monthlyPayment).toBe(87.5)
})

test('Computes a transfer between two accounts', () => {
    const account1 = 1000
    const account2 = 500
    const transfer = 100
    const newAccount1 = account1 - transfer
    const newAccount2 = account2 + transfer
    expect(newAccount1).toBe(900)
    expect(newAccount2).toBe(600)
})

test('Pay a bill', () => {
    const account = 1000
    const bill = 100
    const newAccount = account - bill
    expect(newAccount).toBe(900)
})