import { Facebook, Twitter, Linkedin, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "@tanstack/react-router";

interface BlogHeaderProps {
    tags: string[];
    title: string;
    summary: string,
    author: {
        name: string;
        avatar: string;
    };
    publishedDate: string;
}

export const IdeaHeader = ({ tags, title, summary, author, publishedDate }: BlogHeaderProps) => {

    return (
        <header className="space-y-6">

            {tags.map((tag) => (
                <Badge key={tag} className="p-1 m-1 shadow-md hover:shadow-none transition" variant="outline">{tag}</Badge>
            ))}

            <h1 className="m-2 text-foreground text-4xl leading-15 font-bold tracking-tight md:text-4xl lg:text-5xl">
                {title}
            </h1>
            <div className="m-2 prose prose-lg max-w-none">
                <p className="text-blog-content mb-6 leading-relaxed">
                    {summary}
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">by {author.name}</p>
                        <p className="text-muted-foreground text-sm">{publishedDate}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <span className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase">
                        Share this
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-blog-hover h-9 w-9 rounded-full">
                        <Twitter />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-blog-hover h-9 w-9 rounded-full">
                        <Facebook />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-blog-hover h-9 w-9 rounded-full">
                        <Linkedin />
                    </Button>
                </div>
            </div>
        </header>
    )
}