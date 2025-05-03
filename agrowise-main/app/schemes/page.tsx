import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import Link from "next/link";
import React from "react";

type Scheme = {
    title: string;
    description: string;
    link: string;
};

const schemes: Scheme[] = [
    {
        title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        description:
            "Aims to improve irrigation efficiency and expand cultivable land under assured irrigation.",
        link: "https://pmksy.gov.in/",
    },
    {
        title: "PM-Kisan Samman Nidhi",
        description:
            "Provides income support of ₹6000 per year to small and marginal farmers.",
        link: "https://pmkisan.gov.in/",
    },
    {
        title: "Soil Health Card Scheme",
        description:
            "Provides farmers with soil health reports to optimize the use of nutrients.",
        link: "https://soilhealth.dac.gov.in/",
    },
    {
        title: "eNAM - National Agriculture Market",
        description:
            "A pan-India electronic trading portal that networks the existing APMC mandis.",
        link: "https://enam.gov.in/",
    },
];

const GovernmentSchemes: React.FC = () => {
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
        <section className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-background py-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter text-green-800 dark:text-green-400 mb-6">
                    Government Schemes for Farmers
                </h1>
                <p className="text-gray-700 dark:text-gray-400 mb-10 text-lg">
                    Stay updated on the latest government schemes, subsidies, and programs
                    designed to support farmers and agricultural development.
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                    {schemes.map((scheme, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-950 border border-green-200 dark:border-green-800 rounded-2xl shadow-md p-6 transition hover:shadow-lg"
                        >
                            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
                                {scheme.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 my-2">
                                {scheme.description}
                            </p>
                            <a
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 dark:text-green-400 hover:underline font-medium"
                            >
                                Learn More →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default GovernmentSchemes;
