"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Leaf } from "lucide-react";

const AiAgentPage = () => {
    const [formData, setFormData] = useState({
        crop_name: "Jowar(Sorghum)/per kg",
        market: "Manvi",
        district: "Raichur",
        state: "Karnataka",
        current_price: 9,
        current_date: "2025-03-22",
    });

    interface ResponseType {
        analysis: {
            price_forecast: string;
            weather_impacts: string[];
            market_arrivals: string;
        };
        advice: string;
    }

    const [response, setResponse] = useState<ResponseType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://agent-8jw0.onrender.com/get_advice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();
            setResponse(data);
        } catch (err: any) {
            setError(err.message);
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
        <div className="container py-12">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Crop Price & Sell Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="crop_name" className="text-sm font-medium">
                                    Crop Name
                                </label>
                                <input
                                    id="crop_name"
                                    type="text"
                                    name="crop_name"
                                    value={formData.crop_name}
                                    onChange={handleChange}
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="market" className="text-sm font-medium">
                                    Market
                                </label>
                                <input
                                    id="market"
                                    type="text"
                                    name="market"
                                    value={formData.market}
                                    onChange={handleChange}
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="district" className="text-sm font-medium">
                                    District
                                </label>
                                <input
                                    id="district"
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="state" className="text-sm font-medium">
                                    State
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="current_price" className="text-sm font-medium">
                                    Current Price
                                </label>
                                <input
                                    id="current_price"
                                    type="number"
                                    name="current_price"
                                    value={formData.current_price}
                                    onChange={handleChange}
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="current_date" className="text-sm font-medium">
                                    Current Date
                                </label>
                                <input
                                    id="current_date"
                                    type="date"
                                    name="current_date"
                                    value={formData.current_date}
                                    onChange={handleChange}
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                    {error && <p className="mt-4 text-red-600">Error: {error}</p>}
                    {response && (
                        <div className="mt-6 space-y-4">
                            <h2 className="text-xl font-bold text-center">Response</h2>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md space-y-4">
                                <div>
                                    <h3 className="font-semibold text-green-600">Price Forecast:</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{response.analysis.price_forecast}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-600">Weather Impacts:</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                                        {response.analysis.weather_impacts.map((impact: string, index: number) => (
                                            <li key={index}>{impact}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-600">Market Arrivals:</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{response.analysis.market_arrivals}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-md">
                                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Advice:</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{response.advice}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
        </>
    );
};

export default AiAgentPage;