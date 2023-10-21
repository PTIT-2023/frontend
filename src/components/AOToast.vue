<template>
    <div class="toaster" aria-atomic="true" :class="[
        'text-start',
        {
            'toasterToast-TopLeft': position === Position.TOP_LEFT,
            'toasterToast-TopRight': position === Position.TOP_RIGHT,
            'toasterToast-BottomLeft': position === Position.BOTTOM_LEFT,
            'toasterToast-BottomRight': position === Position.BOTTOM_RIGHT,
            'toasterToast-Fluid': fluid
        }
    ]">
        <!--<button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>-->
        <div id="kt_docs_toast_stack_container" class="toast-container position-fixed top-0 end-0 p-3 z-index-3">
            <button v-for="option in stackToasts" :id="option.id" :key="option.id" data-bs-dismiss="toast"
                class="toast AOToast toastWidth p-0 mb-3" :class="classLightColorName(option.type)" role="alert"
                aria-live="assertive" aria-atomic="true" @click="dismiss(option.id)">
                <div class="toastSide text-center text-white divIconSvg" :class="className(option.type)">
                    <light-icon v-if="option.type == 'info'" class-name="menu-icon iconSvgSize centerIconSvg" />
                    <alert-icon v-else-if="option.type == 'warning' || option.type == 'danger'"
                        class-name="menu-icon iconSvgSize centerIconSvg" />
                    <success-icon v-else-if="option.type == 'success'" class-name="menu-icon iconSvgSize centerIconSvg" />
                </div>
                <div class="p-4 text-start">
                    <div class="toastHeader">
                        <p class="toast-message pe-4 mb-2 fs-6">
                            {{ option.body }}
                        </p>
                        <svg v-if="option.timeout" class="toastTimeout" viewBox="0 0 10 10"
                            :style="`--timeout: ${option.timeout}ms`">
                            <circle cx="5" cy="5" r="4" fill="transparent" />
                        </svg>
                    </div>
                    <span class="text-dark-50 fs-6">
                        {{ $t("toastr_clickToDismiss") }}
                    </span>
                </div>
            </button>
        </div>
    </div>
</template>
<script>
import _ from "lodash";
import SvgLightcon from "@/components/icons/light.vue";
import SvgAlertIcon from "@/components/icons/alert.vue";
import SvgSuccessIcon from "@/components/icons/success.vue";

const Type = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    DANGER: "danger"
};

const Position = {
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_LEFT: "bottom-left",
    TOP_RIGHT: "top-right",
    TOP_LEFT: "top-left"
};

export default {
    name: "AOToast",
    components: {
        // -- Components -- List of local components used in the current template
        // --
        "light-icon": SvgLightcon,
        "alert-icon": SvgAlertIcon,
        "success-icon": SvgSuccessIcon
    },
    props: {
        /** Position where the toast appears. Accepted values: `top-right`, `top-left`, `bottom-left`, `bottom-right`. */
        position: {
            type: String,
            required: false,
            default: Position.TOP_RIGHT
        },
        /** If the Toast shouldn't have a fixed width */
        fluid: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            stackToasts: []
        };
    },
    computed: {
        // Loaded the Position in const enum
        Position() {
            return Position;
        }
    },
    // IMPORTANT: updated is use to show toast
    updated() {
        console.log('xxx: ', this.stackToasts);
        let hiddenToasts = this.stackToasts.filter((obj) => {
            return obj.show != true;
        });
        let nbToast = hiddenToasts.length;
        for (let idx = nbToast - 1; idx >= 0; idx--) {
            let toastObj = hiddenToasts[idx];
            var errorToast = document.getElementById(toastObj.id);
            let option = {
                animation: false,
                autohide: true,
                delay: toastObj.timeout
            };
            var toast = new bootstrap.Toast(errorToast, option);
            toast.show();
            toastObj.show = true;
            let stackToasts = this.stackToasts;
            errorToast.addEventListener("hidden.bs.toast", function () {
                const indexOfObject = stackToasts.findIndex((item) => {
                    return item.id === toastObj.id;
                });
                if (indexOfObject !== -1) {
                    stackToasts.splice(indexOfObject, 1);
                }
            });
        }
    },
    methods: {
        // Render the flaticon for toastr on the left
        /*icon(type) {
            //return "las la-check";

            switch (type) {
                case Type.INFO:
                    return "las la-lightbulb";
                case Type.SUCCESS:
                    return "las la-check";
                case Type.WARNING:
                case Type.DANGER:
                    return "las la-exclamation";
                default:
                    return "las la-lightbulb";
            }
        },*/

        // render the background color base on type
        className(type) {
            if (type === "info") {
                return `bg-primary`;
            }
            return `bg-${type}`;
        },

        // render the light background color base on type (it's a pastel color)
        classLightColorName(type) {
            switch (type) {
                case Type.INFO:
                    return `bg-light-primary`;
                //return `bg-light-info`;
                case Type.SUCCESS:
                    return `bg-light-success`;
                case Type.WARNING:
                    return `bg-light-warning`;
                case Type.DANGER:
                    return `bg-light-danger`;
                default:
                    return `bg-light-dark`;
            }
        },

        /*This method used to Spawn a new toast or replace the existing one with option objet: ex:
          push({
            type: 'success', : can be danger, warning, info
            body: text, : the notification message
            timeout: 8000 : number of milliseconds before the notification is automatically dismissed (optional)
          })*/
        push(option) {
            option.id = "toastr-" + _.uniqueId();
            this.stackToasts.push(option);
        },

        // This method used to reset the time out when the text message is required to display again
        // toastKey is the id of the found toastr
        resetTimeOut(toastKey, option) {
            if (toastKey) {
                this.dismiss(toastKey);
                this.push(option);
            }
        },

        //This method used to dismiss the current toast by toastKey in array.
        // If no toastKey defined, remove all toastrs
        dismiss(toastKey) {
            if (toastKey) {
                let index = _.findIndex(this.stackToasts, { id: toastKey });
                if (index >= 0) {
                    let toastElementVisible = document.getElementById(toastKey);
                    if (toastElementVisible) {
                        let myToast = bootstrap.Toast.getInstance(toastElementVisible);
                        myToast.hide();
                    }

                    this.stackToasts.splice(index, 1);
                }
            } else {
                this.stackToasts = [];
            }
        }
    }
};
</script>
<style scoped>
.iconSvgSize {
    display: inline-block;
    height: 2.15rem !important;
    width: 2.15rem !important;
}

.divIconSvg {
    display: table;
}

.toastWidth {
    width: 400px !important;
}

.centerIconSvg {
    display: table-cell;
    vertical-align: middle;
}
</style>
