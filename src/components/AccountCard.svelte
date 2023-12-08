<script lang="ts">
    export let type: string = "";
    export let number: number = 0;
    export let balance: number = 0;
</script>


<div class="w-72 h-32 p-3 bg-gray-300 rounded-lg flex justify-between flex-col">
    <span class="flex justify-between">
        {#if type == "Checkings"}
        <p class="badge h-fit w-fit badge-error">{type}</p>
        {:else if type == "Savings"}
        <p class="badge h-fit w-fit badge-success">{type}</p>
        {:else if type == "Credit"}
        <p class="badge h-fit w-fit badge-warning">{type}</p>
        {/if}
        <p class="text-xs"><span class="font-semibold">Account #:</span>{number}</p>
    </span>
    <div class="divider m-0"></div>
    <span class="flex justify-between items-center">
        <p class="text-xs"><span class="font-semibold">Balance:</span> ${balance}</p>
        <!-- <button class="btn btn-sm">view</button> -->
    </span>
</div>