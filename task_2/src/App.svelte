<script lang="ts">
     import { onMount } from "svelte";
     let currencies: string[] = ["USD", "EUR", "GBP", "CNY"];
     let fromCurrency: string = "USD";
     let toCurrency: string = "EUR";
     let fromAmount: number = 1;
     let toAmount: number = 0;
     let rate: number = 0;

     const apiKey: string = "0554a88af41d55ca749cbd22";

     async function fetchRate(): Promise<void> {
       const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
       const data = await response.json();
       rate = data.conversion_rates[toCurrency];
       convert("from");
     }

     function convert(direction: string): void {
       if (direction === "from") {
         toAmount = parseFloat((fromAmount * rate).toFixed(2));
       } else {
         fromAmount = parseFloat((toAmount / rate).toFixed(2));
       }
     }

     onMount(() => {
       fetchRate();
     });

     $: fromCurrency, toCurrency, fetchRate();
     $: fromAmount, convert("from");
     $: toAmount, convert("to");
   </script>

   <style>
     input {
       margin: 5px 0;
     }
   </style>

   <div>
     <h1>Конвертер валют</h1>
     <div>
      <select bind:value={fromCurrency}>
       {#each currencies as currency}
         <option>{currency}</option>
       {/each}
      </select>
     <input type="number" bind:value={fromAmount} />
     </div>
     <div>
      <select bind:value={toCurrency}>
       {#each currencies as currency}
         <option>{currency}</option>
       {/each}
     </select>
     <input type="number" bind:value={toAmount} />
    </div>
   </div>