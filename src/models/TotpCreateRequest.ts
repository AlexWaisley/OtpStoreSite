export type TotpCreateRequest = {
    name: string;
    secretKey: string;
    digitsCount: number;
}