import { createContext, useContext, useState } from "react"

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "abhin",
    isAuthenticated: true,
  })

  const [blogs, setBlogs] = useState([
  {
    id: 1,
    title: "AI in 2025",
    content: "As we step into 2025, artificial intelligence is no longer a futuristic concept—it's an everyday tool transforming industries. Generative AI models are creating music, writing code, designing graphics, and even supporting scientific research. With advancements in natural language processing and image generation, AI is blurring the line between human and machine creativity. But with great power comes great responsibility—we must address ethical concerns, data privacy, and the potential for bias in AI systems.",
    category: "tech",
    author: user,
    created_at: "2025-06-25",
    thumbnail: "https://source.unsplash.com/400x200/?ai,technology",
    comments: [
      { id: 1, name: "John", text: "Great insights!" },
      { id: 2, name: "Riya", text: "Would love more on generative AI." },
      { id: 3, name: "Karan", text: "Excited and scared about the future!" }
    ]
  },
  {
    id: 2,
    title: "Mindful Living",
    content: "In the chaos of modern life, mindfulness has become a necessity rather than a luxury. It’s the art of being present—truly aware of each breath, step, and moment. From morning meditation to mindful eating, integrating small mindful practices into your routine can reduce stress, improve focus, and cultivate inner peace. It's not about escaping life’s noise but learning to listen deeper through it.",
    category: "life",
    author: user,
    created_at: "2025-06-24",
    thumbnail: "https://source.unsplash.com/400x200/?meditation,calm",
    comments: [
      { id: 1, name: "Aarav", text: "Beautifully written, truly calming." },
      { id: 2, name: "Sneha", text: "Needed this reminder today." }
    ]
  },
  {
    id: 3,
    title: "The Future of Education",
    content: "Education is undergoing a massive transformation. With AI tutors, virtual reality classrooms, and personalized learning platforms, the traditional classroom is evolving. Students now have access to global resources, adaptive learning paths, and real-time feedback—all from their devices. But equitable access remains a challenge. As we digitize learning, we must ensure no student is left behind due to lack of resources or connectivity.",
    category: "edu",
    author: user,
    created_at: "2025-06-23",
    thumbnail: "https://source.unsplash.com/400x200/?education,learning",
    comments: [
      { id: 1, name: "Anjali", text: "This is the future I want!" },
      { id: 2, name: "Dev", text: "Great points on accessibility." }
    ]
  },
  {
    id: 4,
    title: "Building a Personal Brand",
    content: "In today’s digital landscape, your personal brand is your currency. It’s more than a logo or a catchy tagline—it’s how you show up, what you stand for, and the trust you build with your audience. Whether you're a freelancer, creator, or entrepreneur, crafting an authentic and consistent online presence can open doors to opportunities and collaborations you never imagined.",
    category: "biz",
    author: user,
    created_at: "2025-06-22",
    thumbnail: "https://source.unsplash.com/400x200/?business,branding",
    comments: [
      { id: 1, name: "Meera", text: "Loved the clarity on branding!" },
      { id: 2, name: "Ravi", text: "Super helpful for creators." }
    ]
  },
  {
    id: 5,
    title: "Creative Photography Tips",
    content: "Photography isn't about having the best camera—it's about seeing the world differently. Composition, lighting, and emotion are your real tools. Learn to use natural light creatively, look for symmetry and leading lines, and tell stories through your shots. Whether it’s a portrait or a street scene, every photo should evoke something. Practice seeing, not just shooting.",
    category: "art",
    author: user,
    created_at: "2025-06-21",
    thumbnail: "https://source.unsplash.com/400x200/?photography,art",
    comments: [
      { id: 1, name: "Sara", text: "This made me pick up my camera again!" },
      { id: 2, name: "Akhil", text: "Helpful and inspiring tips." }
    ]
  },
  {
    id: 6,
    title: "AI Tools for Creators",
    content: "The creator economy is booming, and AI is its biggest ally. From writing assistants like ChatGPT to image generators and voice modulators, creators now have access to tools that can speed up workflows and enhance creativity. These tools help brainstorm ideas, refine content, and even automate production. The key lies in using AI as a co-pilot, not a replacement.",
    category: "tech",
    author: user,
    created_at: "2025-06-20",
    thumbnail: "https://source.unsplash.com/400x200/?ai,tools",
    comments: [
      { id: 1, name: "Vishal", text: "This is a game-changer for creatives!" },
      { id: 2, name: "Nina", text: "Bookmarking this!" }
    ]
  },
  {
    id: 7,
    title: "The Power of Minimalism",
    content: "Minimalism is more than a design choice—it’s a way of living intentionally. In a world addicted to consumption, minimalism invites clarity and focus. It’s about removing the unnecessary so that the essential can speak. Whether it’s your workspace, wardrobe, or daily routine, stripping things down to what truly matters creates room for peace and purpose.",
    category: "life",
    author: user,
    created_at: "2025-06-19",
    thumbnail: "https://source.unsplash.com/400x200/?minimalist,lifestyle",
    comments: [
      { id: 1, name: "Laya", text: "This post made me rethink my habits." },
      { id: 2, name: "Rohan", text: "Clean, clear, and powerful." }
    ]
  },
  {
    id: 8,
    title: "Microlearning Explained",
    content: "Microlearning is changing how we absorb information. Instead of hour-long lectures, learners are consuming 3–5 minute modules focused on single concepts. This bite-sized approach aligns with how the brain retains knowledge best. Whether it's a quick tutorial or a mini quiz, microlearning fits perfectly into busy schedules while improving retention and engagement.",
    category: "edu",
    author: user,
    created_at: "2025-06-18",
    thumbnail: "https://source.unsplash.com/400x200/?study,shortlessons",
    comments: [
      { id: 1, name: "Kritika", text: "Explained perfectly!" },
      { id: 2, name: "Farhan", text: "Useful for teachers and students alike." }
    ]
  },
  {
    id: 9,
    title: "Launching a Digital Product",
    content: "Creating and launching a digital product—like an ebook, course, or tool—requires clarity, strategy, and community. Start by identifying a real problem, build a minimal viable solution, and validate it with your audience. Use email lists, landing pages, and beta testers to refine your offering. The real magic lies in solving a problem so well that people are excited to pay for the solution.",
    category: "biz",
    author: user,
    created_at: "2025-06-17",
    thumbnail: "https://source.unsplash.com/400x200/?startup,digital",
    comments: [
      { id: 1, name: "Yash", text: "This is gold for indie hackers!" },
      { id: 2, name: "Priya", text: "Clear and practical." }
    ]
  },
  {
    id: 10,
    title: "Mastering Color Theory",
    content: "Color is emotion. Understanding how different hues evoke different feelings can elevate your designs dramatically. Warm colors like red and orange energize, while cool tones like blue and green calm the viewer. Complementary colors create contrast; analogous colors create harmony. Mastering the color wheel and experimenting with palettes helps communicate your message visually and powerfully.",
    category: "art",
    author: user,
    created_at: "2025-06-16",
    thumbnail: "https://source.unsplash.com/400x200/?color,design",
    comments: [
      { id: 1, name: "Nidhi", text: "I finally get color theory now!" },
      { id: 2, name: "Arjun", text: "Loved the emotional angle to colors." }
    ]
  }
]);

  return (
    <AppContext.Provider value={{ user, blogs }}>
      {children}
    </AppContext.Provider>
  )
}
