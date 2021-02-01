export class DataCodeError extends Error {
  constructor (fun: string, data: any) {
    super(`${fun}: ${JSON.stringify(data)}`)
  }
}
