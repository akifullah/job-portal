"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectLabel,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select"
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { userLoginAction } from '@/features/auth/server/userLoginAction';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { LoginUserDataType, loginUserSchema } from '@/features/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';



const LoginPage: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginUserSchema)
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginUserDataType) => {
        try {

            const res = await userLoginAction(data);
            console.log(res);
            if (!res.success) {
                toast.error(res.message);
            }
            if (res.success) {
                toast.success(res.message);
            }
        } catch (error) {
            toast.error("Something went wrong!")
        }

    }

    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-4'>
            <Card className='w-full max-w-lg'>
                <CardHeader className='text-center'>
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 ">
                        <UserCheck className='w-8 h-8 text-primary-foreground' />
                    </div>

                    <CardTitle className='text-2xl'>Welcome back!</CardTitle>
                    {/* <CardDescription>Create your account to get started</CardDescription> */}

                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

                        <div className="space-y-2">
                            <Label htmlFor='email'>Email address *</Label>
                            <div className="relative mt-1">
                                <Mail className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='email'
                                    type='text'
                                    placeholder='Enter your email'
                                    required
                                    {...register("email")}
                                    className='pl-8' />
                            </div>
                            {
                                errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>
                            }
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor='password'>Password *</Label>
                            <div className="relative mt-1">
                                <Lock className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    required
                                    className='pl-8'
                                    {...register("password")}
                                />

                                <Button
                                    type='button'
                                    variant={'ghost'}
                                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {
                                        showPassword ?
                                            <EyeOff className='w-4' />
                                            :
                                            <Eye className='w-4' />
                                    }
                                </Button>
                            </div>
                            {
                                errors.password && <p className='text-sm text-destructive'>{errors.password.message}</p>
                            }
                        </div>


                        <div className="space-y-2">
                            <Button className='w-full cursor-pointer' size={"lg"}>Sign in</Button>
                        </div>

                    </form>

                    <p className='mt-4 text-center text-muted-foreground'>Don't have an account? <Link href='/register' className='font-bold text-primary'>Sign up here</Link></p>

                </CardContent>


            </Card>

        </div>
    )
}

export default LoginPage
