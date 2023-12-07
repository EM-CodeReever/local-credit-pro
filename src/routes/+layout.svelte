<script lang="ts">
    import { goto } from '$app/navigation';
    import '../app.css'

</script>

<div class="w-full h-20 bg-indigo-600 flex items-center justify-center text-gray-200 text-3xl font-bold">
<button class="hover:bg-[#00000032] p-3 rounded-lg cursor-pointer" on:click={()=>{
    goto('/')
}}>Local Credit Pro</button>
</div>
<slot />