<template>
  {{ notificationDisplayed }}
  <router-view />
  <AOToast ref="toasterRef" :position="'top-right'" :fluid="false" />
</template>

<script>
import { ref, watch } from 'vue';
import { mapActions, mapGetters } from '@/mapState'
import AOToast from '@/components/AOToast.vue';
import './charts/ChartjsConfig';

export default {
  name: 'App',
  components: {
    AOToast
  },
  setup(props, { emit }) {
    const { notificationDisplayed, getNotificationText, getNotificationType } = mapGetters()
    const { refNotification, resetNotification } = mapActions()

    const toasterRef = ref(null)

    watch(notificationDisplayed, () => {
      console.log("Component(App)::notificationDisplayed() - called");
      if (notificationDisplayed.value) {
        console.log("ABC")
        // Don't display the same toast again...
        // Find the toastr with the same body message and same type
        let textBody = getNotificationText.value;
        let typeNoti = getNotificationType.value === "info" ? "success" : getNotificationType.value;
        if (typeNoti === "error") {
          typeNoti = "danger";
        }

        console.log(textBody, typeNoti);
        console.log("toasterRef", toasterRef.value)
        refNotification(toasterRef.value);

        const foundToastr = toasterRef.value.stackToasts.find((e) => e.body === textBody && e.type === typeNoti);

        let option = {};
        switch (getNotificationType.value) {
          case "success":
            option = {
              type: "success",
              body: getNotificationText.value,
              timeout: 8000
            };
            break;
          case "info":
            option = {
              type: "info",
              body: getNotificationText.value,
              timeout: 8000
            };
            break;
          case "warning":
            option = {
              type: "warning",
              body: getNotificationText.value,
              timeout: 8000
            };
            break;
          case "error":
            option = {
              type: "danger",
              body: getNotificationText.value,
              timeout: 8000
            };
            break;
          default:
            option = {
              type: "warning",
              body: getNotificationText.value,
              timeout: 8000
            };
            break;
        }

        // Same toast is already displayed, no need to display it again
        // Only need to reset the timeout countdown to hold the notification on screen

        if (foundToastr) {
          toasterRef.value.resetTimeOut(foundToastr.id, option);
          resetNotification();
          return;
        }

        toasterRef.value.push(option);
      }
      resetNotification();
    })

    return {
      notificationDisplayed,
      toasterRef
    }
  }
}
</script>

