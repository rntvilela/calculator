const add = function (a, b) {
	return a + b;
}

const sub = function (a, b) {
	return a - b;
}

const mul = function (a, b) {
	return a * b;
}

const div = function (a, b) {
	return a / b;
}

const exp = function (a, b) {
	return a ** b;
}

const operate = function (operator, first_number, second_number) {
	let result = 0;

	if (operator === '+') result = add(first_number, second_number);
	else if (operator === '-') result = sub(first_number, second_number);
	else if (operator === '*') result = mul(first_number, second_number);
	else if (operator === '/') result = div(first_number, second_number);
	else if (operator === '^') result = exp(first_number, second_number);

	return Number(result.toFixed(2));
}
