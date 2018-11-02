export default interface IData {
  init(size: number): void
  merge(method: string, arr: number[][]): void
  log(): void
}
