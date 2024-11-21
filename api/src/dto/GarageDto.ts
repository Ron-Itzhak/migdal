import {
  IsInt,
  IsString,
  IsOptional,
  IsPhoneNumber,
  Length,
} from "class-validator";
import { ObjectId } from "mongodb";

export class GarageDto {
  @IsOptional()
  _id?: ObjectId;

  @IsInt()
  mispar_mosah: number;

  @IsString()
  @Length(1, 255)
  shem_mosah: string;

  @IsInt()
  cod_sug_mosah: number;

  @IsString()
  @Length(1, 100)
  sug_mosah: string;

  @IsString()
  @Length(1, 100)
  ktovet: string;

  @IsString()
  @Length(1, 100)
  yishuv: string;

  @IsPhoneNumber("IL", { message: "Invalid phone number for Israel" })
  telephone: string;

  @IsInt()
  mikud: number;

  @IsInt()
  cod_miktzoa: number;

  @IsString()
  @Length(1, 100)
  miktzoa: string;

  @IsString()
  @Length(1, 100)
  menahel_miktzoa: string;

  @IsInt()
  rasham_havarot: string;
}
