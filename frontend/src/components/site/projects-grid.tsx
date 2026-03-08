"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {FaGithub} from "react-icons/fa";
import {CiGlobe} from "react-icons/ci";
import Link from "next/link";

const projectSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    thumbnailPath: z.string().nullable(),
    videoPath: z.string().nullable(),
    createdAt: z.string().min(1),
    prideLevel: z.number().int(),
    link: z.string().min(1).nullable(),
    isPersonal: z.boolean(),
    repo: z.string().nullable()
  })
  .strict();

const projectsResponseSchema = z
  .object({
    data: z.array(projectSchema),
  })
  .strict();

type Project = z.infer<typeof projectSchema>;

type ProjectsGridMessages = {
  loadingTitle: string;
  loadingDescription: string;
  emptyTitle: string;
  emptyDescription: string;
  errorTitle: string;
  errorDescription: string;
  createdAtLabel: string;
  thumbnailLabel: string;
  videoLabel: string;
  isPersonal: string;
  isProfessional: string
};

type ProjectsGridProps = {
  locale: string;
  apiBaseUrl: string;
  messages: ProjectsGridMessages;
};

type FetchStatus = "loading" | "error" | "empty" | "success";

function resolveVideoUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }

  return `/videos/${path}`;
}

function resolveThumbnailUrl(path: string | null) {
  if (null === path) {
    return;
  }

  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }

  return `/images/project/${path}`;
}

function getVideoMimeType(path: string) {
  if (path.endsWith(".mp4")) {
    return "video/mp4";
  }

  if (path.endsWith(".webm")) {
    return "video/webm";
  }

  return undefined;
}

export function ProjectsGrid({ apiBaseUrl, messages }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [hasConfigError, setHasConfigError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const trimmedApiBaseUrl = apiBaseUrl.trim();

    if (!trimmedApiBaseUrl) {
      setHasConfigError(true);
      setStatus("error");
      return () => controller.abort();
    }

    setHasConfigError(false);

    const loadProjects = async () => {
      try {
        const response = await axios.get(`${trimmedApiBaseUrl.replace(/\/+$/, "")}/projects`, {
          headers: {
            Accept: "application/json",
          },
          timeout: 10_000,
          signal: controller.signal,
        });

        const parsed = projectsResponseSchema.safeParse(response.data);

        if (!parsed.success) {
          setStatus("error");
          return;
        }

        setProjects(parsed.data.data);
        setStatus(parsed.data.data.length === 0 ? "empty" : "success");
      } catch (error) {
        console.error(error)
        if (axios.isCancel(error)) {
          return;
        }

        setStatus("error");
      }
    };

    void loadProjects();

    return () => controller.abort();
  }, [apiBaseUrl]);

  if (status === "loading") {
    return (
      <div className="mt-10">
        <Card className="min-h-48 border-white/10">
          <CardHeader>
            <CardTitle>{messages.loadingTitle}</CardTitle>
            <CardDescription>{messages.loadingDescription}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-10">
        <Card className="min-h-48 border-red-400/30">
          <CardHeader>
            <CardTitle>{messages.errorTitle}</CardTitle>
            <CardDescription>
              {messages.errorDescription}
              {hasConfigError
                ? ` Set NEXT_PUBLIC_SYMFONY_API_BASE_URL in your frontend environment.`
                : null}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="mt-10">
        <Card className="min-h-48 border-white/10">
          <CardHeader>
            <CardTitle>{messages.emptyTitle}</CardTitle>
            <CardDescription>{messages.emptyDescription}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {projects.map((project) => {
        const thumbnailUrl = resolveThumbnailUrl(project?.thumbnailPath);
        const videoUrl = project.videoPath ? resolveVideoUrl(project.videoPath) : null;

        return (
          <Card
            key={`${project.title}-${project.createdAt}`}
            className="project-card h-full overflow-hidden border-white/10"
          >
            <div className="aspect-video w-full bg-black/40">
              {videoUrl ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  poster={thumbnailUrl}
                  preload="metadata"
                >
                  <source src={videoUrl} type={getVideoMimeType(videoUrl)} />
                </video>
              ) : (
                <img
                  alt={project.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={thumbnailUrl}
                />
              )}
            </div>
            <CardHeader>
              <CardTitle>
                <div className="w-full flex justify-between items-center">
                  <div>
                    {project.link ? (
                      <a href={project.link} className="cursor-pointer hover:underline">
                        {project.title}
                      </a>
                    ) : (
                      <span className="cursor-default">{project.title}</span>
                     )}
                  </div>
                  <div className="flex justify-center items-center gap-x-4">
                    {project.link && (
                        <Link
                            target="_blank"
                            href={project.link}
                            className="card-link card-link-globe"
                        >
                          <CiGlobe />
                        </Link>
                    )}
                    {project.repo && (
                        <Link
                            target="_blank"
                            href={project.repo}
                            className="card-link card-link-github"
                        >
                          <FaGithub />
                        </Link>
                    )}
                    <Badge className="animated-badge">
                      {project.isPersonal ? messages.isPersonal : messages.isProfessional}
                    </Badge>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
