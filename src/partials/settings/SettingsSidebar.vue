<template>
  <div
    class="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 min-w-60 md:space-y-3">
    <!-- Group 1 -->
    <div>
      <div class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">Business settings</div>
      <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
        <router-link to="/settings/account" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2.5 py-2 rounded whitespace-nowrap"
              :class="isExactActive && 'bg-indigo-50 dark:bg-indigo-500/30'" :href="href" @click="navigate">
              <svg class="w-4 h-4 shrink-0 fill-current mr-2"
                :class="isExactActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'"
                viewBox="0 0 16 16">
                <path
                  d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
              </svg>
              <span class="text-sm font-medium"
                :class="isExactActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200'">My
                Account</span>
            </a>
          </li>
        </router-link>
        <router-link to="/settings/change-password" custom v-slot="{ href, navigate, isExactActive }">
          <li class="mr-0.5 md:mr-0 md:mb-0.5">
            <a class="flex items-center px-2.5 py-2 rounded whitespace-nowrap"
              :class="isExactActive && 'bg-indigo-50 dark:bg-indigo-500/30'" :href="href" @click="navigate">
              <svg class="w-4 h-4 shrink-0 fill-current mr-2"
                :class="isExactActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'"
                fill="#000000" width="256px" height="256px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>Lock Reset</title>
                  <path
                    d="M13.16,3.17A8.83,8.83,0,1,1,5.76,16.8l1.4-1.11a7.05,7.05,0,1,0-1-4.57H8.6L5.3,14.41,2,11.12H4.38a8.83,8.83,0,0,1,8.78-7.95m2.57,7.21a.81.81,0,0,1,.81.81v3.9a.82.82,0,0,1-.82.82H11a.79.79,0,0,1-.75-.82V11a.79.79,0,0,1,.74-.81V9.46a2.39,2.39,0,0,1,2.71-2.37A2.47,2.47,0,0,1,15.8,9.57v.81m-1.11-.84A1.22,1.22,0,0,0,14,8.4a1.29,1.29,0,0,0-1.86,1.09v.89h2.57Z">
                  </path>
                </g>
              </svg>
              <span class="text-sm font-medium"
                :class="isExactActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200'">Change
                password</span>
            </a>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsSidebar',
}
</script>