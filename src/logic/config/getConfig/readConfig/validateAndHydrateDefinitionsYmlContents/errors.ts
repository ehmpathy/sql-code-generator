export class InvalidDefinitionError extends Error {
  public explanation: string;
  constructor({ explanation, basis }: { explanation: string; basis: any }) {
    const message = `${explanation}: ${JSON.stringify(basis)}`;
    super(message);
    this.explanation = explanation;
  }
}
