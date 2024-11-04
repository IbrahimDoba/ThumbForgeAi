'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    credits: 6,
    features: ['6 credits', 'Basic image generation'],
  },
  {
    name: 'Basic',
    price: '$15',
    credits: 100,
    features: ['100 credits', 'Upload and edit images', 'Remix images', 'Download HD images'],
  },
  {
    name: 'Pro',
    price: '$30',
    credits: 300,
    features: ['300 credits', 'All Basic features', 'Upscale images', 'Private thumbnails'],
  },
  {
    name: 'Premium',
    price: '$80',
    credits: 1000,
    features: ['1000 credits', 'All Pro features', 'Priority support', 'Custom branding'],
  },
]

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const [selectedPlan, setSelectedPlan] = useState(session?.user?.subscriptionPlan || 'free')

  const handleUpgrade = async (plan: string) => {
    // Implement your payment logic here
    console.log(`Upgrading to ${plan} plan`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={selectedPlan === plan.name.toLowerCase() ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleUpgrade(plan.name.toLowerCase())}
                disabled={selectedPlan === plan.name.toLowerCase()}
              >
                {selectedPlan === plan.name.toLowerCase() ? 'Current Plan' : 'Upgrade'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}