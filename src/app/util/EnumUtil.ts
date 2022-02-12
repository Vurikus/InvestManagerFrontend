export class EnumUtil {
  static getName(value: any, enumObject: object): string {
    return Object.entries(enumObject).find(([key, val]) => val === value)?.[0];
  }
}
