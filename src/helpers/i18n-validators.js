import * as validators from "@vuelidate/validators";
import i18n from "../i18n";

const {createI18nMessage} = validators;

// Create your i18n message instance. Used for vue-i18n@
const withI18nMessage = createI18nMessage({t: i18n.global.t.bind(i18n)});

// validators that expect a parameter should have { withArguments: true } passed as a second parameter, to annotate they should be wrapped
export const required = withI18nMessage(validators.required);
export const requiredIf = withI18nMessage(validators.requiredIf, {withArguments: true});
export const between = withI18nMessage(validators.between, {withArguments: true});
export const minLength = withI18nMessage(validators.minLength, {withArguments: true});
export const maxLength = withI18nMessage(validators.maxLength, {withArguments: true});
export const numeric = withI18nMessage(validators.numeric, {withArguments: true});
export const decimal = withI18nMessage(validators.decimal, {withArguments: true});
export const helpersReq = validators.helpers.req;
export const helpers = withI18nMessage(validators.helpers.regex, {withArguments: true});
export const minValue = withI18nMessage(validators.minValue, {withArguments: true});
export const maxValue = withI18nMessage(validators.maxValue, {withArguments: true});
export const email = withI18nMessage(validators.email, {withArguments: true});
export const sameAs = withI18nMessage(validators.sameAs, {withArguments: true});
export const url = withI18nMessage(validators.url, {withArguments: true});
export const alpha = withI18nMessage(validators.alpha, {withArguments: true});