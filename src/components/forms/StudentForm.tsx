"use client "

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
    username: z
        .string()
        .min(3, { message: "User name at least 3 characters long !" })
        .max(20, { message: "User name be at most 20 characters long !" }),
    email: z.string().email({ message: "invalid email address!" }),
    password: z
        .string()
        .min(8, { message: "Username must be at least 8 characters long!" }),
    firstname: z.string().min(1, { message: "First name is required!" }),
    lastname: z.string().min(10, { message: "Last name is required!" }),
    phone: z.string().min(10, { message: "Phone number is required!" }),
    address: z.string().min(20, { message: "Address is required!" }),
    bloodType: z.string().min(20, { message: "Blood Type is required!" }),
    birthday: z.date({ message: "Birthday name is required!" }),
    gender: z.enum(["male", "female"], { message: "Gender is required!" }),
    img: z.instanceof(File, { message: "Image is required!" }),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
    type,
    data,
}: {
    type: "create" | "update";
    data?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(data => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">Create a New Student</h1>
            <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Username"
                    name="username"
                    defaultValue={data?.username}
                    register={register}
                    error={errors?.username}
                />
                <InputField
                    label="Email"
                    name="email" type="email"
                    defaultValue={data?.email}
                    register={register}
                    error={errors?.email}
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    defaultValue={data?.password}
                    register={register}
                    error={errors?.password}
                />
            </div>
            <span className="text-xs text-gray-400 font-medium"> Personal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Firstname"
                    name="firstname"
                    defaultValue={data?.firstname}
                    register={register}
                    error={errors?.firstname}
                />
                <InputField
                    label="Lastname"
                    name="lastname"
                    defaultValue={data?.lastname}
                    register={register}
                    error={errors?.lastname}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors?.phone}
                />
                <InputField
                    label="Address"
                    name="address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors?.address}
                />
                <InputField
                    label="Blood Type"
                    name="bloodType"
                    defaultValue={data?.bloodType}
                    register={register}
                    error={errors?.bloodType}
                />
                <InputField
                    label="Birthday"
                    name="birthday"
                    type="date"
                    defaultValue={data?.birthday}
                    register={register}
                    error={errors?.birthday}
                />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Gender</label>
                    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"{...register("gender")} defaultValue={data?.gender}>
                        <option value="male1">Male</option>
                        <option value="female1">Female</option>
                    </select>
                    {errors.gender?.message && (
                        <p className="text-xs text-rose-800">
                            {errors.gender.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                    <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                        <Image src="/upload.png" alt="" width={28} height={28} />
                        <span>Upload a Photo</span>
                    </label>
                    <input type="file" id="img" {...register("img")} className="hidden" />
                    {errors.img?.message && (
                        <p className="text-xs text-rose-800">
                            {errors.img.message.toString()}
                        </p>
                    )}
                </div>
                </div>
            <button className="bg-green text-white p-2 rounded-md">
                {type === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
};
export default StudentForm;