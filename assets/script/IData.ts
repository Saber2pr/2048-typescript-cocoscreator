export default interface IData {
  init(size: number): void
  merge(method: string, arr: number[][]): number[][]
  log(): void
}
