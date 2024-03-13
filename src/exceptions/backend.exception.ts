export class BackendException extends Error{
    constructor(message) {
        super(message);
        this.message = `BackendException: ${message}`;
    }
}