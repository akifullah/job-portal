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
import { registrationActions } from './registrationAction.action';
import { toast } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { RegisterUserWithConfirmDataType, registerUserWithConfirmSchema } from '@/features/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';


const Registration: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(registerUserWithConfirmSchema)
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data: RegisterUserWithConfirmDataType) => {
        const res = await registrationActions(data);
        if (res.success) {
            return toast.success(res.message,);
        }
        return toast.error(res.message);
    }
    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-4'>
            <Card className='w-full max-w-lg'>
                <CardHeader className='text-center'>
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 ">
                        <UserCheck className='w-8 h-8 text-primary-foreground' />
                    </div>

                    <CardTitle className='text-2xl'>Join Our Job Portal</CardTitle>
                    <CardDescription>Create your account to get started</CardDescription>

                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

                        <div className="space-y-0">
                            <Label htmlFor='name'>Full Name *</Label>
                            <div className="relative mt-1">
                                <User className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='name'
                                    type='text'
                                    placeholder='Enter your full name'
                                    required
                                    {...register('name')}
                                    className='pl-8' />
                            </div>
                            {
                                errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>
                            }
                        </div>

                        <div className="space-y-0">
                            <Label htmlFor='username'>Username *</Label>
                            <div className="relative mt-1">
                                <User className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='username'
                                    type='text'
                                    placeholder='Enter username'
                                    required
                                    {...register('userName')}
                                    className='pl-8' />
                            </div>
                            {
                                errors.userName && <p className='text-sm text-destructive'>{errors.userName.message}</p>
                            }
                        </div>

                        <div className="space-y-0">
                            <Label htmlFor='email'>Email address *</Label>
                            <div className="relative mt-1">
                                <Mail className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='email'
                                    type='text'
                                    placeholder='Enter your email'
                                    required
                                    {...register('email')}
                                    className='pl-8' />
                            </div>
                            {
                                errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>
                            }

                        </div>

                        <div className="space-y-0">
                            <Label htmlFor='role'>I am a *</Label>
                            <Controller name='role' control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select your role</SelectLabel>
                                                <SelectItem value='applicant'>Applicant</SelectItem>
                                                <SelectItem value='employer'>Employer</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>

                                    </Select>
                                )}
                            >
                            </Controller>

                            {
                                errors.role && <p className='text-sm text-destructive'>{errors.role.message}</p>
                            }

                        </div>


                        <div className="space-y-0">
                            <Label htmlFor='password'>Password *</Label>
                            <div className="relative mt-1">
                                <Lock className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter a strong password'
                                    required
                                    {...register('password')}
                                    className='pl-8' />

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

                        <div className="space-y-0">
                            <Label htmlFor='confirmPassword'>Confirm Password *</Label>
                            <div className="relative mt-1">
                                <Lock className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='confirmPassword'
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Confirm Password'
                                    required
                                    {...register('confirmPassword')}
                                    className='pl-8' />
                                <Button
                                    type='button'
                                    variant={'ghost'}
                                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {
                                        showConfirmPassword ?
                                            <EyeOff className='w-4' />
                                            :
                                            <Eye className='w-4' />
                                    }
                                </Button>
                            </div>
                            {
                                errors.confirmPassword && <p className='text-sm text-destructive'>{errors.confirmPassword.message}</p>
                            }
                        </div>

                        <div className="space-y-0">
                            <Button className='w-full cursor-pointer' size={"lg"}>Register</Button>
                        </div>

                    </form>

                    <p className='mt-4 text-center text-muted-foreground'>Already have an account? <Link href='/login' className='font-bold text-primary'>Sign in here</Link></p>

                </CardContent>


            </Card>

        </div >
    )
}

export default Registration
