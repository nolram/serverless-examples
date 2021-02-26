import { IsString, IsNumber, Matches, IsOptional } from 'class-validator';

class TransactionDTO {

    @IsString()
    @IsOptional()
    public identifier?: string;

    @IsString()
    public userId: string;

    @IsNumber()
    public value: number;

    @IsString()
    @Matches('^credit$|^debit$')
    public transactionType: string;

}

export default TransactionDTO;