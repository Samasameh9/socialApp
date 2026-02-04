import * as zod from "zod";
export const Schema = zod
  .object({
    name: zod.string().nonempty("name is required").max(5, "max name char is 5").min(3, "min name char is 3"),
    email: zod.string().nonempty("email is required").regex(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, "invalid email"),
    password: zod.string().nonempty("password is required").regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/),
    rePassword: zod.string().nonempty("repassword is required"),
    gender: zod.string().nonempty("gender is required"),
    dateOfBirth: zod.coerce.date("date is required").refine((value) => {
      let year = value.getFullYear();
      let datenow = new Date().getFullYear();
      let useryear = datenow - year;
      return useryear >= 20;
    }, "less than 20"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "must repassword match password",
  });
