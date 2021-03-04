export interface Authentication {
  auth: (email: string, pawword: string) => Promise<string>
}
