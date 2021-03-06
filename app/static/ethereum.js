var ABI = [{"constant":false,"inputs":[{"name":"is_ok","type":"bool"},{"name":"teacher","type":"address"}],"name":"student_end_lesson","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw_expired","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"moderator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"courses","outputs":[{"name":"student","type":"address"},{"name":"author","type":"address"},{"name":"blocked","type":"bool"},{"name":"price","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"start","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"teacher","type":"address"},{"name":"teacher_is_right","type":"bool"},{"name":"i","type":"uint256"}],"name":"resolve_dispute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint256"},{"name":"student","type":"address"},{"name":"author","type":"address"},{"name":"duration","type":"uint256"}],"name":"teacher_ready_to_give_lesson","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"disputes","outputs":[{"name":"student","type":"address"},{"name":"author","type":"address"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"withdrawals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"teacher","type":"address"}],"name":"student_start_lesson","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":true,"name":"end_time","type":"uint256"}],"name":"LessonStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":false,"name":"index","type":"uint256"}],"name":"DisputeMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"},{"indexed":true,"name":"student","type":"address"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"teacher_is_right","type":"bool"}],"name":"DisputeResolved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"teacher","type":"address"}],"name":"LessonPrepared","type":"event"}];
var contract = "0x1147099a085071aa34B0a44ee58BF3c989e5a072";


web3 = window.web3;
// console.log(web3);

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	window.web3 = new Web3(web3.currentProvider);

	// console.log(web3.currentProvider);

	if (web3.currentProvider.isMetaMask === true) {
		token = web3.eth.contract(ABI).at(contract);
		account = web3.eth.accounts[0];

		// $('#message').append('<div>' + account + '</div');
		// console.log(token);
		// console.log(account);

		get_balance();
	} else {
		$('#message').html('<div>No web3? Please use google chrome and metamask plugin to enter this Dapp!</div>');
	}
}


function get_balance() {
	web3.eth.getBalance(account, function(err, res) {
		$('#message').html(account + ' &nbsp; &nbsp; ' + Math.round(res / 10e14) / 1000 + ' ETH');
		// console.log(res);
	});
}

function teacher_ready_to_give_lesson(price, student, author, delay) {
	token.teacher_ready_to_give_lesson.sendTransaction(
		price,
		student,
		author,
		delay,
		function (err, res) { console.log(res); }
	);
}

function student_start_lesson(teacher, price) {
	token.student_start_lesson.sendTransaction(
		teacher,
		{
			from: account,
			gas: 3000000,
			value: price
		},
		function (err, res) { console.log(res); });
}

function student_end_lesson(isOk, teacher) {
	token.student_end_lesson.sendTransaction(
		isOk,
		teacher,
		function (err, res) { console.log(res); });
}