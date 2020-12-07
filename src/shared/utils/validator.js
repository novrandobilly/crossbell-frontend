const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_NUMSTR = 'NUMSTR';
const VALIDATOR_TYPE_ALWAYS_TRUE = 'ALWAYSTRUE';

export const VALIDATOR_REQUIRE = () => ({
	type: VALIDATOR_TYPE_REQUIRE
});
export const VALIDATOR_FILE = () => ({
	type: VALIDATOR_TYPE_FILE
});
export const VALIDATOR_MINLENGTH = val => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
	type: VALIDATOR_TYPE_MAXLENGTH,
	val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_NUMSTR = () => ({ type: VALIDATOR_TYPE_NUMSTR });
export const VALIDATOR_ALWAYSTRUE = () => ({ type: VALIDATOR_TYPE_ALWAYS_TRUE });

export const validate = (inputValue, validators) => {
	let isValid = true;

	for (const validator of validators) {
		if (validator.type === VALIDATOR_TYPE_REQUIRE) {
			isValid = isValid && inputValue.trim().length > 0;
		}
		if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
			isValid = isValid && inputValue.trim().length >= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
			isValid = isValid && inputValue.trim().length <= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MIN) {
			isValid = isValid && +inputValue >= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MAX) {
			isValid = isValid && +inputValue <= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_EMAIL) {
			isValid = isValid && /^\S+@\S+\.\S+$/.test(inputValue);
		}
		if (validator.type === VALIDATOR_TYPE_NUMSTR) {
			isValid = isValid && !isNaN(parseInt(inputValue));
		}
		if (validator.type === VALIDATOR_TYPE_ALWAYS_TRUE) {
			isValid = isValid && true;
		}
	}
	return isValid;
};
