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

interface RegistrationFormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {

    const [formData, setFormData] = useState<RegistrationFormData>({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            console.log(formData)
            const loginData = {
                email: formData.email,
                password: formData.password,
            }
            const res = await userLoginAction(loginData);
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
                    <form onSubmit={handleSubmit} className='space-y-5'>

                        <div className="space-y-2">
                            <Label htmlFor='email'>Email address *</Label>
                            <div className="relative mt-1">
                                <Mail className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='email'
                                    type='text'
                                    placeholder='Enter your email'
                                    required
                                    value={formData.email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange("email", e.target.value)
                                    }}
                                    className='pl-8' />
                            </div>
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
                                    value={formData.password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange("password", e.target.value)
                                    }}
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
