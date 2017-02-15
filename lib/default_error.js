'use strict'

class DefaultError extends Error {

	constructor (message, code) {
		super(message);
		this.message = message;
		this.status = code;
	}
}
module.exports = DefaultError;
