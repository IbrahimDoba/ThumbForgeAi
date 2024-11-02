
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GeneratedImage, User } from '@/lib/db/schema'

interface ImageCardProps {
  image: GeneratedImage
  user: User
  onClick: () => void
}

export function ImageCard({ image, user, onClick }: ImageCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer" onClick={onClick}>
      <CardContent className="p-0 relative">
        <Image
          src={image.imageUrl}
          alt={`Generated thumbnail: ${image.prompt}`}
          width={800}
          height={800}
          layout="responsive"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex items-center text-white">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
              <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}