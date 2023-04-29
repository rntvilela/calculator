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
	else if (operator === 'x') result = mul(first_number, second_number);
	else if (operator === '/') result = div(first_number, second_number);
	else if (operator === '^') result = exp(first_number, second_number);

	result = Number(result.toFixed(2));
	return result.toString();
}

const split_expr = function (expr) {
	let numbers = [];
	let simbols = [];
	let num = '';
	let value;

	for(let i = 0; i < expr.length; i++) {

		value = expr[i];

		if (value.match(/[0-9\.]/)) num += value;
		else if (value.match(/[^0-9\.]/)) {
			simbols.push(value);
			if (num) {
				numbers.push(num);
				num = '';
			}
		}
	}

	if (num) numbers.push(num);
	
	return {'numbers': numbers, 'simbols': simbols};  

}

const eval_expr = function (expr) {
	let dict = split_expr(expr);
	let numbers = dict['numbers'];
	let simbols = dict['simbols'];
	let result;

	nlen = numbers.length;
	slen = simbols.length;
	if (nlen == slen + 1) {
		for(let i = 0; i < nlen - 1; i++) {
			let n1 = parseFloat(numbers[i]);
			let n2 = parseFloat(numbers[i + 1]);
			let s = simbols[i];

			result = operate(s, n1, n2);
			numbers[i + 1] = result;
		}
		
		return result;
	}

	else return expr;
	
}


document.addEventListener('DOMContentLoaded', function() {
	const items = document.querySelectorAll('.item');
	const expr = document.getElementById('expr');
	const hist = document.getElementById('hist');
	let expr_text = expr.textContent;

	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function() {
			let value = items[i].textContent;

			if (value === 'DEL') expr_text = expr_text.slice(0, expr_text.length - 1);		
			else if (value === 'C') {
				expr_text = '';
				hist.textContent = '';
			}
			else if (value === '=') {
				hist.textContent = expr_text;
				let r = eval_expr(expr_text);
				if (r === 'Infinity') alert(`${expr_text} = inf!`);
				else expr_text = r;
			}
			else if (expr_text.length < 12) expr_text += value;

			expr.textContent = expr_text;
		});
	}

});
