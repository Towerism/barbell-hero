<template lang="pug">
  crud-create(
    api="movement"
    title="New Movement"
    model="Movement"
  )
    movement-form
</template>

<script>
import CrudCreate from "~/components/crud/create";
import MovementForm from "~/components/forms/movement";

export default {
  components: {
    CrudCreate,
    MovementForm
  },
  async fetch({ app }) {
    await app.$apiDispatch("movement-type/find");
  }
};
</script>
