export class FilterParamsDTO {
    constructor(
    public rocketName: string,
    public date?: string,
    public successful?: boolean
    ) {}
}
