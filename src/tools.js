import Alert from 'react-s-alert';
const {clipboard} = require('electron');

module.exports = {

	copy: function(data) {
		clipboard.writeText(String(data));
	},

	diff: function(start, end) {
		if (start && end){
			const one_day = 24 * 60 * 60 * 1000;

			var start_array = start.split('-');
			start_array = start_array.map((v) => parseInt(v));
			var s = new Date(start_array[0], (start_array[1] - 1), start_array[2]);

			//console.log('Start ' + s);

			var end_array = end.split('-');
			end_array = end_array.map((v) => parseInt(v));
			var e = new Date(end_array[0], (end_array[1] - 1), end_array[2]);

			//console.log('End ' + e);

			var days = (Math.floor((e - s)/(one_day))) + 1;

			return days;
		} else {
			return 0;
		}
	}
};