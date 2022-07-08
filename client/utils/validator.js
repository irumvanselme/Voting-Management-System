import Validator from "validatorjs";

import en from "validatorjs/src/lang/en";

export function validate(data, rules) {
	Validator.setMessages("en", en);

	let valid = new Validator(data, rules);

	if (valid.fails()) return [false, Object.values(valid.errors.all())];
	else return [true, valid.input];
}
