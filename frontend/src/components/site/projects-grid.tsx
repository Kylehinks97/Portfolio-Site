"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/i18n/config";
import fallbackProjectsJson from "../../../projects-fallback.json";

const projectSchema = z
  .object({
    title: z.string().min(1),
    descriptionEnglish: z.string().min(1),
    descriptionSpanish: z.string().min(1),
    thumbnailPath: z.string().nullable(),
    videoPath: z.string().nullable(),
    createdAt: z.string().min(1),
    prideLevel: z.number().int(),
    link: z.string().min(1).nullable(),
    isPersonal: z.boolean(),
    repo: z.string().nullable(),
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
  isProfessional: string;
};

type ProjectsGridProps = {
  locale: Locale;
  apiBaseUrl: string;
  messages: ProjectsGridMessages;
};

type FetchStatus = "loading" | "error" | "empty" | "success";

function resolveVideoUrl(path: string) {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }

  return `/videos/${path}`;
}

function resolveThumbnailUrl(path: string | null) {
  if (null === path) {
    return;
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
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

function getProjectDescription(project: Project, locale: Locale) {
  return locale === "es"
    ? project.descriptionSpanish
    : project.descriptionEnglish;
}

export function ProjectsGrid({
  apiBaseUrl,
  locale,
  messages,
}: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<FetchStatus>("loading");

  useEffect(() => {
    const controller = new AbortController();
    const trimmedApiBaseUrl = apiBaseUrl.trim();

    const fallbackProjects = projectsResponseSchema.shape.data.safeParse(
      (fallbackProjectsJson as unknown as { data?: unknown }).data,
    ).success
      ? (fallbackProjectsJson as unknown as { data: Project[] }).data
      : [];

    const applyFallback = () => {
      setProjects(fallbackProjects);
      setStatus(fallbackProjects.length === 0 ? "empty" : "success");
    };

    if (!trimmedApiBaseUrl) {
      applyFallback();
      return () => controller.abort();
    }

    const loadProjects = async () => {
      try {
        const response = await axios.get(
          `${trimmedApiBaseUrl.replace(/\/+$/, "")}/projects`,
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 10_000,
            signal: controller.signal,
          },
        );

        const parsed = projectsResponseSchema.safeParse(response.data);

        if (!parsed.success) {
          applyFallback();
          return;
        }

        setProjects(parsed.data.data);
        setStatus(parsed.data.data.length === 0 ? "empty" : "success");
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        applyFallback();
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
        const videoUrl = project.videoPath
          ? resolveVideoUrl(project.videoPath)
          : null;

        return (
          <Card
            key={`${project.title}-${project.createdAt}`}
            className="project-card h-full overflow-hidden border-white/10"
          >
            <div className="relative aspect-video w-full bg-black/40">
              {videoUrl ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  poster={thumbnailUrl}
                  preload="metadata"
                >
                  <source src={videoUrl} type={getVideoMimeType(videoUrl)} />
                  <track
                    default={locale === "es"}
                    kind="captions"
                    label={
                      locale === "es" ? "Spanish captions" : "English captions"
                    }
                    src="/videos/project-captions.vtt"
                    srcLang={locale}
                  />
                </video>
              ) : (
                thumbnailUrl && (
                  <Image
                    alt={project.title}
                    className="object-cover"
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={thumbnailUrl}
                    unoptimized
                  />
                )
              )}
            </div>
            <CardHeader>
              <CardTitle>
                <div className="w-full flex justify-between items-center">
                  <div>
                    {project.link ? (
                      <a
                        href={project.link}
                        className="cursor-pointer hover:underline"
                      >
                        {project.title}
                      </a>
                    ) : (
                      <span className="cursor-default">{project.title}</span>
                    )}
                  </div>
                </div>
              </CardTitle>
              <CardDescription>
                {getProjectDescription(project, locale)}
              </CardDescription>
            </CardHeader>
            <div className="flex justify-between mx-6 items-center gap-x-4 mb-6">
              <Badge className="animated-badge">
                {project.isPersonal
                    ? messages.isPersonal
                    : messages.isProfessional}
              </Badge>
              {project.link && (
                  <Link
                      target="_blank"
                      href={project.link}
                      className="card-link card-link-globe border-2 border-border rounded gap-x-2"
                  >
                    <p className="text-sm">Visit</p>
                    <CiGlobe />
                  </Link>
              )}
              {project.repo && (
                  <Link
                      target="_blank"
                      href={project.repo}
                      className="card-link card-link-github border-2 border-border rounded gap-x-2"
                  >
                    <p className="text-sm">Visit</p>
                    <FaGithub />
                  </Link>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
