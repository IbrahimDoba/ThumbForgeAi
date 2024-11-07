'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from 'date-fns'
import GeneratorModal from '@/components/generator/Generator.Modal'
import { ImageCard } from '@/components/generator/ImageCard'
import { User, GeneratedImage } from "@/lib/db/schema"

interface UserProfileComponentProps {
  user: User & { generatedImages: GeneratedImage[] }
  isOwnProfile: boolean
}

export default function UserProfileComponent({ user, isOwnProfile }: UserProfileComponentProps) {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Details Section */}
        <div className="md:col-span-1">
          <div className="bg-card p-6 rounded-lg shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <p className="mb-2">{user.bio}</p>
            <p className="text-sm text-muted-foreground mb-2">{user.location}</p>
            <p className="text-sm text-muted-foreground mb-4">Joined {format(new Date(user.createdAt!), 'MMMM yyyy')}</p>
            {isOwnProfile && (
              <Button variant="outline" className="w-full" onClick={() => router.push('/settings')}>Edit Profile</Button>
            )}
          </div>
        </div>

        {/* Generator Modal Section */}
        <div className="md:col-span-2">
          <GeneratorModal />
        </div>

        {/* User Generated Images Section */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-4">Generated Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.generatedImages.map((image) => (
              <ImageCard 
                key={image.id} 
                image={image} 
                user={user} 
                onClick={() => router.push(`/image/${image.imageId}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}