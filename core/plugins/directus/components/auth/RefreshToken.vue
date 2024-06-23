<script setup>
import {onMounted} from "vue";
import {Auth} from "@/core/tools/Auth";
import {Directus} from "@/core/tools/Directus";

/**
 * Refresh token
 * @type {Directus}
 */
onMounted(() => {
  if (!Auth.isLogin()) return;

  // Refresh token
  const directus = Directus.reactive();
  directus.refresh()
})

</script>
