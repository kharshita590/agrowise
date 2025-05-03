import Link from "next/link"
import { ArrowRight, Leaf, ImageIcon, MessageSquare, FileText, CloudRain, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Empowering Farmers with AI-Driven Insights
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    AgroWise helps farmers make data-driven decisions, maximize profits, and adopt sustainable practices
                    through advanced AI technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="flex justify-center">
                {/* <ImageIcon
                  src="/placeholder.svg?height=400&width=500"
                  alt="Farmer using AgroWise app in the field"
                  className="rounded-lg object-cover border shadow-lg"
                  width={500}
                  height={400}
                /> */}
                <Image
                  src="/farmer.jpg?height=400&width=500"
                  alt="Farmer using AgroWise app in the field"
                  className="rounded-lg object-cover border shadow-lg"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Smart Farming Solutions</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AgroWise combines AI technology with agricultural expertise to provide comprehensive farming
                  solutions.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {/* Feature 1 */}
              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <ArrowRight className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Crop Price & Sell Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Get personalized recommendations on when to sell your crops and at what price based on market
                    trends, historical data, and your specific inputs.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/ai-agent">
                  <Button variant="ghost" className="text-green-600">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Feature 2 */}
              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Organic Farming Advice</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Access AI-generated advice on organic farming practices, including natural pest control, soil health
                    management, and sustainable techniques.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                <Link href="/farming-advice">
                  <Button variant="ghost" className="text-green-600">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Feature 3 */}
              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <ImageIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Crop Health Analyzer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Upload images of your crops to identify diseases, pests, and nutrient deficiencies with our advanced
                    image recognition technology.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                <Link href="/farming-advice">
                  <Button variant="ghost" className="text-green-600">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Feature 4 */}
              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Farming Assistant Chatbot</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Get instant answers to your farming questions and doubts through our AI-powered chatbot available
                    24/7 in multiple languages.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                <Link href="/chatbot">
                  <Button variant="ghost" className="text-green-600">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Feature 5 */}
              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Government Schemes Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Stay updated on the latest government schemes, subsidies, and programs designed to support farmers
                    and agricultural development.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                <Link href="/schemes">
                  <Button variant="ghost" className="text-green-600">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Feature 6 */}
              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <CloudRain className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Weather Forecasts & Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Receive localized weather forecasts, seasonal predictions, and timely alerts to help you plan your
                    farming activities effectively.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                <Link href="/weather">
                  <Button variant="ghost" className="text-green-600">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 bg-green-50 dark:bg-green-900/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple Steps to Smart Farming
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting started with AgroWise is easy and straightforward.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/50">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">1</span>
                </div>
                <h3 className="text-xl font-bold">Create Your Profile</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Sign up and create your farm profile with details about your location, crops, and farming practices.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/50">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <h3 className="text-xl font-bold">Input Your Data</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Provide information about your crops, soil conditions, and farming goals to receive personalized
                  recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/50">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
                </div>
                <h3 className="text-xl font-bold">Get AI-Powered Insights</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive tailored recommendations, insights, and advice to optimize your farming operations and
                  increase profitability.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Farmers Say</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from farmers who have transformed their agricultural practices with AgroWise.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="border-green-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      src="/rajesh.jpg?height=100&width=100"
                      alt="Farmer Rajesh"
                      className="rounded-full h-20 w-20 object-cover"
                    />
                    <div className="space-y-2 text-center">
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        "AgroWise helped me increase my crop yield by 30% and get better prices in the market. The crop
                        health analyzer saved my tomato harvest from a disease outbreak."
                      </p>
                      <h4 className="font-semibold">Rajesh Kumar</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Wheat Farmer, Punjab</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      src="/lakshmi.jpeg?height=100&width=100"
                      alt="Farmer Lakshmi"
                      className="rounded-full h-20 w-20 object-cover"
                    />
                    <div className="space-y-2 text-center">
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        "The organic farming advice has transformed my farm. I've reduced chemical inputs by 80% while
                        maintaining productivity. The chatbot answers all my questions instantly."
                      </p>
                      <h4 className="font-semibold">Lakshmi Devi</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Organic Farmer, Karnataka</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      src="/amit.jpg?height=100&width=100"
                      alt="Farmer Amit"
                      className="rounded-full h-20 w-20 object-cover"
                    />
                    <div className="space-y-2 text-center">
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        "Thanks to AgroWise's price recommendations, I sold my rice harvest at 20% higher than market
                        average. The government scheme information helped me secure a subsidy for irrigation."
                      </p>
                      <h4 className="font-semibold">Amit Singh</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rice Farmer, West Bengal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-green-600 dark:bg-green-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Farming?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of farmers who are already benefiting from AgroWise's AI-powered insights.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-white text-green-600 hover:bg-gray-100">Get Started for Free</Button>
                <Button variant="outline" className="border-white text-white hover:bg-green-700">
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                  More Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover More Possibilities
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AgroWise offers additional features to enhance your farming experience.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Farmer's Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Connect directly with buyers, eliminating middlemen and increasing your profits. Our marketplace
                    matches you with the best buyers for your crops.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/marketplace">
                  <Button variant="ghost" className="text-green-600">
                    Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="border-green-100 dark:border-green-900 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="p-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center mb-2">
                    <CloudRain className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Crop Insurance Advisor</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Get personalized recommendations on crop insurance options based on your location, crop type, and
                    risk factors to protect your investment.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/insurance">
                  <Button variant="ghost" className="text-green-600">
                    Learn About Insurance <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 bg-green-50 dark:bg-green-900/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                    Contact Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Have questions or need assistance? Our team is here to help you get the most out of AgroWise.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-800/50">
                      <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span>support@agrowise.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-800/50">
                      <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span>+91 1234567890</span>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          First Name
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Last Name
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your message"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                    Send Message
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 lg:gap-12">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">AgroWise</span>
            </div>
            <nav className="flex gap-4 md:gap-6 flex-wrap">
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
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Terms of Service
              </Link>
            </nav>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 AgroWise. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
