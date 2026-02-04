import * as zod from "zod";
export const SchemaLogin = zod.object({
    email: zod.string().nonempty("email is required").regex(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, "invalid email"),
    password: zod.string().nonempty("password is required").regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), 
  })
 
