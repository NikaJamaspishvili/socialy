import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Bookmark,
  Home as HomeIcon,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Heart,
  Share2,
  Image as ImageIcon,
  Smile,
  Users,
  Settings,
} from "lucide-react"

type Story = {
  id: string
  userName: string
  avatarUrl?: string
}

type Post = {
  id: string
  author: string
  username: string
  avatarUrl?: string
  time: string
  content: string
  imageUrl?: string
  likes: number
  comments: number
  shares: number
}

const stories: Story[] = [
  { id: "1", userName: "You" },
  { id: "2", userName: "Sarah" },
  { id: "3", userName: "Daniel" },
  { id: "4", userName: "Anita" },
  { id: "5", userName: "Luis" },
  { id: "6", userName: "Chen" },
  { id: "7", userName: "Priya" },
]

const posts: Post[] = [
  {
    id: "p1",
    author: "Sarah Smith",
    username: "@sarah",
    time: "2h",
    content: "Coffee, code, and a calm playlist. How's your day going?",
    likes: 24,
    comments: 5,
    shares: 3,
  },
  {
    id: "p2",
    author: "Daniel Park",
    username: "@daniel",
    time: "5h",
    content:
      "Quick hike before sunset. The view was worth the climb.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    likes: 102,
    comments: 18,
    shares: 12,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <Header />
      <main className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        <Sidebar />
        <Feed />
        <RightRail />
      </main>
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-primary" />
          <span className="text-lg font-semibold">Social</span>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 w-[260px]" placeholder="Search" />
          </div>
          <Button variant="ghost" size="icon" aria-label="notifications">
            <Bell className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="bookmarks">
            <Bookmark className="size-5" />
          </Button>
          <Avatar>
            <AvatarFallback>YS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

function Sidebar() {
  const navItems = [
    { label: "Home", icon: HomeIcon },
    { label: "Friends", icon: Users },
    { label: "Messages", icon: MessageCircle },
    { label: "Bookmarks", icon: Bookmark },
    { label: "Settings", icon: Settings },
  ]

  return (
    <aside className="hidden lg:block">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Menu</CardTitle>
          <CardDescription>Quick navigation</CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start gap-3 px-3"
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </aside>
  )
}

function Feed() {
  return (
    <section className="flex flex-col gap-6">
      <StoriesBar />
      <Composer />
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />)
        )}
      </div>
    </section>
  )
}

function StoriesBar() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Stories</CardTitle>
          <Button size="sm">
            <Plus className="mr-2 size-4" /> Add story
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-1">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex w-28 shrink-0 flex-col items-center gap-2"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-primary to-primary/40 blur-sm" />
                <Avatar className="relative size-16 border border-border">
                  <AvatarFallback>
                    {story.userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="truncate text-xs text-muted-foreground">{story.userName}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function Composer() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Create post</CardTitle>
        <CardDescription>Share something with your friends</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <Textarea placeholder="What's on your mind?" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-2">
              <ImageIcon className="size-4" /> Photo
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Smile className="size-4" /> Mood
            </Button>
          </div>
          <Button size="sm">Post</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {post.author
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium leading-none">{post.author}</div>
              <div className="text-xs text-muted-foreground">
                {post.username} • {post.time}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" aria-label="more">
            <MoreHorizontal className="size-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed">{post.content}</p>
        {post.imageUrl ? (
          <div className="overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Post media"
              src={post.imageUrl}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
        <div className="mt-1 grid grid-cols-3 rounded-md border bg-secondary/50 text-sm">
          <button className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-secondary">
            <Heart className="size-4" /> {post.likes}
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-secondary">
            <MessageSquare className="size-4" /> {post.comments}
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-secondary">
            <Share2 className="size-4" /> {post.shares}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="relative w-full">
            <Input placeholder="Write a comment..." className="pr-10" />
            <Send className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RightRail() {
  const contacts = [
    { name: "Sarah Smith" },
    { name: "Daniel Park" },
    { name: "Anita Kumar" },
    { name: "Luis Garcia" },
    { name: "Chen Wei" },
  ]

  return (
    <aside className="hidden lg:block">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Active now</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {contacts.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="size-8">
                    <AvatarFallback>
                      {c.name
                        .split(" ")
                        .map((s) => s[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                </div>
                <span className="text-sm">{c.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Shortcuts</CardTitle>
            <CardDescription>Quick links</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              <Bookmark className="mr-2 size-4" /> Saved
            </Button>
            <Button variant="ghost" className="justify-start">
              <Users className="mr-2 size-4" /> Groups
            </Button>
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 size-4" /> Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}

