
<script>
import { check } from "../utils/auth"
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render (h, ctx) {
    const { props, scopedSlots } = ctx
    return check(props.authority) ? scopedSlots.default() : null
  }
}
</script>

