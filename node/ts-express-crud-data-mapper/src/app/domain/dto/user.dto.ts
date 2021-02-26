import { IsString, IsDateString, Matches, IsEmail, IsOptional } from 'class-validator';

class UserDTO {
    
    @IsString()
    @IsOptional()
    public identifier?: string;

    @IsString()
    public name: string;

    @IsDateString()
    public birthday: string;

    @IsString()
    @Matches('^basic$|^gold$|^platinum$|^black$')
    public accountType: string;

    @IsEmail()
    public email: string;

    @IsString()
    public phone: string;

}

export default UserDTO;