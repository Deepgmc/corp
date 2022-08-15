<template>
    <li class="nav-item">
        <slot name="itemSlot">

            <p class="nav-link">{{ text }}</p>
        </slot>
    </li>
</template>


<script>
export default {
}
</script>