'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function FarmingAdvicePage() {
    const [formData, setFormData] = useState({
        crop: 'Rice',
        rainfall: 120,
        temperature: 30,
        soil_type: 'Loamy',
        region: 'Punjab',
        month: 7,
    });

    const [loading, setLoading] = useState(false);
    const [advice, setAdvice] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rainfall' || name === 'temperature' || name === 'month'
                ? Number(value)
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setAdvice(null);

        try {
            const res = await fetch('https://mcp-server-tllb.onrender.com/generate-advice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to fetch advice');

            const data = await res.json();
            setAdvice(data.farming_advice);
        } catch (err: any) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
                    {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              {/* Logo can be an image or icon, here using a placeholder icon */}   
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">AgroWise</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
        <div className="container px-4 md:px-6 py-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                🌱 Get Farming Advice
            </h1>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Enter Your Farming Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Crop</label>
                                <input
                                    name="crop"
                                    value={formData.crop}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Rainfall (mm)</label>
                                <input
                                    type="number"
                                    name="rainfall"
                                    value={formData.rainfall}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Temperature (°C)</label>
                                <input
                                    type="number"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Soil Type</label>
                                <input
                                    name="soil_type"
                                    value={formData.soil_type}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Region</label>
                                <input
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Month (1-12)</label>
                                <input
                                    type="number"
                                    name="month"
                                    min={1}
                                    max={12}
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            {loading ? 'Fetching Advice...' : 'Get Advice'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {advice && (
                <Card className="mt-6 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
                    <CardHeader>
                        <CardTitle>📋 Advice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-gray-800 dark:text-gray-200 space-y-4">
                            {advice.split('---').map((section, index) => (
                                <div key={index} className="whitespace-pre-wrap">
                                    {section
                                        .replace(/###/g, '')
                                        .replace(/\*\*/g, '')
                                        .trim()}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {error && (
                <div className="mt-4 text-red-600 font-semibold">
                    ❌ Error: {error}
                </div>
            )}
        </div>
        </>
    );
}
