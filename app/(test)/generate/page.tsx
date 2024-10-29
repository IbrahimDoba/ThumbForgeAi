import GeneratorModal from "@/components/generator/Generator.Modal"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">AI Thumbnail Generator</h1>
      <div className="w-full max-w-md">
        {/* <Textarea
          placeholder="Enter your prompt here..."
          className="mb-4"
          onClick={() => {
            // This will be handled by the GeneratorModal component
          }}
        />
        <Button className="w-full">Generate</Button> */}
      </div>
      <GeneratorModal />
    </main>
  )
}