<template>
  <main class="bg-white dark:bg-slate-900">

    <div class="relative flex">

      <!-- Image -->
      <div class="w-full md:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <img class="object-cover object-center w-full h-full"
            src="../images/pngtree-cartoon-scene-of-a-tropical-aquarium-featuring-fish-picture-image_2640140.jpg"
            width="760" height="1024" alt="Authentication" />
        </div>
      </div>

      <!-- Content -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="block" to="/">
                <Logo/>
              </router-link>
            </div>
          </div>
          <slot />
        </div>
      </div>

    </div>

  </main>
</template>

<script>
</script>