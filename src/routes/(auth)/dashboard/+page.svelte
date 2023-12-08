<script lang="ts">
    import type { ActionData, PageData } from './$types';
    import AccountCard from '$components/AccountCard.svelte';
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';
    export let data: PageData;
    export let form: ActionData
    import type { Account } from '@prisma/client';
    $: data = data;
    let customerAccounts = data.cusomter?.accounts as Account[];

    let error = {
        bill: "",
        transfer: ""
    }

</script>

<section class="w-full h-full py-20 px-32">
    <div class="flex justify-between items-center">
        <span>
            <p class="text-3xl font-semibold">Dashboard</p>
            <p class="text-xl ">Hello, {data.customerName}</p>
        </span>
        <span class="flex space-x-3">
            <div class="btn-group btn-group-scrollable bg-white" data-theme="dark">
                <label class="btn btn-primary" for="modal-1">Create Account</label>
                <label class="btn btn-primary" for="modal-2">Transfer</label>
                <label class="btn btn-primary" for="modal-3">Pay a bill</label>
            </div>
            <form method="post" action="?/logout" use:enhance={({cancel,formData})=>{
                return async ({ result, update }) => {
                    if(result.type == "success"){
                        goto('/')
                    }
                }
            }}>
                <button class="btn btn-error">logout</button>
            </form>
            

        </span>
       
    </div>
    
    <div class="flex space-x-3 pt-10">
        {#each customerAccounts as account}
            <AccountCard type={account.accountType} number={account.accountNumber} balance={account.balance} />
        {/each}
    </div>

    <!-- create account -->
    <input class="modal-state" id="modal-1" type="checkbox" />
    <div class="modal">
        <label class="modal-overlay" for="modal-1"></label>
        <form class="modal-content w-80 flex flex-col gap-5" method="post" action="?/createAccount">
            <label for="modal-1" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <h2 class="text-xl">Open an Account</h2>
            <div class="form-group">
                <div>
                    <label for="" class="form-label">Select an account type</label>
                    <input type="text" class="hidden" name='id' bind:value={data.customerID}>
                    <select class="select select-primary" name="type">
                        <option>Savings</option>
                        <option>Checkings</option>
                        <option>Credit</option>
                    </select>
                </div>
            </div>
            <div class="flex gap-3">
                <label for="modal-1"  class="btn btn-error btn-block">Cancel</label>
                <button class="btn btn-block btn-success">Confirm</button>
            </div>
        </form>
    </div>

    <!-- transfer -->
    <input class="modal-state" id="modal-2" type="checkbox" />
    <div class="modal">
        <label class="modal-overlay" for="modal-2"></label>
        <form class="modal-content w-80 flex flex-col gap-5" method="post" action="?/transferFunds" use:enhance={()=>{
            
            return async ({ result, update }) => {
                console.log(result.type);
                if(result.type == "failure"){
                    error.transfer = String(result.data?.message)
                }else if(result.type == "success"){
                    goto('/dashboard', {invalidateAll: true})
                }
            }
        }}>
            <label for="modal-2" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <h2 class="text-xl">Transfer funds</h2>
            <div class="form-group">
                <div>
                    <label for="from" class="form-label">Select an account to transfer from</label>
                    <select class="select select-primary" name="from">
                        {#each customerAccounts as account}
                                <option value={account.accountNumber}>{account.accountType} - {account.accountNumber}</option>
                            {/each}
                    </select>
                </div>
                <div>
                    <label for="to" class="form-label">Enter the recipient account number</label>
                    <input class="input input-primary" type="number" name="to">
                </div>
                <div>
                    <label for="amount" class="form-label">Enter the amount to transfer</label>
                    <input class="input input-primary" type="number" name="amount">
                </div>
            </div>
            <span class="text-error text-sm ml-2">{error.transfer}</span>
            <div class="flex gap-3">
                <label for="modal-2"  class="btn btn-error btn-block">Cancel</label>
                <button class="btn btn-block btn-success">Confirm</button>
            </div>
        </form>
    </div>

    <!-- pay a bill -->
    <input class="modal-state" id="modal-3" type="checkbox" />
    <div class="modal">
        <label class="modal-overlay" for="modal-3"></label>
        <form class="modal-content w-80 flex flex-col gap-5" method="post" action="?/payBill" use:enhance={()=>{
            
            return async ({ result, update }) => {
                console.log(result.type);
                if(result.type == "failure"){
                    error.bill = String(result.data?.message)
                }else if(result.type == "success"){
                    goto('/dashboard', {invalidateAll: true})
                }
            }
        
        }}>
            <label for="modal-3" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <h2 class="text-xl">Pay a bill</h2>
                <div class="form-group">
                    <div>
                        <label for="" class="form-label">Select a biller</label>
                        <select class="select select-primary" name="bill">
                            <option>JPS Co* - 3124</option>
                            <option>Flow - 4913</option>
                            <option>LCP Loan Payment</option>
                        </select>
                    </div>
                    <div>
                        <label for="" class="form-label">Select an account to pay from</label>
                        <select class="select select-primary" name="from">
                            {#each customerAccounts as account}
                                <option value={account.accountNumber}>{account.accountType} - {account.accountNumber}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label for="" class="form-label">Enter bill amount</label>
                        <input class="input input-primary" type="number" name="amount">
                    </div>
                </div>
                <span class="text-error text-sm ml-2">{error.bill}</span>
            <div class="flex gap-3">
                <label for="modal-3"  class="btn btn-error btn-block">Cancel</label>
                <button class="btn btn-block btn-success">Confirm</button>
            </div>
        </form>
    </div>

</section>