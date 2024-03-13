export class AnimalNotFoundException extends Error{
    constructor(message) {
        super(message);
        this.message = `BackendException: ${message}`;
    }
}