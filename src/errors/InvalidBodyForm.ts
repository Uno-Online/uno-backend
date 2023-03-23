export default class InvalidBodyForm extends Error {
  constructor(public message: string) {
    super(message);
  }
}
