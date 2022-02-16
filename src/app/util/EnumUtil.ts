export class EnumUtil {
  static getNameByValue(value: any, enumObject: object): string {
    return Object.entries(enumObject).find(([key, val]) => val === value)?.[0];
  }
}
