'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

export default function GeneratorModal() {
  const [open, setOpen] = useState(false)
  const [mainPrompt, setMainPrompt] = useState("")
  const [thumbnailText, setThumbnailText] = useState("")
  const [imageType, setImageType] = useState("")
  const [aspectRatio, setAspectRatio] = useState("")
  const [enhancePrompt, setEnhancePrompt] = useState(false)
  const [colorPalette, setColorPalette] = useState("")
  const [customRatio, setCustomRatio] = useState({ width: "", height: "" })
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt: mainPrompt,
          thumbnailText,
          imageType,
          aspectRatio,
          colorPalette,
          enhancePrompt,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const { url } = await response.json()

      toast({
        title: "Image generated successfully",
        description: "Check the gallery below to view your generated image.",
      })
      setOpen(false)
      router.refresh() // This will refresh the page, including the gallery
    } catch (error) {
      console.error('Error generating image:', error)
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">Open Generator</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>AI Thumbnail Generator</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="main-prompt">Main Prompt</Label>
              <Textarea
                id="main-prompt"
                placeholder="Enter your main prompt here..."
                value={mainPrompt}
                onChange={(e) => setMainPrompt(e.target.value)}
                className="h-[150px]"
              />
            </div>
            <div>
              <Label htmlFor="thumbnail-text">Thumbnail Text</Label>
              <Input
                id="thumbnail-text"
                placeholder="Enter text to display on the thumbnail..."
                value={thumbnailText}
                onChange={(e) => setThumbnailText(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-type">Image Type</Label>
              <Select onValueChange={setImageType} value={imageType}>
                <SelectTrigger id="image-type">
                  <SelectValue placeholder="Select image type" />
                </SelectTrigger>
                <SelectContent>
                  {[ "Realistic", "3D Render", "Anime", "Minimalistic", "Cartoon", "Cinematic",].map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
              <Select onValueChange={setAspectRatio} value={aspectRatio}>
                <SelectTrigger id="aspect-ratio">
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16:9">YouTube Thumbnail (16:9)</SelectItem>
                  <SelectItem value="1:1">Instagram Post (1:1)</SelectItem>
                  <SelectItem value="9:16">Instagram Story (9:16)</SelectItem>
                  <SelectItem value="16:9">Twitter Post (16:9)</SelectItem>
                  <SelectItem value="16:9">Facebook Cover (16:9)</SelectItem>
                  <SelectItem value="custom">Custom Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {aspectRatio === "custom" && (
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="custom-width">Width</Label>
                  <Input
                    id="custom-width"
                    type="number"
                    value={customRatio.width}
                    onChange={(e) => setCustomRatio({ ...customRatio, width: e.target.value })}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="custom-height">Height</Label>
                  <Input
                    id="custom-height"
                    type="number"
                    value={customRatio.height}
                    onChange={(e) => setCustomRatio({ ...customRatio, height: e.target.value })}
                  />
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Switch
                id="enhance-prompt"
                checked={enhancePrompt}
                onCheckedChange={setEnhancePrompt}
              />
              <Label htmlFor="enhance-prompt">Enhance Prompt</Label>
            </div>
            <div>
              <Label htmlFor="color-palette">Color Palette</Label>
              <Select onValueChange={setColorPalette} value={colorPalette}>
                <SelectTrigger id="color-palette">
                  <SelectValue placeholder="Select color palette" />
                </SelectTrigger>
                <SelectContent>
                  {["Vibrant", "Pastel", "Monochrome", "Warm", "Cool", "Custom"].map((palette) => (
                    <SelectItem key={palette} value={palette.toLowerCase()}>{palette}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {colorPalette === "custom" && (
              <div>
                <Label htmlFor="custom-color">Custom Color</Label>
                <Input
                  id="custom-color"
                  type="color"
                  className="h-10 p-1"
                  onChange={(e) => setColorPalette(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <Button onClick={handleSubmit} className="mt-4" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}