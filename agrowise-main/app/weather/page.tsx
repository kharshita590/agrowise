import React from "react";

type Forecast = {
    date: string;
    temperature: string;
    condition: string;
    alert?: string;
};

const forecastData: Forecast[] = [
    {
        date: "May 2, 2025",
        temperature: "32°C",
        condition: "Partly Cloudy",
    },
    {
        date: "May 3, 2025",
        temperature: "29°C",
        condition: "Thunderstorms",
        alert: "Heavy rain alert issued for your area. Avoid field activities.",
    },
    {
        date: "May 4, 2025",
        temperature: "35°C",
        condition: "Sunny",
    },
];

const WeatherForecast: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-background">
            <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <h1 className="text-xl font-bold text-green-800 dark:text-green-300">
                        Weather Forecasts & Alerts
                    </h1>
                </div>
            </header>

            <main className="flex-1 py-10 px-4 sm:px-8">
                <div className="max-w-4xl mx-auto">
                    <p className="text-gray-700 dark:text-gray-400 mb-10 text-lg">
                        Receive localized weather forecasts, seasonal predictions, and timely
                        alerts to help you plan your farming activities effectively.
                    </p>

                    <div className="space-y-6">
                        {forecastData.map((forecast, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                            >
                                <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">
                                    {forecast.date}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Condition: <span className="font-medium">{forecast.condition}</span>
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Temperature: <span className="font-medium">{forecast.temperature}</span>
                                </p>
                                {forecast.alert && (
                                    <p className="mt-3 text-red-600 dark:text-red-400 font-semibold">
                                        ⚠️ Alert: {forecast.alert}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
                <div className="container py-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2025 AgroWise. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default WeatherForecast;
