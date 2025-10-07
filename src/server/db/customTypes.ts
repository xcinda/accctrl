import { customType } from "drizzle-orm/mysql-core";

export const booleanBit = customType<
{
    data: Boolean;
    driverData: Buffer
}>(
    {
        dataType(){
            return "bit(1)";
        },
        fromDriver(value: Buffer): Boolean {
            return value.readUInt8(0) === 1;
        },
        toDriver(value: Boolean): Buffer{
            return Buffer.from([value ? 1 : 0]);
        }
    }
)