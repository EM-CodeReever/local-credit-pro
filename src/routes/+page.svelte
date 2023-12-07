<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { goto, invalidate, invalidateAll } from "$app/navigation";
    import type {Customer} from '@prisma/client'
    import type { ActionData } from "./$types";
    export let form: ActionData;
    $: form = form

    let c = {} as Customer

    let error = false;
    let errorMsg: any

 let userSelect = false
 let login = false;
 let register = false;

 let email = '';
 let password = '';
</script>

<section class="h-full flex justify-center items-center w-full p-20" data-theme="light">
    <div  class="flex flex-col justify-center space-y-10 bg-gray-300 py-10 px-20 rounded-lg">
        <span class="text-center">
            <p class="text-4xl font-semibold">Local Credit Pro</p>
            <p>some slogan for the company</p>
        </span>
        {#if !userSelect}
        <span class="flex flex-col space-y-3 justify-center">
            <button class="btn" on:click={()=>{
                login = true
                userSelect = true
            }}>Login</button>
            <button class="btn btn-success">Create Account</button>
        </span>
        {:else if login}
        <div> 
            <form class="form-group" method="post" action="?/login" use:enhance={({cancel,formData})=>{
                if(email == "" || password == ""){
                        error = true
                        errorMsg = "Please enter a valid email and password"
                        cancel()
                    }
                return async ({ result, update }) => {
                    if(result.type == "success"){
                        goto('/dashboard', {invalidateAll: true})

                        
                    }else if(result.type == "failure"){
                        console.log("result", result.data?.message);
                        // console.log(form?.message); //null
                        error = true
                        errorMsg = result.data?.message
                    }
                    
                }
                
            }}>
                <div class="w-full">
                    <label class="form-label"  for="email">email</label>
                    <input class="input input-solid max-w-full" type="email" name="loginEmail" id="email" bind:value={email} />
                </div>
                <div class="w-full">
                    <label class="form-label" for="password">Password</label>
                    <input class="input input-solid max-w-full" type="password" name="loginPassword" id="password" bind:value={password} />
                </div>

                <button class="btn btn-secondary">
                    Continue
                </button>
                {#if error}
                <p  class="text-error text-sm">{errorMsg}</p>
                {/if}
            </form>
        </div>
        {:else if register}
        <div>
            <form class="form-group" method="post" action="/register" use:enhance={({cancel})=>{
                if(c.name == "" || c.emailAddress == "" || c.phoneNumber == "" || c.username == "" || c.password == ""){
                        error = true
                        errorMsg = "Please fill out all feilds"
                        cancel()
                    }
                return async ({ result, update }) => {
                    if(result.type == "success"){
                        goto('/dashboard')
                        
                    }else if(result.type == "failure"){
                        console.log("result", result.data?.message);
                        // console.log(form?.message); //null
                        error = true
                        errorMsg = result.data?.message
                    }
                    
                }
            }}>
                <div class="w-full">
                    <label class="form-label" for="name">Name</label>
                    <input class="input input-solid max-w-full" type="name" name="name" bind:value={c.name} />
                </div>
                <div class="w-full">
                    <label class="form-label" for="email">email</label>
                    <input class="input input-solid max-w-full" type="email" name="email" bind:value={c.emailAddress} />
                </div>
                <div class="w-full">
                    <label class="form-label" for="phoneNumber">phoneNumber</label>
                    <input class="input input-solid max-w-full" type="phoneNumber" name="phoneNumber" bind:value={c.phoneNumber} />
                </div>
                <div class="w-full">
                    <label class="form-label" for="username">Username</label>
                    <input class="input input-solid max-w-full" type="username" name="username" bind:value={c.username} />
                </div>
                <div class="w-full">
                    <label class="form-label" for="password">Password</label>
                    <input class="input input-solid max-w-full" type="password" name="password" bind:value={password} />
                </div>
                <button class="btn self-center" type="submit" on:click|preventDefault={()=>{
                    // prisma.customer.create({
                    //     data: {
                    //         name: c.name,
                    //         emailAddress: c.emailAddress,
                    //         phoneNumber: c.phoneNumber,
                    //         username: c.username,
                    //         password: c.password
                    //     }
                    // })
                }}>
                    Continue
                </button>
                {#if error}
                <p  class="text-error text-sm">{errorMsg}</p>
                {/if}
            </form>
        </div>
        {/if}
    </div>
</section>