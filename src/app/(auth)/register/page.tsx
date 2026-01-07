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

interface RegistrationFormData {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'applicant' | "employer"
}

const Registration: React.FC = () => {

    const [formData, setFormData] = useState<RegistrationFormData>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "applicant"
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData)
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
                    <form onSubmit={handleSubmit} className='space-y-5'>

                        <div className="space-y-2">
                            <Label htmlFor='name'>Full Name *</Label>
                            <div className="relative mt-1">
                                <User className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='name'
                                    type='text'
                                    placeholder='Enter your full name'
                                    required
                                    value={formData.name}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange("name", e.target.value)
                                    }}
                                    className='pl-8' />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor='username'>Username *</Label>
                            <div className="relative mt-1">
                                <User className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='username'
                                    type='text'
                                    placeholder='Enter username'
                                    required
                                    value={formData.username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange("username", e.target.value)
                                    }}
                                    className='pl-8' />
                            </div>
                        </div>

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
                            <Label htmlFor='role'>I am a *</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value: "applicant" | "employer") => {
                                    handleInputChange("role", value)
                                }}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select your role</SelectLabel>
                                        <SelectItem value='aplicant'>Applicant</SelectItem>
                                        <SelectItem value='employer'>Employer</SelectItem>
                                    </SelectGroup>
                                </SelectContent>

                            </Select>

                        </div>


                        <div className="space-y-2">
                            <Label htmlFor='password'>Password *</Label>
                            <div className="relative mt-1">
                                <Lock className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter a strong password'
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
                            <Label htmlFor='confirmPassword'>Confirm Password *</Label>
                            <div className="relative mt-1">
                                <Lock className='absolute top-1/2 -translate-y-1/2 left-2 w-4 pointer-events-none text-muted-foreground' />
                                <Input
                                    id='confirmPassword'
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Confirm Password'
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        handleInputChange("confirmPassword", e.target.value)
                                    }}
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
                        </div>

                        <div className="space-y-2">
                            <Button className='w-full cursor-pointer' size={"lg"}>Register</Button>
                        </div>

                    </form>

                    <p className='mt-4 text-center text-muted-foreground'>Already have an account? <Link href='/login' className='font-bold text-primary'>Sign in here</Link></p>

                </CardContent>


            </Card>

        </div>
    )
}

export default Registration
