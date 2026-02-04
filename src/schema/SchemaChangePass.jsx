// import * as zod from "zod";
// export const SchemaChangePass = zod.object({
//  password: zod.string().nonempty("password is required").regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), 
//      newPassword: zod.string().nonempty("Newpassword is required").regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), 
//   })
 
import * as zod from "zod";

export const SchemaChangePass = zod.object({
  password: zod
    .string()
    .nonempty("Password is required")
    .regex(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
      "Password must contain capital, small letter, number, and min 6 chars"
    ),

  newPassword: zod
    .string()
    .nonempty("New password is required")
    .regex(
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
      "New password must be strong"
    ),
});
