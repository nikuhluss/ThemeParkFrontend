<script>
  import { createEventDispatcher } from "svelte";

  export let payload = {};
  export let disabled = false;
  export let bulmaSubmitModifier = "is-primary";

  const dispatch = createEventDispatcher();
  const handleSubmit = () => {
    dispatch("submit", payload);
  };
  const handleCancel = () => {
    dispatch("cancel");
  };
</script>

<div class="field is-grouped">

  <div class="control">
    <button
      style="background-color: #50A3D5"
      type="submit"
      class="button {bulmaSubmitModifier}"
      on:click={handleSubmit}
      {disabled}>
      Submit
    </button>
  </div>

  <div class="control">
    <button class="button is-light" on:click={handleCancel}>Cancel</button>
  </div>

</div>
